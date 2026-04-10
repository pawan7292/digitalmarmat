import ProtectedRoutes from "@/components/protected/ProtectedRoute";
import ProfileSidebar from "@/components/sidebar/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoutes>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <ProfileSidebar />
          <main className="flex-1 p-6">
            <SidebarTrigger />
            {children}
          </main>
        </div>
      </SidebarProvider>
    </ProtectedRoutes>
  );
}
