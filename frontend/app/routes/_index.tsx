import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";

export default function WelcomePage() {
  return (
    <section>
      <div className="container">
        <div className="bg-muted-2 grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center p-16 text-center lg:items-start lg:text-left">
            <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
              Bienvenue sur notre site
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              Gérez facilement les paiements de bourse des étudiants avec notre
              plateforme intuitive et sécurisée.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button asChild>
                <Link to="/login">
                  Se connecter <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/about">À propos</Link>
              </Button>
            </div>
          </div>
          <img
            src="/logo-color.svg"
            alt="Logo Boursitra"
            className="h-full w-full object-contain p-8"
          />
        </div>
      </div>
    </section>
  );
}
