import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import LibraryClient from "./LibraryClient";

export default async function LibraryPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <>
      <Navbar user={session.user} />
      <main className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
        <LibraryClient />
      </main>
    </>
  );
}
