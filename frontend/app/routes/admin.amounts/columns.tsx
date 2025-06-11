import { type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { Checkbox } from "~/components/ui/checkbox";
import { DataTableColumnHeader } from "~/components/data-table-column-header";
import { DataTableRowActions } from "~/components/data-table-row-actions";

dayjs.locale("fr");

export type Amount = {
  idNiv: string;
  niveau: string;
  montant: string;
  updatedAt?: string;
};

export const columns: ColumnDef<Amount>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Sélectionner tout"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Sélectionner la ligne"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "idNiv",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center"
        column={column}
        title="ID Niveau"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("idNiv")}</div>
    ),
  },
  {
    accessorKey: "niveau",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center"
        column={column}
        title="Niveau"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("niveau")}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "montant",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center"
        column={column}
        title="Montant (FCFA)"
      />
    ),
    cell: ({ row }) => {
      const montant = row.getValue("montant");
      return (
        <div className="text-center font-medium">
          {montant ? `${parseInt(montant as string).toLocaleString('fr-FR')} FCFA` : '-'}
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-center">Dernière mise à jour</div>,
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt");
      return (
        <div className="text-center">
          {updatedAt ? dayjs(updatedAt as string).format("DD/MM/YYYY à HH:mm") : "-"}
        </div>
      );
    },
    enableSorting: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions amount={row.original} />,
  },
];
