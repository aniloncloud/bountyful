"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export type BaseField = { name: string; label: string };
export type TextField = BaseField & { type: "text" | "email" | "number" | "file"; placeholder?: string; min?: number; step?: number };
export type SelectField = BaseField & { type: "select"; options: { label: string; value: string }[] };
export type ToggleField = BaseField & { type: "toggle" };
export type FieldConfig = TextField | SelectField | ToggleField;

export function FormBuilder<T extends Record<string, unknown>>({
  schema,
  fields,
  onSubmit,
  submitLabel = "Submit",
  defaultValues,
}: {
  schema: z.ZodSchema<T>;
  fields: FieldConfig[];
  onSubmit: (values: T) => void;
  submitLabel?: string;
  defaultValues?: Partial<T>;
}) {
  const { register, handleSubmit, setValue, watch, formState } = useForm<T>({
    // @ts-expect-error - zodResolver typing issue with generic schemas
    resolver: zodResolver(schema),
    // @ts-expect-error - defaultValues typing issue with generic T
    defaultValues,
  });

  return (
    <form 
      onSubmit={handleSubmit(onSubmit as unknown as Parameters<typeof handleSubmit>[0])} 
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      {fields.map((f) => {
        const key = `${f.type}_${f.name}`;
        if (f.type === "select") {
          return (
            <div key={key}>
              <Label>{f.label}</Label>
              <Select {...register(f.name as never)}>
                {f.options.map((o) => (
                  <option value={o.value} key={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </div>
          );
        }
        if (f.type === "toggle") {
          const value = watch(f.name as never) as unknown as boolean;
          return (
            <div key={key} className="flex items-center gap-3 md:col-span-2">
              <Switch
                checked={!!value}
                onChange={(v) => setValue(f.name as never, v as never)}
                label={f.label}
                className="h-6 w-10"
              />
            </div>
          );
        }
        return (
          <div key={key}>
            <Label>{f.label}</Label>
            <Input
              type={f.type}
              placeholder={(f as Extract<typeof f, { placeholder?: string }>).placeholder}
              min={(f as Extract<typeof f, { min?: number }>).min}
              step={(f as Extract<typeof f, { step?: number }>).step}
              {...register(f.name as never)}
            />
            {formState.errors[f.name as keyof typeof formState.errors] && (
              <p className="mt-1 text-xs text-red-600">
                {String((formState.errors as Record<string, { message?: string }>)[f.name]?.message ?? "")}
              </p>
            )}
          </div>
        );
      })}
      <div className="md:col-span-2">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
