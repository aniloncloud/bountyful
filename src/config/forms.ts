import { z } from "zod";
import type { FieldConfig } from "@/components/forms/FormBuilder";

export const venueInfoSchema = z.object({
  venueName: z.string().min(2),
  address: z.string().min(4),
  hours: z.string().min(2),
  phone: z.string().min(7),
  pickupInstructions: z.string().optional(),
});

export const venueInfoFields: FieldConfig[] = [
  { type: "text", name: "venueName", label: "Venue Name", placeholder: "Good2Go Kitchen" },
  { type: "text", name: "address", label: "Address", placeholder: "123 Food St, City" },
  { type: "text", name: "hours", label: "Hours", placeholder: "Mon-Fri 9am-9pm" },
  { type: "text", name: "phone", label: "Phone", placeholder: "(555) 123-4567" },
  { type: "text", name: "pickupInstructions", label: "Pickup Instructions", placeholder: "Ring side doorbell" },
];

export const listingSchema = z.object({
  name: z.string().min(2),
  category: z.string(),
  quantity: z.coerce.number().min(1),
  price: z.coerce.number().min(0),
  donated: z.boolean().optional(),
});

export const listingFields: FieldConfig[] = [
  { type: "text", name: "name", label: "Name", placeholder: "Magic Bag" },
  {
    type: "select",
    name: "category",
    label: "Category",
    options: [
      { label: "Magic Bag", value: "magic-bag" },
      { label: "Menu Item", value: "menu-item" },
      { label: "Bundle", value: "bundle" },
    ],
  },
  { type: "number", name: "quantity", label: "Quantity", min: 1 },
  { type: "number", name: "price", label: "Price", step: 0.01, min: 0 },
  { type: "toggle", name: "donated", label: "Donated / Free Item" },
];
