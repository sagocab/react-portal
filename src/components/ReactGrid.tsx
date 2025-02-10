import { useState } from "react";
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 데이터 타입 정의
type UserData = {
  id: number;
  name: string;
  email: string;
  department: string;
  description: string;
  selected: boolean;
};

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
  const [data, setData] = useState<UserData[]>(initialData);

  function handleUpdate(id: number, description: string, value: string) {
    console.log(id, description, value);
  }

  function handleDelete(id: number) {
    console.log(id);
  }

  const columns: ColumnDef<UserData>[] = [
    {
      accessorKey: "selected",
      header: "선택",
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.original.selected}
          onChange={() => handleSelect(row.original.id)}
        />
      ),
    },
    {
      accessorKey: "name",
      header: "이름",
    },
    {
      accessorKey: "email",
      header: "이메일",
    },
    {
      accessorKey: "department",
      header: "부서",
    },
    {
      accessorKey: "description",
      header: "설명",
      cell: ({ row }) => (
        <Input
          defaultValue={row.original.description}
          onChange={(e) => handleUpdate(row.original.id, "description", e.target.value)}
        />
      ),
    },
    {
      accessorKey: "actions",
      header: "삭제",
      cell: ({ row }) => (
        <Button variant="destructive" onClick={() => handleDelete(row.original.id)}>
          삭제
        </Button>
      ),
    },
  ];

  // 체크박스 선택 핸들러
  const handleSelect = (id: number) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  // 행 이동 핸들러 (한 칸씩 이동)
  const moveSelectedRows = (direction: "up" | "down" | "top" | "bottom") => {
    setData((prevData) => {
      const newData = [...prevData];
      const selectedRows = newData.filter((item) => item.selected);
      const unselectedRows = newData.filter((item) => !item.selected);

      if (direction === "top") {
        return [...selectedRows, ...unselectedRows];
      } else if (direction === "bottom") {
        return [...unselectedRows, ...selectedRows];
      } else if (direction === "up") {
        for (let i = 1; i < newData.length; i++) {
          if (newData[i].selected && !newData[i - 1].selected) {
            [newData[i], newData[i - 1]] = [newData[i - 1], newData[i]];
          }
        }
      } else if (direction === "down") {
        for (let i = newData.length - 2; i >= 0; i--) {
          if (newData[i].selected && !newData[i + 1].selected) {
            [newData[i], newData[i + 1]] = [newData[i + 1], newData[i]];
          }
        }
      }
      return newData;
    });
  };
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-2">
        <Button onClick={() => moveSelectedRows("top")}>맨위로</Button>
        <Button onClick={() => moveSelectedRows("up")}>위로</Button>
        <Button onClick={() => moveSelectedRows("down")}>아래로</Button>
        <Button onClick={() => moveSelectedRows("bottom")}>맨아래로</Button>
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
        <Button onClick={() => alert("저장되었습니다.")}>저장</Button>
      </div>
    </div>
  );
}
