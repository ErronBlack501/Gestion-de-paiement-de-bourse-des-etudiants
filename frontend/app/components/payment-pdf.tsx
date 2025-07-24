// app/components/pdf/PaymentPdf.tsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { getPreviousMonths } from "~/lib/utils";
import type { Payment } from "~/routes/admin.payments/columns";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 12,
    textDecoration: "underline",
    fontWeight: "bold",
  },
  dateContainer: {
    alignItems: "flex-end",
    marginBottom: 12,
  },
  date: {
    fontSize: 10,
  },
  studentInfo: {
    marginBottom: 12,
    lineHeight: 1.3,
  },
  infoLine: {
    marginBottom: 2,
    flexDirection: "row",
  },
  label: {
    fontWeight: "bold",
    minWidth: 70,
  },
  value: {
    flex: 1,
  },
  table: {
    marginTop: 12,
    marginBottom: 12,
    border: "1px solid black",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderBottom: "1px solid black",
  },
  tableHeaderCell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    borderRight: "1px solid black",
  },
  tableHeaderCellLast: {
    flex: 1,
    padding: 5,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "0.5px solid black",
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
    textAlign: "center",
    borderRight: "1px solid black",
  },
  tableCellLast: {
    flex: 1,
    padding: 5,
    fontSize: 10,
    textAlign: "center",
  },
  totalRow: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderTop: "2px solid black",
  },
  totalCell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    borderRight: "1px solid black",
  },
  totalCellLast: {
    flex: 1,
    padding: 5,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  finalTotal: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default function PaymentPdf({ payment }: { payment: Payment }) {
  const { etudiant, nbrMois, date, anneeUniv, equipements } = payment;
  const months = getPreviousMonths(nbrMois);

  // Calculer le montant mensuel et total
  const montantMensuel = etudiant?.montant?.valeur || 0;
  const totalMensuel = nbrMois * montantMensuel;
  const totalGeneral = totalMensuel + equipements;

  // Formatter la date actuelle
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Formatter la date de naissance
  const dateNaissance = etudiant?.datenais
    ? new Date(etudiant.datenais).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // Formater le sexe
  const sexeComplet = etudiant?.sexe === "H" ? "Masculin" : "Féminin";

  // Créer les lignes du tableau
  const tableRows = [];

  // Ajouter les mois de scolarité
  months.forEach((month) => {
    tableRows.push({
      mois: month,
      montant: montantMensuel,
    });
  });

  // Ajouter les équipements si > 0
  if (equipements > 0) {
    tableRows.push({
      mois: "Équipement",
      montant: equipements,
    });
  }

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("fr-FR").replace(/\s/g, ".");
  };

  return (
    <Document>
      <Page size="A5" style={styles.page}>
        {/* Titre */}
        <Text style={styles.title}>Reçu de paiement</Text>

        {/* Date */}
        <View style={styles.dateContainer}>
          <Text style={styles.date}>Aujourd'hui le {currentDate}</Text>
        </View>

        {/* Informations étudiant */}
        <View style={styles.studentInfo}>
          <View style={styles.infoLine}>
            <Text style={styles.label}>Matricule : </Text>
            <Text style={styles.value}>{etudiant?.matricule}</Text>
          </View>

          <View style={styles.infoLine}>
            <Text style={styles.label}>Nom : </Text>
            <Text style={styles.value}>{etudiant?.nom}</Text>
          </View>

          <View style={styles.infoLine}>
            <Text style={styles.label}>Né le : </Text>
            <Text style={styles.value}>{dateNaissance}</Text>
          </View>

          <View style={styles.infoLine}>
            <Text style={styles.label}>Sexe : </Text>
            <Text style={styles.value}>{sexeComplet}</Text>
          </View>

          <View style={styles.infoLine}>
            <Text style={styles.label}>Institution : </Text>
            <Text style={styles.value}>
              {etudiant?.etab} / Niveau : {etudiant?.montant?.niveau}
            </Text>
          </View>
        </View>

        {/* Tableau des paiements */}
        <View style={styles.table}>
          {/* En-tête du tableau */}
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Mois</Text>
            <Text style={styles.tableHeaderCellLast}>Montant</Text>
          </View>

          {/* Lignes du tableau */}
          {tableRows.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{row.mois}</Text>
              <Text style={styles.tableCellLast}>
                {formatCurrency(row.montant)}
              </Text>
            </View>
          ))}

          {/* Ligne de total */}
          <View style={styles.totalRow}>
            <Text style={styles.totalCell}>Total</Text>
            <Text style={styles.totalCellLast}>
              {formatCurrency(totalGeneral)}
            </Text>
          </View>
        </View>

        {/* Total final */}
        <Text style={styles.finalTotal}>
          Total Payé : {formatCurrency(totalGeneral)} Ariary
        </Text>

        {/* Informations additionnelles */}
        <View
          style={{ marginTop: 15, fontSize: 9, color: "#666", lineHeight: 1.2 }}
        >
          <Text>Année Universitaire : {anneeUniv}</Text>
          <Text>
            Date de Paiement : {new Date(date).toLocaleDateString("fr-FR")}
          </Text>
          <Text>Nombre de mois : {nbrMois}</Text>
        </View>
      </Page>
    </Document>
  );
}
