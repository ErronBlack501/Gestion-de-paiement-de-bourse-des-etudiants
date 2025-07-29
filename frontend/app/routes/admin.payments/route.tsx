import { PageHeader } from "~/components/page-header";
import { DataTable } from "~/components/data-table";
import { Button } from "~/components/ui/button";
import { columns, type Payment } from "~/routes/admin.payments/columns";
import type { Route } from ".react-router/types/app/routes/admin.students/+types/route";
import { CirclePlus } from "lucide-react";
import PaymentCreateForm from "~/components/payment-create-form";
import PaymentPdf from "~/components/payment-pdf";
import * as ReactPDF from "@react-pdf/renderer";

async function generateAndDownloadPdf(payerData: Payment) {
  const blob = await ReactPDF.pdf(<PaymentPdf payment={payerData} />).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `recu_paiement_${payerData.etudiant?.matricule}.pdf`;
  link.click();

  URL.revokeObjectURL(url);
}

export async function clientLoader() {
  const res = await fetch("http://localhost:8080/payers");
  const data = await res.json();
  return data;
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const action = formData.get("_action");

  const paymentData = {
    anneeUniv: formData.get("anneeUniv"),
    date: formData.get("date"),
    nbrMois: Number(formData.get("nbrMois")),
    equipements: Number(formData.get("equipements")),
    matricule: formData.get("matricule"),
  };

  if (action === "delete") {
    const id = formData.get("idPaye");
    const response = await fetch(`http://localhost:8080/delete/payer/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Échec de la suppression du paiement");

    return {
      success: true,
      action: "delete",
      message: "Paiement supprimé avec succès.",
    };
  }

  // Par défaut : création
  const response = await fetch("http://localhost:8080/add/payer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paymentData),
  });

  if (!response.ok) throw new Error("Échec de la création du paiement");

  const newPayment: Payment = await response.json();

  await generateAndDownloadPdf(newPayment);

  return {
    success: true,
    action: "create",
    message: "Paiement créé avec succès.",
  };
}

const payementSearchFields = [
  {
    key: "etudiant",
    label: "Étudiant",
    placeholder: "Rechercher par étudiant...",
  },
  {
    key: "reference",
    label: "Référence",
    placeholder: "Rechercher par référence...",
  },
  { key: "statut", label: "Statut", placeholder: "Rechercher par statut..." },
];

export default function PaymentsPage({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <PageHeader
          title="Paiements"
          subtitle="Gérer les informations des paiements des étudiants"
        />
        <PaymentCreateForm>
          <Button variant="secondary">
            <CirclePlus />
            Ajouter un Paiement
          </Button>
        </PaymentCreateForm>
      </div>
      <DataTable
        columns={columns}
        data={loaderData}
        searchFields={payementSearchFields}
        // showAgeFilter pas spécifié = false par défaut
      />{" "}
    </>
  );
}
