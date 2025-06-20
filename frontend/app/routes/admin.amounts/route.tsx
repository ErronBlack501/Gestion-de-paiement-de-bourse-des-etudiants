import { PageHeader } from "~/components/page-header";
import { DataTable } from "~/components/data-table";
import { columns, type Amount } from "~/routes/admin.amounts/columns";
import type { Route } from ".react-router/types/app/routes/admin.students/+types/route";
import { CirclePlus } from "lucide-react";
import AmountCreateForm from "~/components/amount-create-form";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { useFetcher } from "react-router";

export async function clientLoader() {
  const res = await fetch("http://localhost:8080/montants");
  const data = await res.json();
  return data;
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  const action = formData.get("_action");

  if (action === "edit") {
    // Modification d'un montant
    const idniv = formData.get("idniv");
    const niveau = formData.get("niveau");
    const montant = formData.get("montant");
    const response = await fetch(
      `http://localhost:8080/update/montant/${idniv}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niveau, montant }),
      },
    );
    if (!response.ok) throw new Error("Failed to edit amount");
    return {
      success: true,
      action: "edit",
      message: "Montant modifié avec succès.",
    };
  }

  if (action === "delete") {
    // Suppression d'un montant
    const idniv = formData.get("idniv");
    const response = await fetch(
      `http://localhost:8080/delete/montant/${idniv}`,
      {
        method: "DELETE",
      },
    );
    if (!response.ok) throw new Error("Failed to delete amount");
    return {
      success: true,
      action: "delete",
      message: "Montant supprimé avec succès.",
    };
  }

  // Par défaut : création
  const niveau = formData.get("niveau");
  const montant = formData.get("montant");
  const response = await fetch("http://localhost:8080/add/montant", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      niveau,
      montant,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to create amount");
  }
  return {
    success: true,
    action: "create",
    message: "Montant créé avec succès.",
  };
}

export default function AmountsPage({ loaderData }: Route.ComponentProps) {
  const data: Amount[] = loaderData;
  return (
    <>
      <div className="flex items-center justify-between">
        <PageHeader
          title="Montants"
          subtitle="Gérer les informations des montants"
        />
        <AmountCreateForm
          trigger={
            <Button variant="secondary">
              <CirclePlus />
              Ajouter Montant
            </Button>
          }
        />
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
