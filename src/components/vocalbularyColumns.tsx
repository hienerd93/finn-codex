"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export type Vocabulary = {
  no: string;
  word: string;
  type: string;
  pronounce: string;
  meaning: string;
};

export const columns: ColumnDef<Vocabulary>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "no",
    header: "No.",
  },
  {
    accessorKey: "word",
    header: "Word",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "pronounce",
    header: "Pronounce",
  },
  {
    accessorKey: "meaning",
    header: "Meaning",
  },
];
