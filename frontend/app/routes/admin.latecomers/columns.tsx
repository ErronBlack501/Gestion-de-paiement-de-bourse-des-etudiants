// columns.tsx
import { type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { Checkbox } from "~/components/ui/checkbox";
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
        aria-label="Tout sélectionner"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Sélectionner"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "matricule",
    header: "Matricule",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("matricule")}</div>
    ),
  },
  {
    accessorKey: "nom",
    header: "Nom",
    cell: ({ row }) => <div className="text-center">{row.getValue("nom")}</div>,
  },
  {
    accessorKey: "sexe",
    header: "Sexe",
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
    accessorKey: "mail",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("mail")}</div>
    ),
  },
  {
    accessorKey: "datenais",
    header: "Date de naissance",
    cell: ({ row }) => {
      const rawDate = row.getValue("datenais") as string;
      return (
        <div className="text-center">
          {dayjs(rawDate).format("DD MMMM YYYY")}
        </div>
      );
    },
  },
];
