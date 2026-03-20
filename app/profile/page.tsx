import Navbar from "@/components/Navbar";
import ProfilePageClient from "@/components/profile/ProfilePageClient";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <ProfilePageClient />
    </main>
  );
}

