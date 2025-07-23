import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { type Payment } from "~/routes/admin.payments/columns";
import { format, parseISO } from "date-fns";
import { useFetcher } from "react-router";

export function PaymentViewDialog({
  payment,
  open,
  onOpenChange,
}: {
  payment: Payment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Détails du paiement</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <b>ID Paiement :</b> {payment.idPaye}
          </div>
          <div>
            <b>Matricule :</b> {payment.matricule}
          </div>
          <div>
            <b>Année universitaire :</b> {payment.anneeUniv}
          </div>
          <div>
            <b>Date de paiement :</b>{" "}
            {format(parseISO(payment.date), "dd/MM/yyyy")}
          </div>
          <div>
            <b>Nombre de mois :</b> {payment.nbrMois} mois
          </div>
          <div>
            <b>Équipements :</b> {payment.equipements.toLocaleString()} Ar
          </div>
          <div>
            <b>Créé le :</b>{" "}
            {format(parseISO(payment.createdAt), "dd/MM/yyyy à HH:mm")}
          </div>
          <div>
            <b>Mis à jour le :</b>{" "}
            {format(parseISO(payment.updatedAt), "dd/MM/yyyy à HH:mm")}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function PaymentDeleteDialog({
  payment,
  open,
  onOpenChange,
  onSuccess,
}: {
  payment: Payment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}) {
  const fetcher = useFetcher();

  React.useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      onSuccess?.();
      onOpenChange(false);
    }
  }, [fetcher.state, fetcher.data, onSuccess, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer le paiement</DialogTitle>
        </DialogHeader>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="delete" />
          <input type="hidden" name="idPaye" value={payment.idPaye} />

          <div className="mb-4 space-y-3">
            <p>Êtes-vous sûr de vouloir supprimer ce paiement ?</p>
            <div className="rounded bg-gray-50 p-3">
              <div>
                <b>ID :</b> {payment.idPaye}
              </div>
              <div>
                <b>Matricule :</b> {payment.matricule}
              </div>
              <div>
                <b>Équipements :</b> {payment.equipements.toLocaleString()} Ar
              </div>
              <div>
                <b>Date :</b> {format(parseISO(payment.date), "dd/MM/yyyy")}
              </div>
            </div>
            <p className="text-sm text-red-600">
              Cette action est irréversible.
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={fetcher.state === "submitting"}
            >
              {fetcher.state === "submitting" ? "Suppression..." : "Supprimer"}
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
