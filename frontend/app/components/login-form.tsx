import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Link } from "react-router";
import React from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">
            Email <span className="text-red-600">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary border shadow-sm focus:ring-2"
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">
              Password <span className="text-red-600">*</span>
            </Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary border shadow-sm focus:ring-2"
          />
        </div>
        <Button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
        >
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <img
            src="/google-logo.png"
            alt="Google logo"
            className="mr-2 inline-block h-5 w-5 align-middle"
          />
          Continue with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
