import { type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ArrowUpDown, Ellipsis, Eye, SquarePen, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";

dayjs.locale("fr");

export type Student = {
  id: string;
  name: string;
  email: string;
  sex: "male" | "female";
  dateOfBirth: string;
  createdAt: string;
};

export const columns: ColumnDef<Student>[] = [
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
    header: () => <div className="text-center">Nom</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="text-center">Email</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
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
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <SquarePen />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Eye />
              Détails
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 color="#ef4444" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
