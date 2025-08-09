export type PartyRequest = {
  partySize: number;
  perHead: boolean;
  budgetMin?: number;
  budgetMax?: number;
  windowStart: string; // ISO
  windowEnd: string; // ISO
  radius: number;
  dietary: string[];
  mains: number;
  sides: number;
  desserts?: number;
  drinks?: number;
  notes?: string;
};

export type PartyOffer = {
  price: number; // total or per head depending on request
  perHead: boolean;
  windowStart: string;
  windowEnd: string;
  menuPreview: Array<{ cat: "mains" | "sides" | "desserts" | "drinks"; qty: number }>;
  dietary: string[];
};

export function validatePartyRequest(req: PartyRequest): string[] {
  const errs: string[] = [];
  if (!Number.isFinite(req.partySize) || req.partySize < 2) errs.push("Party size must be at least 2");
  const start = Date.parse(req.windowStart);
  const end = Date.parse(req.windowEnd);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) errs.push("Pickup window must be valid and end after start");
  if (!Number.isFinite(req.radius) || req.radius < 1 || req.radius > 5) errs.push("Radius must be 1–5 miles");
  const totalSpec = (req.mains || 0) + (req.sides || 0) + (req.desserts || 0) + (req.drinks || 0);
  if (totalSpec <= 0) errs.push("Specify at least one item in the menu");
  if (req.perHead) {
    if (!Number.isFinite(req.budgetMax) || (req.budgetMax as number) <= 0) errs.push("Provide per-head budget");
  } else {
    if (!Number.isFinite(req.budgetMin) || !Number.isFinite(req.budgetMax) || (req.budgetMin as number) <= 0 || (req.budgetMax as number) <= 0 || (req.budgetMax as number) < (req.budgetMin as number)) {
      errs.push("Provide valid total budget range");
    }
  }
  return errs;
}

export function validateOfferMatches(req: PartyRequest, offer: PartyOffer): string[] {
  const errs: string[] = [];
  const oStart = Date.parse(offer.windowStart);
  const oEnd = Date.parse(offer.windowEnd);
  const rStart = Date.parse(req.windowStart);
  const rEnd = Date.parse(req.windowEnd);
  if (!(oStart >= rStart && oEnd <= rEnd)) errs.push("Offer window must sit within requested window");
  const wanted = {
    mains: req.mains || 0,
    sides: req.sides || 0,
    desserts: req.desserts || 0,
    drinks: req.drinks || 0,
  } as Record<"mains" | "sides" | "desserts" | "drinks", number>;
  const got = { mains: 0, sides: 0, desserts: 0, drinks: 0 };
  for (const m of offer.menuPreview) got[m.cat] += m.qty;
  (Object.keys(wanted) as Array<keyof typeof wanted>).forEach((k) => {
    if (wanted[k] > 0 && got[k] < wanted[k]) errs.push(`Insufficient ${k}: need ${wanted[k]}, got ${got[k]}`);
  });
  // Dietary: offer must be subset/superset depending on policy; here require all requested flags present
  for (const d of req.dietary) if (!offer.dietary.includes(d)) errs.push(`Dietary '${d}' not satisfied`);
  return errs;
}


