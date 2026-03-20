import Navbar from "@/components/Navbar";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <DashboardClient />
    </main>
  );
}

