import { useState } from "react";
import { useFetcher } from "react-router";
import { PageHeader } from "~/components/page-header";
import { DataTable } from "~/components/data-table";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { CalendarDays } from "lucide-react";
import type { Student } from "../admin.latecomers/columns";
import { columns } from "../admin.latecomers/columns";

export async function clientAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const action = formData.get("_action");
  const selectedMonth = formData.get("month") as string | null;
  const matriculesRaw = formData.get("matricules");

  if (!action) {
    return { error: "Action manquante", data: [] };
  }

  switch (action) {
    case "fetch": {
      if (!selectedMonth) {
        return {
          error: "Veuillez sélectionner un mois",
          data: [],
        };
      }

      try {
        const response = await fetch(
          `http://localhost:8080/payer/retardataires?month=${selectedMonth}`,
        );

        if (!response.ok) {
          throw new Error("Réponse non valide");
        }

        const data: Student[] = await response.json();

        return {
          data,
          selectedMonth,
          error: null,
        };
      } catch (err) {
        return {
          error: "Erreur lors de la récupération des données",
          data: [],
          selectedMonth,
        };
      }
    }

    case "notify": {
      if (!matriculesRaw) {
        return { error: "Aucun étudiant sélectionné" };
      }

      try {
        const response = await fetch(
          "http://localhost:8080/email/retardataires",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              matricules: JSON.parse(matriculesRaw as string),
            }),
          },
        );

        if (!response.ok) {
          throw new Error("Échec d'envoi");
        }

        return {
          success: true,
          message: "Notifications envoyées avec succès.",
        };
      } catch (err) {
        return {
          error: "Échec de l'envoi des notifications",
        };
      }
    }

    default:
      return { error: `Action inconnue : ${action}` };
  }
}

export default function LateComers() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const fetcher = useFetcher<{
    data: any[];
    selectedMonth?: string;
    error?: string | null;
  }>();

  // Données provenant du fetcher ou tableau vide par défaut
  const lateComersData = fetcher.data?.data || [];
  const isLoading =
    fetcher.state === "submitting" || fetcher.state === "loading";
  const fetchedMonth = fetcher.data?.selectedMonth;
  const error = fetcher.data?.error;

  // Génération des options de mois (année courante)
  const generateMonthOptions = () => {
    const currentYear = new Date().getFullYear();
    const months = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];

    const options = [];

    // Ajouter tous les 12 mois de l'année
    for (let i = 1; i <= 12; i++) {
      const monthValue = `${currentYear}-${String(i).padStart(2, "0")}`;
      options.push({
        value: monthValue,
        label: `${months[i - 1]} ${currentYear}`,
      });
    }

    return options;
  };

  const monthOptions = generateMonthOptions();

  const formatMonthForDisplay = (monthValue: string) => {
    if (!monthValue) return "";
    return new Date(monthValue + "-01").toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <PageHeader
          title="Retardataires"
          subtitle="Liste des étudiants n'ayant pas encore eu leurs bourses pour un mois donné"
        />
        <fetcher.Form method="post" className="flex items-end gap-4">
          <div>
            <input type="hidden" name="_action" value="fetch" />
            <label className="mb-1 block text-sm font-medium">
              Mois concerné
            </label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sélectionner un mois" />
              </SelectTrigger>
              <SelectContent>
                {monthOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* 👇 Ce champ est crucial : il transmet la valeur sélectionnée */}
            <input type="hidden" name="month" value={selectedMonth} />
          </div>

          <Button type="submit" disabled={isLoading || !selectedMonth}>
            <CalendarDays className="mr-2 h-4 w-4" />
            {isLoading ? "Chargement..." : "Rechercher"}
          </Button>
        </fetcher.Form>
      </div>

      {/* Affichage des erreurs */}
      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Titre avec le mois sélectionné */}
      {fetchedMonth && (
        <div className="mb-4 border-b pb-2">
          <h3 className="text-lg font-medium text-gray-900">
            Retardataires pour {formatMonthForDisplay(fetchedMonth)}
          </h3>
          {!isLoading && lateComersData.length === 0 && !error && (
            <p className="mt-1 text-sm text-gray-500">
              Aucun retardataire trouvé pour ce mois
            </p>
          )}
        </div>
      )}

      <DataTable columns={columns} data={lateComersData} />
    </>
  );
}
