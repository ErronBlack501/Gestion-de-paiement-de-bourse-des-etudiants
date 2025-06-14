import { PageHeader } from "~/components/page-header";
import { DataTable } from "~/components/data-table";
import { columns } from "~/routes/admin.amounts/columns";
import type { Route } from ".react-router/types/app/routes/admin.students/+types/route";
import { CirclePlus } from "lucide-react";
import AmountCreateForm from "~/components/amount-create-form";
import { Button } from "~/components/ui/button";
import { useFetcher } from "react-router";
import { toast } from "sonner";

export async function clientLoader() {
  const res = await fetch("http://localhost:8080/montants");
  const data = await res.json();
  return data;
}

export async function clientAction({ request }: { request: Request }) {
  let formData = await request.formData();
  const response = await fetch("http://localhost:8080/add/montant", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      niveau: formData.get("niveau"),
      montant: formData.get("montant"),
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to create amount");
  }
  return { success: true };
}

export default function AmountsPage({ loaderData }: Route.ComponentProps) {
  const data = loaderData;
  let fetcher = useFetcher();

  // Define a handler to be called on success
  const handleSuccess = () => {
    toast("L'ajout du montant a été un succès.");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <PageHeader
          title="Montants"
          subtitle="Gérer les informations des montants"
        />
        <AmountCreateForm
          onSuccess={handleSuccess}
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
