import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
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
}: {
  student: Student;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  // Remplace ce formulaire par ton vrai formulaire d'édition
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier l'étudiant</DialogTitle>
        </DialogHeader>
        <div>
          {/* Place ton formulaire ici */}
          <div>Formulaire d'édition pour {student.name}</div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Annuler</Button>
          <Button>Enregistrer</Button>
        </DialogFooter>
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
