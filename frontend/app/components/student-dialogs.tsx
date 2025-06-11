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
            <b>Nom :</b> {student.name}
          </div>
          <div>
            <b>Email :</b> {student.email}
          </div>
          <div>
            <b>Sexe :</b> {student.sex === "male" ? "Homme" : "Femme"}
          </div>
          <div>
            <b>Date de naissance :</b> {student.dateOfBirth}
          </div>
          <div>
            <b>Créé le :</b> {student.createdAt}
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
  onSubmit?: (values: Omit<Student, "id" | "createdAt">) => void;
}) {
  const [form, setForm] = React.useState<Omit<Student, "id" | "createdAt">>({
    name: student.name,
    email: student.email,
    sex: student.sex,
    dateOfBirth: student.dateOfBirth,
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
        name: student.name,
        email: student.email,
        sex: student.sex,
        dateOfBirth: student.dateOfBirth,
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
            <Label>ID</Label>
            <Input value={student.id} disabled />
          </div>
          <div>
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="sex">Sexe</Label>
            <select
              id="sex"
              name="sex"
              value={form.sex}
              onChange={handleChange}
              className="bg-input border-border text-foreground w-full rounded-md border px-3 py-2"
              required
            >
              <option value="male">Homme</option>
              <option value="female">Femme</option>
            </select>
          </div>
          <div>
            <Label htmlFor="dateOfBirth">Date de naissance</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={form.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Créé le</Label>
            <Input value={student.createdAt} disabled />
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
          Es-tu sûr de vouloir supprimer <b>{student.name}</b> ?
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
