import { PageHeader } from "~/components/page-header";

export default function HomePage() {
  return (
    <>
      <PageHeader
        title="Tableau de bord"
        subtitle="Vue d'ensemble des statistiques"
      />
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-[#E5F0C3] bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-[#328E6E]">
            Statistique 1
          </h2>
          <p className="text-2xl font-bold text-[#27332C]">123</p>
          <span className="text-xs text-[#67AA6E]">+5% ce mois</span>
        </div>
        <div className="rounded-lg border border-[#E5F0C3] bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-[#328E6E]">
            Statistique 2
          </h2>
          <p className="text-2xl font-bold text-[#27332C]">456</p>
          <span className="text-xs text-[#67AA6E]">Stable</span>
        </div>
        <div className="rounded-lg border border-[#E5F0C3] bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-[#328E6E]">
            Statistique 3
          </h2>
          <p className="text-2xl font-bold text-[#27332C]">789</p>
          <span className="text-xs text-[#9BCB7C]">-2% ce mois</span>
        </div>
      </div>
    </>
  );
}
