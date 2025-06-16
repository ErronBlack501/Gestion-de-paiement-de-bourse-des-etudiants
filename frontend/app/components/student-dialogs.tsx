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
import type { Student } from "~/routes/admin.students/columns";

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
            <b>Niveau :</b> {student.montant}
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
  onSubmit,
}: {
  student: Student;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (values: Omit<Student, "matricule">) => void;
}) {
  const [form, setForm] = React.useState<Omit<Student, "matricule">>({
    nom: student.nom,
    sexe: student.sexe,
    mail: student.mail,
    datenais: student.datenais,
    montant: student.montant,
    etab: student.etab,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(form);
    onOpenChange(false);
  };

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier l'étudiant</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="sexe">Sexe</Label>
            <select
              id="sexe"
              name="sexe"
              value={form.sexe}
              onChange={handleChange}
              className="bg-input border-border text-foreground w-full rounded-md border px-3 py-2"
              required
            >
              <option value="H">Homme</option>
              <option value="F">Femme</option>
            </select>
          </div>
          <div>
            <Label htmlFor="datenais">Date de naissance</Label>
            <Input
              id="datenais"
              name="datenais"
              type="date"
              value={form.datenais}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="montant">Niveau</Label>
            <Input
              id="montant"
              name="montant"
              value={form.montant ?? ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="etab">Établissement</Label>
            <Input
              id="etab"
              name="etab"
              value={form.etab ?? ""}
              onChange={handleChange}
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
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function StudentDeleteDialog({
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
          <DialogTitle>Supprimer l'étudiant</DialogTitle>
        </DialogHeader>
        <div>
          Es-tu sûr de vouloir supprimer <b>{student.nom}</b> ?
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button variant="destructive">Supprimer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
