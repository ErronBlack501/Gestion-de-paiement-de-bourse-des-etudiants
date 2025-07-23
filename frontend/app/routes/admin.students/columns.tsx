import { type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { Checkbox } from "~/components/ui/checkbox";
import { DataTableColumnHeader } from "~/components/data-table-column-header";
import { DataTableRowActions } from "~/components/data-table-row-actions";
import {
  StudentViewDialog,
  StudentEditDialog,
  StudentDeleteDialog,
} from "~/components/student-dialogs";
import { type Montant } from "../admin.amounts/columns";
import { Mars, Venus } from "lucide-react";

dayjs.locale("fr");

export type Student = {
  matricule: string;
  nom: string;
  etab: string | null;
  sexe: "H" | "F";
  mail: string;
  datenais: string;
  montant: Montant | null;
};

export const columns: ColumnDef<Student>[] = [
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
    id: "matricule",
    accessorKey: "matricule",
    header: () => <div className="text-center">Matricule</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {(row.getValue("matricule") as string).slice(0, 8)}
      </div>
    ),
  },
  {
    id: "nom",
    accessorKey: "nom",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center"
        column={column}
        title="Nom"
      />
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("nom")}</div>,
    enableSorting: false,
  },
  {
    id: "etab",
    accessorKey: "etab",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Etablissement" />
    ),
    cell: ({ row }) => <div>{row.getValue("etab")}</div>,
    enableSorting: true,
  },
  {
    id: "sexe",
    accessorKey: "sexe",
    header: () => <div className="text-center">Sexe</div>,
    cell: ({ row }) => {
      const sex = row.getValue("sexe") as string;
      return (
        <div className="flex justify-center">
          {sex === "H" ? (
            <Mars size={20} className="text-blue-600" />
          ) : (
            <Venus size={20} className="text-pink-500" />
          )}
        </div>
      );
    },
  },
  {
    id: "mail",
    accessorKey: "mail",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center"
        column={column}
        title="Email"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("mail")}</div>
    ),
    enableSorting: false,
  },
  {
    id: "niveau",
    accessorKey: "montant",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Niveau" />
    ),
    cell: ({ row }) => {
      const montant: Montant = row.getValue("montant");
      return <p>{montant.niveau}</p>;
    },
  },
  {
    id: "montant",
    accessorKey: "montant",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Montant" />
    ),
    cell: ({ row }) => {
      const montant: Montant = row.getValue("montant");
      return (
        <p className="font-medium">
          {montant ? `${montant.valeur.toLocaleString("fr-FR")} Ar` : "-"}
        </p>
      );
    },
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row.original}
        renderViewDialog={(student, open, onOpenChange) => (
          <StudentViewDialog
            student={student}
            open={open}
            onOpenChange={onOpenChange}
          />
        )}
        renderEditDialog={(student, open, onOpenChange) => (
          <StudentEditDialog
            student={student}
            open={open}
            onOpenChange={onOpenChange}
          />
        )}
        renderDeleteDialog={(student, open, onOpenChange) => (
          <StudentDeleteDialog
            student={student}
            open={open}
            onOpenChange={onOpenChange}
          />
        )}
      />
    ),
  },
];
