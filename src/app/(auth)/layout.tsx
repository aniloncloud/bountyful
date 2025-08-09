import { siteConfig } from "@/config/site";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="relative hidden md:block">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-900" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-sm px-10 text-center text-neutral-200">
            <h2 className="text-2xl font-semibold">{siteConfig.name}</h2>
            <p className="mt-2 text-sm text-neutral-300">Operate smarter. Rescue more. Delight guests.</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
