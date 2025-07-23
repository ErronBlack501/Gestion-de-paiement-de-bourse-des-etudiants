import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Calendar } from "~/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import * as React from "react";
import { format } from "date-fns";
import { useFetcher } from "react-router";
import { type Payment } from "~/routes/admin.payments/columns";

interface PaymentFormProps {
  buttonLabel?: string;
  dialogTitle?: string;
  dialogDescription?: string;
  children?: React.ReactNode;
  payment?: Payment;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function PaymentCreateForm({
  buttonLabel = "Ajouter Paiement",
  dialogTitle = "Gestion des Paiements",
  dialogDescription = "Ajouter les informations d'un paiement",
  children,
  payment,
  open: externalOpen,
  onOpenChange,
  onSuccess,
}: PaymentFormProps) {
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

  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
  };

  const [formData, setFormData] = React.useState({
    anneeUniv: payment?.anneeUniv || "",
    date: payment?.date ? new Date(payment.date) : new Date(),
    nbrMois: payment?.nbrMois || 1,
    equipements: payment?.equipements || 0,
    matricule: payment?.matricule || "",
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || <Button variant="outline">{buttonLabel}</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <fetcher.Form method="post" className="space-y-4">
          {/* Champ caché pour indiquer s'il s'agit d'une mise à jour */}
          {payment && <input type="hidden" name="id" value={payment.idPaye} />}

          {/* Champ caché pour la date formatée */}
          <input
            type="hidden"
            name="date"
            value={
              formData.date instanceof Date
                ? formData.date.toISOString()
                : formData.date
            }
          />

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="matricule" className="text-right">
                Matricule
              </Label>
              <Input
                id="matricule"
                name="matricule"
                placeholder="Numéro de matricule de l'étudiant"
                className="col-span-3"
                defaultValue={formData.matricule}
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="anneeUniv" className="text-left">
                Année Universitaire
              </Label>
              <Input
                id="anneeUniv"
                name="anneeUniv"
                placeholder="Ex: 2024-2025"
                pattern="[0-9]{4}-[0-9]{4}"
                className="col-span-3"
                defaultValue={formData.anneeUniv}
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date de paiement
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant={"outline"}
                    className="col-span-3 justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date
                      ? format(formData.date, "dd/MM/yyyy")
                      : "Choisir une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) =>
                      date && setFormData((prev) => ({ ...prev, date }))
                    }
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nbrMois" className="text-right">
                Nombre de mois
              </Label>
              <Select
                name="nbrMois"
                defaultValue={formData.nbrMois.toString()}
                required
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner le nombre de mois" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 mois</SelectItem>
                  <SelectItem value="2">2 mois</SelectItem>
                  <SelectItem value="3">3 mois</SelectItem>
                  <SelectItem value="4">4 mois</SelectItem>
                  <SelectItem value="5">5 mois</SelectItem>
                  <SelectItem value="6">6 mois</SelectItem>
                  <SelectItem value="7">7 mois</SelectItem>
                  <SelectItem value="8">8 mois</SelectItem>
                  <SelectItem value="9">9 mois</SelectItem>
                  <SelectItem value="10">10 mois</SelectItem>
                  <SelectItem value="11">11 mois</SelectItem>
                  <SelectItem value="12">12 mois</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="equipements" className="text-right">
                Équipements
              </Label>
              <Input
                id="equipements"
                name="equipements"
                type="number"
                min="0"
                step="1"
                placeholder="Montant des équipements"
                className="col-span-3"
                defaultValue={formData.equipements || 0}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={fetcher.state === "submitting"}>
              {fetcher.state === "submitting"
                ? payment
                  ? "Mise à jour..."
                  : "Création..."
                : payment
                  ? "Mettre à jour"
                  : "Créer"}
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
