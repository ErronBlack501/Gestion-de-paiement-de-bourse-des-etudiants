import * as React from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

interface AmountCreateFormProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

export default function AmountCreateForm({
  open: externalOpen,
  onOpenChange,
  onSuccess,
  trigger,
}: AmountCreateFormProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const fetcher = useFetcher();

  // Fermer le dialog après un succès
  React.useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data && fetcher.data.success) {
      if (onSuccess) onSuccess();
      if (onOpenChange) onOpenChange(false);
      else setInternalOpen(false);
    }
  }, [fetcher.state, fetcher.data, onSuccess, onOpenChange]);

  const handleOpenChange = (value: boolean) => {
    if (onOpenChange) onOpenChange(value);
    else setInternalOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Ajouter un montant</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un montant</DialogTitle>
        </DialogHeader>
        <fetcher.Form method="post" className="space-y-4">
          <div>
            <Label htmlFor="niveau">Niveau</Label>
            <Select name="niveau" required>
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
            <Label htmlFor="valeur">Montant (Ar)</Label>
            <Input
              id="valeur"
              name="valeur"
              type="number"
              min={0}
              required
              placeholder="Ex: 25000"
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={fetcher.state === "submitting"}>
              Ajouter
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
