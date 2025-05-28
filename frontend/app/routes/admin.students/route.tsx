import { PageHeader } from "~/components/page-header";
import { DataTable } from "~/components/data-table";
import { type Student, columns } from "~/routes/admin.students/columns";
import type { Route } from ".react-router/types/app/routes/admin.students/+types/route";

export async function clientLoader() {
  const res = await fetch(
    "https://6831b5e96205ab0d6c3d55bd.mockapi.io/api/v1/students",
  );
  const data = await res.json();
  return data;
}

export default function StudentsPage({ loaderData }: Route.ComponentProps) {
  const data = loaderData;
  return (
    <>
      <PageHeader
        title="Étudiants"
        subtitle="Gérer les informations des étudiants"
        addLabel="Ajouter un étudiant"
      />
      <DataTable columns={columns} data={data} />
    </>
  );
}
