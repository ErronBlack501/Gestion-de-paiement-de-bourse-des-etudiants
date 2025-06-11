import { type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { Checkbox } from "~/components/ui/checkbox";
import { DataTableColumnHeader } from "~/components/data-table-column-header";
import { DataTableRowActions } from "~/components/data-table-row-actions";

dayjs.locale("fr");

export type Payment = {
  idPaye: string;
  pMatricule: string;
  anneeUniv: string;
  date: string;
  nbrMois: number;
};

export const columns: ColumnDef<Payment>[] = [
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
    accessorKey: "id",
    header: () => <div className="text-center">Id</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {(row.getValue("id") as string).slice(0, 8)}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center"
        column={column}
        title="Nom"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("name")}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-center"
        column={column}
        title="Email"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "sex",
    header: () => <div className="text-center">Sexe</div>,
    cell: ({ row }) => {
      const sex = row.getValue("sex") as string;
      return (
        <div className="text-center capitalize">
          {sex === "male" ? "Homme" : "Femme"}
        </div>
      );
    },
  },
  {
    accessorKey: "dateOfBirth",
    header: () => <div className="text-center">Date de naissance</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {dayjs(row.getValue("dateOfBirth")).format("DD/MM/YYYY")}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Créé le</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {dayjs(row.getValue("createdAt")).format("DD/MM/YYYY à HH:mm")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions student={row.original} />,
  },
];
