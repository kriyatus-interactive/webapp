import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <Navbar />
        <Footer />
      </div>
    </main>
  );
}
