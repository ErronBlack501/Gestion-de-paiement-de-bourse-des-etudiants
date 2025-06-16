import { type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { Checkbox } from "~/components/ui/checkbox";
import { DataTableColumnHeader } from "~/components/data-table-column-header";
import { DataTableRowActions } from "~/components/data-table-row-actions";
import {
  AmountViewDialog,
  AmountEditDialog,
  AmountDeleteDialog,
} from "~/components/amount-dialogs";
import { toast } from "sonner";

dayjs.locale("fr");

export type Amount = {
  idniv: string;
  niveau: string;
  montant: number | string;
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
    accessorKey: "idniv",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center"
        column={column}
        title="ID Niveau"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("idniv")}</div>
    ),
    enableSorting: false,
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
    enableSorting: false,
  },
  {
    accessorKey: "montant",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center"
        column={column}
        title="Montant"
      />
    ),
    cell: ({ row }) => {
      const montant = row.getValue("montant");
      return (
        <div className="text-center font-medium">
          {montant
            ? `${parseInt(montant as string).toLocaleString("fr-FR")} Ar`
            : "-"}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        renderViewDialog={(row, open, onOpenChange) => (
          <AmountViewDialog
            amount={row.original}
            open={open}
            onOpenChange={onOpenChange}
          />
        )}
        renderEditDialog={(row, open, onOpenChange) => (
          <AmountEditDialog
            onSuccess={() => {
              toast.success("Montant modifié avec succès.");
            }}
            amount={row.original}
            open={open}
            onOpenChange={onOpenChange}
          />
        )}
        renderDeleteDialog={(row, open, onOpenChange) => (
          <AmountDeleteDialog
            amount={row.original}
            open={open}
            onOpenChange={onOpenChange}
          />
        )}
      />
    ),
  },
];
