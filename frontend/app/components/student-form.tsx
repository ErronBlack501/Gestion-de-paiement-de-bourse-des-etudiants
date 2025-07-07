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
    sexe: (student?.sexe as "H" | "F" | "") || "",
    mail: student?.mail || "",
    datenais: student?.datenais ? new Date(student.datenais) : new Date(),
    etab: student?.etab || "",
    montant: student?.montant || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    const payload = {
      ...formData,
      datenais:
        formData.datenais instanceof Date
          ? format(formData.datenais, "yyyy-MM-dd")
          : formData.datenais,
    };
    console.log("Form submitted:", payload);
    if (onSuccess) onSuccess();
    handleOpenChange(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
        <form onSubmit={handleSubmit}>
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
                value={formData.matricule}
                onChange={handleChange}
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
                value={formData.nom}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sexe" className="text-right">
                Sexe
              </Label>
              <Select
                value={formData.sexe}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, sexe: value as "H" | "F" }))
                }
                required
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="H">Homme</SelectItem>
                  <SelectItem value="F">Femme</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="datenais" className="text-right">
                Date de naissance
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
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
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="etab" className="text-right">
                Institution
              </Label>
              <Select
                value={formData.etab}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, etab: value }))
                }
                required
              >
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
                value={formData.mail}
                onChange={handleChange}
                required
              />
            </div>

            {/* Montant (optionnel) */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="montant" className="text-right">
                Montant
              </Label>
              <Input
                id="montant"
                name="montant"
                placeholder="Montant de la bourse (optionnel)"
                className="col-span-3"
                value={formData.montant || ""}
                onChange={handleChange}
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
            <Button type="submit">{student ? "Mettre à jour" : "Créer"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
