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
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
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
import type { Student } from "~/routes/admin.students/columns";
import { format, parseISO } from "date-fns";
import { useFetcher } from "react-router";

export function StudentViewDialog({
  student,
  open,
  onOpenChange,
}: {
  student: Student;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Détails de l'étudiant</DialogTitle>
        </DialogHeader>
        <div>
          <div>
            <b>Matricule :</b> {student.matricule}
          </div>
          <div>
            <b>Nom :</b> {student.nom}
          </div>
          <div>
            <b>Email :</b> {student.mail}
          </div>
          <div>
            <b>Sexe :</b> {student.sexe === "H" ? "Homme" : "Femme"}
          </div>
          <div>
            <b>Date de naissance :</b> {student.datenais}
          </div>
          <div>
            <b>Niveau :</b> {student.montant?.niveau || "Non défini"}
          </div>
          <div>
            <b>Montant :</b> {student.montant?.valeur || "Non défini"} Ar
          </div>
          <div>
            <b>Établissement :</b> {student.etab}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function StudentEditDialog({
  student,
  open,
  onOpenChange,
  onSuccess,
}: {
  student: Student;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}) {
  const fetcher = useFetcher();

  const [form, setForm] = React.useState<Omit<Student, "matricule">>({
    nom: student.nom,
    sexe: student.sexe,
    mail: student.mail,
    datenais: student.datenais,
    montant: student.montant,
    etab: student.etab,
  });

  // Fermer le dialog après succès
  React.useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data && fetcher.data.success) {
      onSuccess?.();
      onOpenChange(false);
    }
  }, [fetcher.state, fetcher.data, onSuccess, onOpenChange]);

  React.useEffect(() => {
    if (open) {
      setForm({
        nom: student.nom,
        sexe: student.sexe,
        mail: student.mail,
        datenais: student.datenais,
        montant: student.montant,
        etab: student.etab,
      });
    }
  }, [open, student]);

  const handleRadioChange = (value: "H" | "F") => {
    setForm((prev) => ({ ...prev, sexe: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date)
      setForm((prev) => ({
        ...prev,
        datenais: format(date, "yyyy-MM-dd"),
      }));
  };

  const handleNiveauChange = (niveau: string) => {
    setForm((prev) => ({
      ...prev,
      montant: prev.montant
        ? { ...prev.montant, niveau }
        : { niveau, idNiv: 0, valeur: 0 },
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modifier l'étudiant</DialogTitle>
        </DialogHeader>
        <fetcher.Form method="post" className="space-y-4">
          <input type="hidden" name="_action" value="edit" />
          <input type="hidden" name="id" value={student.matricule} />
          <input type="hidden" name="datenais" value={form.datenais} />

          <div>
            <Label>Matricule</Label>
            <Input value={student.matricule} disabled />
          </div>
          <div>
            <Label htmlFor="nom">Nom</Label>
            <Input
              id="nom"
              name="nom"
              value={form.nom}
              onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="mail">Email</Label>
            <Input
              id="mail"
              name="mail"
              type="email"
              value={form.mail}
              onChange={(e) => setForm((f) => ({ ...f, mail: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label>Sexe</Label>
            <RadioGroup
              name="sexe"
              value={form.sexe}
              onValueChange={handleRadioChange}
              className="flex flex-row space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="H" id="edit-sexe-homme" />
                <Label htmlFor="edit-sexe-homme">Homme</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="F" id="edit-sexe-femme" />
                <Label htmlFor="edit-sexe-femme">Femme</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label>Date de naissance</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  type="button"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.datenais
                    ? format(parseISO(form.datenais), "dd/MM/yyyy")
                    : "Choisir une date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={parseISO(form.datenais)}
                  onSelect={handleDateChange}
                  autoFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label>Niveau</Label>
            <Select
              name="niveau"
              value={form.montant?.niveau || ""}
              onValueChange={handleNiveauChange}
              required
            >
              <SelectTrigger className="w-full">
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
          <div>
            <Label>Établissement</Label>
            <Input
              name="etab"
              value={form.etab ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, etab: e.target.value }))}
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
              {fetcher.state === "submitting"
                ? "Mise à jour..."
                : "Enregistrer"}
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}

export function StudentDeleteDialog({
  student,
  open,
  onOpenChange,
  onSuccess,
}: {
  student: Student;
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
          <DialogTitle>Supprimer l'étudiant</DialogTitle>
        </DialogHeader>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="delete" />
          <input type="hidden" name="matricule" value={student.matricule} />
          <div>
            Es-tu sûr de vouloir supprimer <b>{student.nom}</b> ?
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
