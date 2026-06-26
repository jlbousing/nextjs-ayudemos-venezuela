import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-24">
      <main className="flex w-full max-w-2xl flex-col gap-6">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">
          Ayudemos Venezuela
        </h1>
        <p className="text-lg leading-8 text-zinc-600">
          Estructura base con SSR, Server Actions y Route Handlers.
        </p>
        <Link
          href="/iniciativas"
          className="inline-flex w-fit rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white"
        >
          Ver iniciativas
        </Link>
      </main>
    </div>
  );
}
