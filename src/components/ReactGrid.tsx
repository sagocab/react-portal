import { useForm } from "react-hook-form";
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 데이터 타입 정의
interface UserData {
  id: number;
  name: string;
  email: string;
  department: string;
  description: string;
  selected: boolean;
}

// 100건의 더미 데이터 생성
const initialData: UserData[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `사용자 ${i + 1}`,
  email: `user${i + 1}@example.com`,
  department: `부서 ${((i % 10) + 1)}`,
  description: `설명 ${i + 1}`,
  selected: false,
}));

export default function UserTable() {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: "그리드 제목",
      description: "그리드 설명",
      data: initialData,
    },
  });

  const data: UserData[] = watch("data") || [];
  const title = watch("title");
  const description = watch("description");

  const addRow = () => {
    const newRow: UserData = {
      id: Date.now(),
      name: "새 사용자",
      email: "newuser@example.com",
      department: "새 부서",
      description: "새 설명",
      selected: false,
    };
    setValue("data", [...data, newRow]);
  };

  const moveRow = (direction: "up" | "down" | "top" | "bottom") => {
    if (!Array.isArray(data) || data.length === 0) return;
    const newData = [...data];
    const selectedIndexes = newData
      .map((item, index) => (item.selected ? index : -1))
      .filter((i) => i !== -1);

    if (direction === "up") {
      selectedIndexes.forEach((i) => {
        if (i > 0) {
          [newData[i], newData[i - 1]] = [newData[i - 1], newData[i]];
        }
      });
    } else if (direction === "down") {
      selectedIndexes.reverse().forEach((i) => {
        if (i < newData.length - 1) {
          [newData[i], newData[i + 1]] = [newData[i + 1], newData[i]];
        }
      });
    } else if (direction === "top") {
      selectedIndexes.forEach((i) => {
        const selectedItem = newData.splice(i, 1)[0];
        newData.unshift(selectedItem);
      });
    } else if (direction === "bottom") {
      selectedIndexes.reverse().forEach((i) => {
        const selectedItem = newData.splice(i, 1)[0];
        newData.push(selectedItem);
      });
    }
    setValue("data", newData);
  };

  const handleDelete = (id: number) => {
    setValue("data", data.filter((item) => item.id !== id));
  };

  const handleUpdate = (id: number, key: keyof UserData, value: string) => {
    setValue("data", data.map((item) => (item.id === id ? { ...item, [key]: value } : item)));
  };

  const handleSelect = (id?: number) => {
    if (!id) return;
    setValue("data", data.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)));
  };

  const saveData = () => {
    console.log("저장된 데이터:", JSON.stringify({ title, description, data }));
    alert("데이터가 JSON 형식으로 저장되었습니다.");
  };

  const columns: ColumnDef<UserData>[] = [
    {
      accessorKey: "selected",
      header: "선택",
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={!!row.original?.selected}
          onChange={() => handleSelect(row.original?.id)}
        />
      ),
    },
    {
      accessorKey: "name",
      header: "이름",
      cell: ({ row }) => row.original?.name || "-",
    },
    {
      accessorKey: "email",
      header: "이메일",
      cell: ({ row }) => row.original?.email || "-",
    },
    {
      accessorKey: "department",
      header: "부서",
      cell: ({ row }) => row.original?.department || "-",
    },
    {
      accessorKey: "description",
      header: "설명",
      cell: ({ row }) => (
        <Input
          defaultValue={row.original?.description || ""}
          onChange={(e) => handleUpdate(row.original?.id, "description", e.target.value)}
        />
      ),
    },
    {
      accessorKey: "actions",
      header: "삭제",
      cell: ({ row }) => (
        <Button variant="destructive" onClick={() => handleDelete(row.original?.id)}>
          삭제
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <form className="p-4" onSubmit={handleSubmit(saveData)}>
      <div className="mb-4">
        <Input className="mb-2" placeholder="그리드 제목" {...register("title")} />
        <Input placeholder="그리드 설명" {...register("description")} />
      </div>
      <div className="flex gap-2 mb-4">
        <Button onClick={addRow}>행 추가</Button>
        <Button onClick={() => moveRow("up")}>위로</Button>
        <Button onClick={() => moveRow("down")}>아래로</Button>
        <Button onClick={() => moveRow("top")}>맨 위로</Button>
        <Button onClick={() => moveRow("bottom")}>맨 아래로</Button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="border-b">
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="p-2 border-r">{flexRender(header.column.columnDef.header, header.getContext())}</th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-b">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-2 border-r">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end">
        <Button type="submit">JSON 저장</Button>
      </div>
    </form>
  );
}
