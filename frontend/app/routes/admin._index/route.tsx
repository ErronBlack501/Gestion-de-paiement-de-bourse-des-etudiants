import { PageHeader } from "~/components/page-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";

export default function HomePage() {
  return (
    <>
      <PageHeader
        title="Tableau de bord"
        subtitle="Vue d'ensemble des statistiques"
      />
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Statistique 1
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              123
            </CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-xs">+5% ce mois</span>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Statistique 2
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              456
            </CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-xs">Stable</span>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Statistique 3
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              789
            </CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-xs">-2% ce mois</span>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
