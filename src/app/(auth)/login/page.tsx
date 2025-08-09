"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type Values = z.infer<typeof schema>;

export default function LoginPage() {
  const { register, handleSubmit, formState } = useForm<Values>({ resolver: zodResolver(schema) });
  const onSubmit = (values: Values) => {
    alert(JSON.stringify(values, null, 2));
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold">Log in</h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Welcome back. Access your venue dashboard.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@restaurant.com" {...register("email")} />
          {formState.errors.email && <p className="mt-1 text-xs text-red-600">{formState.errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
          {formState.errors.password && <p className="mt-1 text-xs text-red-600">{formState.errors.password.message}</p>}
        </div>
        <div className="flex items-center justify-between">
          <Link href="/reset" className="text-sm text-neutral-600 hover:underline dark:text-neutral-400">Forgot password?</Link>
        </div>
        <Button className="w-full" type="submit">Continue</Button>
      </form>
      <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
        No account? <Link href="/signup" className="underline">Create one</Link>
      </p>
    </div>
  );
}
