import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { UseCaseGallery } from "@/components/sections/UseCaseGallery";
import { UserExamples } from "@/components/sections/UserExamples";
import { SpaceGallery } from "@/components/sections/SpaceGallery";
import { Benchmark } from "@/components/sections/Benchmark";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <UseCaseGallery />
        <UserExamples />
        <SpaceGallery />
        <Benchmark />
      </main>
      <Footer />
    </div>
  );
}
