import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <section>
      <div className="container">
        <div className="grid items-center gap-8 bg-muted-2 lg:grid-cols-2">
          <div className="flex flex-col items-center p-16 text-center lg:items-start lg:text-left">
            <p>New Release</p>
            <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
              Welcome to Our Website
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
              doloremque mollitia fugiat omnis! Porro facilis quo animi
              consequatur. Explicabo.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Link to="/login">
                <Button>
                  Log in
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Button variant="outline">About us</Button>
            </div>
          </div>
          <img
            src="https://shadcnblocks.com/images/block/placeholder-1.svg"
            alt="placeholder hero"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
