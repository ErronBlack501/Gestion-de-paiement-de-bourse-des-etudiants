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
import { useFetcher } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { Montant } from "~/routes/admin.amounts/columns";

export function AmountViewDialog({
  amount,
  open,
  onOpenChange,
}: {
  amount: Montant;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Détails du montant</DialogTitle>
        </DialogHeader>
        <div>
          <div>
            <b>ID Niveau :</b> {amount.idNiv}
          </div>
          <div>
            <b>Niveau :</b> {amount.niveau}
          </div>
          <div>
            <b>Montant :</b> {amount.valeur} Ar
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AmountEditDialog({
  amount,
  open,
  onOpenChange,
  onSuccess,
}: {
  amount: Montant;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}) {
  const fetcher = useFetcher();

  // Reset fetcher quand on ferme le dialog
  React.useEffect(() => {
    if (!open && fetcher.data) {
      // @ts-ignore
      fetcher.data = undefined;
    }
  }, [open]);

  React.useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data && fetcher.data.success) {
      if (onSuccess) onSuccess();
      onOpenChange(false);
    }
  }, [fetcher.state, fetcher.data, onSuccess, onOpenChange]);

  return (
    <Dialog
      key={open ? amount.idNiv : "closed"}
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le montant</DialogTitle>
        </DialogHeader>
        <fetcher.Form method="post" className="space-y-4">
          <input type="hidden" name="_action" value="edit" />
          <input type="hidden" name="idniv" value={amount.idNiv} />
          <div>
            <Label>ID Niveau</Label>
            <Input value={amount.idNiv} disabled />
          </div>
          <div>
            <Label htmlFor="niveau">Niveau</Label>
            <Select name="niveau" defaultValue={amount.niveau} required>
              <SelectTrigger id="niveau" className="w-full">
                <SelectValue placeholder="Sélectionner le niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="L1">Licence 1</SelectItem>
                <SelectItem value="L2">Licence 2</SelectItem>
                <SelectItem value="L3">Licence 3</SelectItem>
                <SelectItem value="M1">Master 1</SelectItem>
                <SelectItem value="M2">Master 2</SelectItem>
                <SelectItem value="Doctorat">Doctorat</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="montant">Montant (Ar)</Label>
            <Input
              id="montant"
              name="montant"
              type="number"
              min={0}
              required
              defaultValue={amount.valeur}
              placeholder="Ex: 25000"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={fetcher.state === "submitting"}>
              Enregistrer
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}

export function AmountDeleteDialog({
  amount,
  open,
  onOpenChange,
  onSuccess,
}: {
  amount: Montant;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}) {
  const fetcher = useFetcher();

  React.useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data && fetcher.data.success) {
      if (onSuccess) onSuccess();
      onOpenChange(false);
    }
  }, [fetcher.state, fetcher.data, onSuccess, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer le montant</DialogTitle>
        </DialogHeader>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="delete" />
          <input type="hidden" name="idniv" value={amount.idNiv} />
          <div>
            Es-tu sûr de vouloir supprimer le montant pour{" "}
            <b>{amount.niveau}</b> ?
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
              Supprimer
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
