import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Amount } from "~/routes/admin.amounts/columns";

export function AmountForm({
  amount,
  open,
  onOpenChange,
  onSubmit,
}: {
  amount?: Amount;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (values: Omit<Amount, "idNiv">) => void;
}) {
  const [form, setForm] = React.useState<Omit<Amount, "idNiv">>({
    niveau: amount?.niveau ?? "",
    montant: amount?.montant ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(form);
    onOpenChange(false);
  };

  React.useEffect(() => {
    if (open && amount) {
      setForm({
        niveau: amount.niveau,
        montant: amount.montant,
      });
    }
    if (open && !amount) {
      setForm({
        niveau: "",
        montant: "",
      });
    }
  }, [open, amount]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{amount ? "Modifier le montant" : "Ajouter un montant"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {amount && (
            <div>
              <Label>ID Niveau</Label>
              <Input value={amount.idNiv} disabled />
            </div>
          )}
          <div>
            <Label htmlFor="niveau">Niveau</Label>
            <Input
              id="niveau"
              name="niveau"
              value={form.niveau}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="montant">Montant (FCFA)</Label>
            <Input
              id="montant"
              name="montant"
              type="number"
              min={0}
              value={form.montant}
              onChange={handleChange}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">{amount ? "Enregistrer" : "Ajouter"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}