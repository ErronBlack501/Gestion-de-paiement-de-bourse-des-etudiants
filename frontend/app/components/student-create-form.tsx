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
import type { Student } from "../routes/admin.students/columns";
import * as React from "react";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useFetcher } from "react-router";

interface ActionFormProps {
  buttonLabel?: string;
  dialogTitle?: string;
  dialogDescription?: string;
  children?: React.ReactNode;
  student?: Student;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function StudentForm({
  buttonLabel = "Ajouter Étudiant",
  dialogTitle = "Gestion des Étudiants",
  dialogDescription = "Ajouter ou modifier les informations d'un étudiant",
  children,
  student,
  open: externalOpen,
  onOpenChange,
  onSuccess,
}: ActionFormProps) {
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
    matricule: student?.matricule || "",
    nom: student?.nom || "",
    etab: student?.etab || "",
    sexe: (student?.sexe as "H" | "F" | "") || "",
    mail: student?.mail || "",
    datenais: student?.datenais ? new Date(student.datenais) : new Date(),
    niveau: student?.montant?.niveau || "",
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
          {student && (
            <input type="hidden" name="id" value={student.matricule} />
          )}

          {/* Champ caché pour la date formatée */}
          <input
            type="hidden"
            name="datenais"
            value={
              formData.datenais instanceof Date
                ? format(formData.datenais, "yyyy-MM-dd")
                : formData.datenais
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
                placeholder="Numéro de matricule"
                className="col-span-3"
                defaultValue={formData.matricule}
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nom" className="text-right">
                Nom complet
              </Label>
              <Input
                id="nom"
                name="nom"
                placeholder="Nom et prénom"
                className="col-span-3"
                defaultValue={formData.nom}
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Sexe</Label>
              <RadioGroup
                name="sexe"
                defaultValue={formData.sexe}
                className="col-span-3 flex flex-row items-center space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="H" id="sexe-homme" />
                  <Label htmlFor="sexe-homme">Homme</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="F" id="sexe-femme" />
                  <Label htmlFor="sexe-femme">Femme</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="datenais" className="text-right">
                Date de naissance
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant={"outline"}
                    className="col-span-3 justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.datenais
                      ? format(formData.datenais, "dd/MM/yyyy")
                      : "Choisir une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.datenais}
                    onSelect={(date) =>
                      date &&
                      setFormData((prev) => ({ ...prev, datenais: date }))
                    }
                    className="rounded-md border shadow-sm"
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="etab" className="text-right">
                Institution
              </Label>
              <Select name="etab" defaultValue={formData.etab} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner l'institution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ENI">ENI</SelectItem>
                  <SelectItem value="EMIT">EMIT</SelectItem>
                  <SelectItem value="SCIENCES">SCIENCES</SelectItem>
                  <SelectItem value="MEDECINE">MEDECINE</SelectItem>
                  <SelectItem value="DEGSS - DROIT ET SCIENCES SOCIALES">
                    DROIT ET SCIENCES SOCIALES
                  </SelectItem>
                  <SelectItem value="ECONOMIE-ET-GESTION">
                    ECONOMIE ET GESTION
                  </SelectItem>
                  <SelectItem value="FLSH">FLSH</SelectItem>
                  <SelectItem value="ENS">ENS</SelectItem>
                  <SelectItem value="ISTE">ISTE</SelectItem>
                  <SelectItem value="CONF">CONF</SelectItem>
                  <SelectItem value="ISTR">ISTR</SelectItem>
                  <SelectItem value="ISST">ISST</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mail" className="text-right">
                Email
              </Label>
              <Input
                id="mail"
                name="mail"
                type="email"
                placeholder="Adresse email"
                className="col-span-3"
                defaultValue={formData.mail}
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="niveau" className="text-right">
                Niveau
              </Label>
              <Select name="niveau" defaultValue={formData.niveau} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner le niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L1">L1</SelectItem>
                  <SelectItem value="L2">L2</SelectItem>
                  <SelectItem value="L3">L3</SelectItem>
                  <SelectItem value="M1">M1</SelectItem>
                  <SelectItem value="M2">M2</SelectItem>
                  <SelectItem value="Doctorat">Doctorat</SelectItem>
                </SelectContent>
              </Select>
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
                ? student
                  ? "Mise à jour..."
                  : "Création..."
                : student
                  ? "Mettre à jour"
                  : "Créer"}
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
