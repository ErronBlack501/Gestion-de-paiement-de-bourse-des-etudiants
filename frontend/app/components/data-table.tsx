import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type VisibilityState,
  getPaginationRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnFiltersState,
  type Row,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Input } from "~/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTablePagination } from "./data-table-pagination";
import { Button } from "./ui/button";
import { type Student } from "~/routes/admin.students/columns";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
interface SearchField {
  key: string;
  label: string;
  placeholder: string;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchFields?: SearchField[]; // Configuration des champs de recherche
  showAgeFilter?: boolean; // Afficher le filtre "Moins de 18 ans" pour les étudiants
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchFields,
  showAgeFilter = false,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 8,
  });
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [rowSelection, setRowSelection] = React.useState({});

  // États pour la recherche multi-paramètres (générique)
  const [searchValues, setSearchValues] = React.useState<
    Record<string, string>
  >(
    searchFields?.reduce((acc, field) => ({ ...acc, [field.key]: "" }), {}) ||
      {},
  );

  const customFilterFn = (
    row: Row<any>, // ou Row<Student> si tu as un type Student
    columnId: string,
    filterValue: string,
  ): boolean => {
    const search = filterValue.toLowerCase();

    const { nom, matricule, mail, etab, montant } = row.original;

    return (
      (nom?.toLowerCase().includes(search) ?? false) ||
      (matricule?.toLowerCase().includes(search) ?? false) ||
      (mail?.toLowerCase().includes(search) ?? false) ||
      (etab?.toLowerCase().includes(search) ?? false) ||
      (montant?.niveau?.toLowerCase().includes(search) ?? false)
    );
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: customFilterFn, // built-in filter function
    state: {
      sorting,
      columnFilters,
      pagination,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="flex items-center py-2">
        {/* Recherche simple par nom (quand pas de searchFields) */}
        {table.getColumn("nom") && (
          <div className="mb-4 w-full max-w-md space-y-1">
            <Label htmlFor="student-search" className="text-sm font-medium">
              Rechercher un étudiant
            </Label>
            <Input
              id="student-search"
              placeholder="Nom, matricule, email ou institution..."
              value={String(table.getState().globalFilter ?? "")}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
            />
          </div>
        )}
        <DataTableViewOptions table={table} />
      </div>

      <div className="mb-4 flex flex-wrap gap-4">
        {showAgeFilter && table.getColumn("datenais") && (
          <div className="w-48 space-y-2">
            <Button
              variant="outline"
              className="w-[180px]"
              onClick={() => {
                const current = table.getColumn("datenais")?.getFilterValue();
                table
                  .getColumn("datenais")
                  ?.setFilterValue(current ? undefined : true);
              }}
            >
              {table.getColumn("datenais")?.getFilterValue()
                ? "Tous les étudiants"
                : "Moins de 18 ans"}
            </Button>
          </div>
        )}

        {/* Filtre par Niveau */}
        {table.getColumn("montant") && (
          <div className="w-48 space-y-2">
            <Select
              value={
                (table
                  .getColumn("montant.niveau")
                  ?.getFilterValue() as string) ?? ""
              }
              onValueChange={(value) =>
                table
                  .getColumn("montant.niveau")
                  ?.setFilterValue(value === "*" ? undefined : value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tous les niveaux" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="*">Tous les niveaux</SelectItem>
                <SelectItem value="L1">L1</SelectItem>
                <SelectItem value="L2">L2</SelectItem>
                <SelectItem value="L3">L3</SelectItem>
                <SelectItem value="M1">M1</SelectItem>
                <SelectItem value="M2">M2</SelectItem>
                <SelectItem value="Doctorat">Doctorat</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Filtre par Institution */}
        {table.getColumn("etab") && (
          <div className="w-64 space-y-2">
            <Select
              value={
                (table.getColumn("etab")?.getFilterValue() as string) ?? ""
              }
              onValueChange={(value) =>
                table
                  .getColumn("etab")
                  ?.setFilterValue(value === "*" ? undefined : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Toutes les institutions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="*">Toutes les institutions</SelectItem>
                <SelectItem value="ENI">ENI</SelectItem>
                <SelectItem value="EMIT">EMIT</SelectItem>
                <SelectItem value="SCIENCES">SCIENCES</SelectItem>
                <SelectItem value="MEDECINE">MEDECINE</SelectItem>
                <SelectItem value="DEGSS - DROIT ET SCIENCES SOCIALES">
                  DROIT ET SCIENCES SOCIALES
                </SelectItem>
                <SelectItem value="ECONOMIE-ET-GESTION">
                  ECONOMIE ET GESTION
                </SelectItem>
                <SelectItem value="FLSH">FLSH</SelectItem>
                <SelectItem value="ENS">ENS</SelectItem>
                <SelectItem value="ISTE">ISTE</SelectItem>
                <SelectItem value="CONF">CONF</SelectItem>
                <SelectItem value="ISTR">ISTR</SelectItem>
                <SelectItem value="ISST">ISST</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="my-2 w-full overflow-auto rounded-md border border-gray-300">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={row.index % 2 !== 0 ? "bg-gray-200" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Pas de résultats.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </>
  );
}
