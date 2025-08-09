"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({ email: z.string().email() });

type Values = z.infer<typeof schema>;

export default function ResetPage() {
  const { register, handleSubmit, formState } = useForm<Values>({ resolver: zodResolver(schema) });
  const onSubmit = (values: Values) => alert(JSON.stringify(values, null, 2));
  return (
    <div>
      <h1 className="text-2xl font-semibold">Reset password</h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">We’ll send a reset link to your email.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@restaurant.com" {...register("email")} />
          {formState.errors.email && <p className="mt-1 text-xs text-red-600">{formState.errors.email.message}</p>}
        </div>
        <Button className="w-full" type="submit">Send reset link</Button>
      </form>
    </div>
  );
}
