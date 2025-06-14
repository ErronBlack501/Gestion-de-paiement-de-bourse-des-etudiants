import { PageHeader } from "~/components/page-header";
import { DataTable } from "~/components/data-table";
import { Button } from "~/components/ui/button";
import { columns } from "~/routes/admin.amounts/columns";
import type { Route } from ".react-router/types/app/routes/admin.students/+types/route";
import { CirclePlus } from "lucide-react";
import { AmountForm } from "~/components/amount-create-form";

export async function clientLoader() {
  const res = await fetch("http://localhost:8080/montants");
  const data = await res.json();
  return data;
}

export default function AmountsPage({ loaderData }: Route.ComponentProps) {
  const data = loaderData;
  return (
    <>
      <div className="flex items-center justify-between">
        <PageHeader
          title="Montants"
          subtitle="Gérer les informations des montants"
        />
        <Button
          variant="secondary"
          onClick={() => {
            /* handle open logic here */
          }}
        >
          <CirclePlus />
          Ajouter Montant
        </Button>
        <AmountForm open={false} onOpenChange={() => {}} />
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
