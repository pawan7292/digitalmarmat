import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";

export default async function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
