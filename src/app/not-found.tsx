import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function NotFound() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center space-y-2 text-center">
      <h1 className="text-2xl font-semibold">Página no encontrada.</h1>
      <p className="text-muted-foreground">
        No se pudo encontrar la página que estás buscando.
      </p>
      <Link replace href="/dashboard">
        <Button variant="outline">Volver ala página principal</Button>
      </Link>
    </div>
  );
}
