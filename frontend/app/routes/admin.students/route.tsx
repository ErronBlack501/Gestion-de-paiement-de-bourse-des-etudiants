import { PageHeader } from "~/components/page-header";
import { DataTable } from "~/components/data-table";
import { Button } from "~/components/ui/button";
import { columns } from "~/routes/admin.students/columns";
import type { Route } from ".react-router/types/app/routes/admin.students/+types/route";
import { CirclePlus } from "lucide-react";
import StudentForm from "../../components/student-create-form";

export async function clientLoader() {
  const res = await fetch("http://localhost:8080/etudiants");
  const data = await res.json();
  return data;
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const action = formData.get("_action");

  const studentData = {
    matricule: formData.get("matricule"),
    nom: formData.get("nom"),
    mail: formData.get("mail"),
    niveau: formData.get("niveau"),
    sexe: formData.get("sexe"),
    etab: formData.get("etab"),
    datenais: formData.get("datenais"),
  };

  if (action === "edit") {
    const id = formData.get("id");
    const response = await fetch(
      `http://localhost:8080/update/etudiant/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
      },
    );

    if (!response.ok) throw new Error("Échec de la modification de l'étudiant");

    return {
      success: true,
      action: "edit",
      message: "Étudiant modifié avec succès.",
    };
  }

  if (action === "delete") {
    const matricule = formData.get("matricule");
    const response = await fetch(
      `http://localhost:8080/delete/etudiant/${matricule}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) throw new Error("Échec de la suppression de l'étudiant");

    return {
      success: true,
      action: "delete",
      message: "Étudiant supprimé avec succès.",
    };
  }

  // Par défaut : création
  const response = await fetch("http://localhost:8080/add/etudiant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentData),
  });

  if (!response.ok) throw new Error("Échec de la création de l'étudiant");

  return {
    success: true,
    action: "create",
    message: "Étudiant créé avec succès.",
  };
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
