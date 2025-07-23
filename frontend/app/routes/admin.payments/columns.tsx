import { type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { Checkbox } from "~/components/ui/checkbox";
import { DataTableColumnHeader } from "~/components/data-table-column-header";
import { DataTableRowActions } from "~/components/data-table-row-actions";
import {
  PaymentViewDialog,
  PaymentDeleteDialog,
} from "~/components/payment-dialogs";
import type { Student } from "../admin.students/columns";

dayjs.locale("fr");

export type Payment = {
  idPaye: string;
  anneeUniv: string;
  date: string;
  nbrMois: number;
  equipements: number;
  matricule: string;
  etudiant: Student;
  createdAt: string;
  updatedAt: string;
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
    accessorKey: "idPaye",
    header: () => <div className="text-center">ID Paiement</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {(row.getValue("idPaye") as string).slice(0, 8)}
      </div>
    ),
  },
  {
    accessorKey: "matricule",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Matricule"
        className="text-center"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("matricule")}</div>
    ),
  },
  {
    accessorKey: "anneeUniv",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Année Univ."
        className="text-center"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("anneeUniv")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: () => <div className="text-center">Date de paiement</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {dayjs(row.getValue("date")).format("DD/MM/YYYY")}
      </div>
    ),
  },
  {
    accessorKey: "nbrMois",
    header: () => <div className="text-center">Nombre de mois</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("nbrMois")}</div>
    ),
  },
  {
    accessorKey: "equipements",
    header: () => <div className="text-center">Équipements</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {Number(row.getValue("equipements")).toLocaleString("fr-FR")} Ar
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
    accessorKey: "updatedAt",
    header: () => <div className="text-center">Modifié le</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {dayjs(row.getValue("updatedAt")).format("DD/MM/YYYY à HH:mm")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row.original}
        renderViewDialog={(payment, open, onOpenChange) => (
          <PaymentViewDialog
            payment={payment}
            open={open}
            onOpenChange={onOpenChange}
          />
        )}
        renderDeleteDialog={(payment, open, onOpenChange) => (
          <PaymentDeleteDialog
            payment={payment}
            open={open}
            onOpenChange={onOpenChange}
          />
        )}
      />
    ),
  },
];
