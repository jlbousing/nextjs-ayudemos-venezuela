import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <main className="flex w-full max-w-2xl flex-col gap-6">
        <h1 className="text-4xl font-semibold tracking-tight">
          Ayudemos Venezuela
        </h1>
        <p className="text-lg leading-8">
          Estructura base con SSR, Server Actions y Route Handlers.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/iniciativas"
            className="inline-flex w-fit border border-black px-5 py-2.5 text-sm font-medium"
          >
            Ver iniciativas
          </Link>
          <Link
            href="/iniciar-sesion"
            className="inline-flex w-fit border border-black px-5 py-2.5 text-sm font-medium"
          >
            Iniciar sesión
          </Link>
        </div>
      </main>
    </div>
  );
}
