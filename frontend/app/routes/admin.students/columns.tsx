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
import { Checkbox } from "~/components/ui/checkbox";
import { DataTableColumnHeader } from "~/components/data-table-column-header";
import ActionForm from "~/routes/admin.students/action-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";

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
    cell: ({ row }) => {
      const students = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <ActionForm
                buttonLabel="Modifier"
                dialogTitle="Modifier un Etudiant"
                dialogDescription="Modifier les informations d'un étudiant."
              >
                <div className="flex items-center gap-2">
                  <SquarePen /> Modifier{" "}
                </div>
              </ActionForm>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Eye />
              Détails
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Dialog>
                <DialogTrigger>
                  {" "}
                  <Trash2 color="#ef4444" />
                  Supprimer
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmation de suppression</DialogTitle>
                    <DialogDescription>
                      Êtes-vous sûr de vouloir supprimer cet étudiant ? Cette
                      action est irréversible et supprimera définitivement
                      toutes les données associées à cet étudiant.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              ;
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
