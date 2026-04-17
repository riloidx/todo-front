import Link from "../components/link";
import { getKeycloakAuthUrl } from "../services/auth.service";

export default function Home() {
  return (
    <main className="flex w-full h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center justify-center p-8 border-2 border-solid border-indigo-500 rounded-xl bg-white shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
        <div className="flex gap-4">
          <Link href={getKeycloakAuthUrl()}>Continue</Link>
        </div>
      </div>
    </main>
  );
}
