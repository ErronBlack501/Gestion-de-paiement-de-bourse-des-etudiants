import { PageHeader } from "~/components/page-header";
import { DataTable } from "~/components/data-table";
import { Button } from "~/components/ui/button";
import { columns } from "~/routes/admin.students/columns";
import type { Route } from ".react-router/types/app/routes/admin.students/+types/route";
import { CirclePlus } from "lucide-react";
import StudentForm from "../../components/student-form";

export async function clientLoader() {
  const res = await fetch("http://localhost:8080/etudiants");
  const data = await res.json();
  return data;
}

export default function StudentsPage({ loaderData }: Route.ComponentProps) {
  const data = loaderData;
  return (
    <>
      <div className="flex items-center justify-between">
        <PageHeader
          title="Étudiants"
          subtitle="Gérer les informations des étudiants"
        />
        <StudentForm>
          <Button variant="secondary">
            <CirclePlus />
            Ajouter Étudiant
          </Button>
        </StudentForm>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
