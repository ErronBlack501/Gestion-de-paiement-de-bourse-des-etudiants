import * as React from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

interface DataTableRowActionsProps<T> {
  row: T;
  renderViewDialog?: (
    row: T,
    open: boolean,
    onOpenChange: (open: boolean) => void
  ) => React.ReactNode;
  renderEditDialog?: (
    row: T,
    open: boolean,
    onOpenChange: (open: boolean) => void
  ) => React.ReactNode;
  renderDeleteDialog?: (
    row: T,
    open: boolean,
    onOpenChange: (open: boolean) => void
  ) => React.ReactNode;
}

export function DataTableRowActions<T>({
  row,
  renderViewDialog,
  renderEditDialog,
  renderDeleteDialog,
}: DataTableRowActionsProps<T>) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Ellipsis className="h-4 w-4" />
            <span className="sr-only">Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {renderViewDialog && (
            <DropdownMenuItem onSelect={() => setIsViewDialogOpen(true)}>
              Voir les détails
            </DropdownMenuItem>
          )}
          {renderEditDialog && (
            <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
              Modifier
            </DropdownMenuItem>
          )}
          {renderDeleteDialog && (
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onSelect={() => setIsDeleteDialogOpen(true)}
            >
              Supprimer
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {renderViewDialog &&
        renderViewDialog(row, isViewDialogOpen, setIsViewDialogOpen)}
      {renderEditDialog &&
        renderEditDialog(row, isEditDialogOpen, setIsEditDialogOpen)}
      {renderDeleteDialog &&
        renderDeleteDialog(row, isDeleteDialogOpen, setIsDeleteDialogOpen)}
    </>
  );
}
