import { useState, useCallback, useMemo } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"; // shad/cn Checkbox 컴포넌트

interface UserData {
  id: number;
  name: string;
  email: string;
  department: string;
  description: string;
}

const initialData: UserData[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `사용자 ${i + 1}`,
  email: `user${i + 1}@example.com`,
  department: `부서 ${((i % 10) + 1)}`,
  description: `설명 ${i + 1}`,
}));

export default function UserTable() {
  const [title, setTitle] = useState("그리드 제목");
  const [description, setDescription] = useState("그리드 설명");
  const [members, setMembers] = useState<UserData[]>(initialData);
  // 별도의 선택 상태: 선택된 행의 id를 관리 (selected 필드 없이)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const addRow = useCallback(() => {
    const newRow: UserData = {
      id: Date.now(),
      name: "새 사용자",
      email: "newuser@example.com",
      department: "새 부서",
      description: "새 설명",
    };
    setMembers((prev: UserData[]) => [...prev, newRow]);
  }, []);

  const moveRow = useCallback(
    (direction: "up" | "down" | "top" | "bottom") => {
      if (!members.length) return;
      const newMembers = [...members];
      const selectedIndexes = newMembers.reduce<number[]>((acc, item, idx) => {
        if (selectedIds.has(item.id)) acc.push(idx);
        return acc;
      }, []);

      switch (direction) {
        case "up":
          selectedIndexes.forEach((i) => {
            if (i > 0)
              [newMembers[i], newMembers[i - 1]] = [
                newMembers[i - 1],
                newMembers[i],
              ];
          });
          break;
        case "down":
          selectedIndexes.reverse().forEach((i) => {
            if (i < newMembers.length - 1)
              [newMembers[i], newMembers[i + 1]] = [
                newMembers[i + 1],
                newMembers[i],
              ];
          });
          break;
        case "top":
          selectedIndexes.forEach((i) => {
            const [item] = newMembers.splice(i, 1);
            newMembers.unshift(item);
          });
          break;
        case "bottom":
          selectedIndexes.reverse().forEach((i) => {
            const [item] = newMembers.splice(i, 1);
            newMembers.push(item);
          });
          break;
        default:
          break;
      }
      setMembers(newMembers);
    },
    [members, selectedIds]
  );

  const handleDelete = useCallback((id: number) => {
    setMembers((prev) => prev.filter((item) => item.id !== id));
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, []);

  const handleUpdate = useCallback(
    (id: number, key: keyof UserData, value: string) => {
      setMembers((prev) =>
        prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
      );
    },
    []
  );

  const handleSelect = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const saveData = useCallback(() => {
    console.log("저장된 데이터:", JSON.stringify({ title, description, members }));
  }, [title, description, members]);

  const columns: ColumnDef<UserData>[] = useMemo(
    () => [
      {
        // Checkbox 렌더링 시 selectedIds 상태를 참조합니다.
        accessorKey: "id",
        header: "선택",
        cell: ({ row }) => (
          <Checkbox className="-backdrop-hue-rotate-0"
            checked={selectedIds.has(row.original.id)}
            onCheckedChange={() => handleSelect(row.original.id)}
          />
        ),
      },
      {
        accessorKey: "name",
        header: "이름",
        cell: ({ row }) => row.original.name || "-",
      },
      {
        accessorKey: "email",
        header: "이메일",
        cell: ({ row }) => row.original.email || "-",
      },
      {
        accessorKey: "department",
        header: "부서",
        cell: ({ row }) => row.original.department || "-",
      },
      {
        accessorKey: "description",
        header: "설명",
        cell: ({ row }) => (
          <Input
            value={row.original.description || ""}
            onChange={(e) =>
              handleUpdate(row.original.id, "description", e.target.value)
            }
          />
        ),
      },
      {
        accessorKey: "actions",
        header: "삭제",
        cell: ({ row }) => (
          <Button
            variant="destructive"
            onClick={() => handleDelete(row.original.id)}
          >
            삭제
          </Button>
        ),
      },
    ],
    [handleSelect, handleUpdate, handleDelete, selectedIds]
  );

  const table = useReactTable({
    data: members,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <div className="mb-4">
        <Input
          className="mb-2"
          placeholder="그리드 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="그리드 설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
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
              <th key={header.id} className="p-2 border-r">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-b">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-2 border-r">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end">
        <Button onClick={saveData}>JSON 저장</Button>
      </div>
    </div>
  );
}
