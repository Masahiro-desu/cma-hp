import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { UseCaseGallery } from "@/components/sections/UseCaseGallery";
import { UserExamples } from "@/components/sections/UserExamples";
import { Benchmark } from "@/components/sections/Benchmark";
import { Footer } from "@/components/sections/Footer";

// ISRの設定
export const revalidate = 3600; // 1時間ごとに再生成

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <BeforeAfter />
        <UseCaseGallery />
        <UserExamples />
        <Benchmark />
      </main>
      <Footer />
    </div>
  );
}
