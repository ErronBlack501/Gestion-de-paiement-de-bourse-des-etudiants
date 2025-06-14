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

dayjs.locale("fr");

export type Student = {
  matricule: string;
  nom: string;
  sexe: "H" | "F";
  mail: string;
  datenais: string;
  montant: string | null;
  etab: string | null;
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
    accessorKey: "matricule",
    header: () => <div className="text-center">Matricule</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {(row.getValue("matricule") as string).slice(0, 8)}
      </div>
    ),
  },
  {
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
    accessorKey: "sexe",
    header: () => <div className="text-center">Sexe</div>,
    cell: ({ row }) => {
      const sex = row.getValue("sexe") as string;
      return (
        <div className="text-center capitalize">
          {sex === "H" ? "Homme" : "Femme"}
        </div>
      );
    },
  },
  {
    accessorKey: "mail",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-center"
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
    accessorKey: "montant",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-center"
        column={column}
        title="Niveau"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("montant")}</div>
    ),
  },
  {
    accessorKey: "etab",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-center"
        column={column}
        title="Etablissement"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("etab")}</div>
    ),
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
