import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white p-4">

      <div className="flex gap-6">

        <Link href="/">
          Dashboard
        </Link>

        <Link href="/kategorien">
          Kategorien
        </Link>

        <Link href="/haendler">
          Händler
        </Link>

        <Link href="/lebensmittel">
          Lebensmittel
        </Link>

        <Link href="/abos">
          Abos
        </Link>

        <Link href="/upload">
          Upload
        </Link>

      </div>

    </nav>
  );
}
