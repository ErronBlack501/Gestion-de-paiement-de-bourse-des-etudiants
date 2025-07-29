import { Button } from "~/components/ui/button";
import { useFetcher } from "react-router";
import type { Student } from "~/routes/admin.latecomers/columns";
import { useEffect, useState } from "react";
import { Loader2, Send } from "lucide-react";

export function NotifyLateComers({
  selectedRows,
}: {
  selectedRows: Student[];
}) {
  const fetcher = useFetcher();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted && fetcher.state === "idle") {
      setSubmitted(false);
      if (fetcher.data?.success) {
        alert("Emails envoyés avec succès !");
      } else if (fetcher.data?.error) {
        alert("Erreur : " + fetcher.data.error);
      }
    }
  }, [fetcher.state, fetcher.data, submitted]);

  return (
    <fetcher.Form method="post">
      <input type="hidden" name="_action" value="notify" />
      <input
        type="hidden"
        name="matricules"
        value={JSON.stringify(selectedRows.map((s) => s.matricule))}
      />

      <Button
        type="submit"
        disabled={fetcher.state !== "idle" || selectedRows.length === 0}
        onClick={() => setSubmitted(true)}
        className="flex items-center gap-2 rounded-2xl"
      >
        {fetcher.state !== "idle" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Envoi...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Notifier les retardataires
          </>
        )}
      </Button>
    </fetcher.Form>
  );
}
