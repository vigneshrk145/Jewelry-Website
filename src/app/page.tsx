import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ShopByCategory from '@/components/ShopByCategory'
import ShopByShape from '@/components/ShopByShape'
import CustomSection from '@/components/CustomSection'
import ProductGrid from '@/components/ProductGrid'
import LabGrownSection from '@/components/LabGrownSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import BlogSection from '@/components/BlogSection'
import TrustBadges from '@/components/TrustBadges'
import NewsletterSection from '@/components/NewsletterSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ShopByCategory />
        <ShopByShape />
        <CustomSection />
        <ProductGrid />
        <LabGrownSection />
        <TestimonialsSection />
        <BlogSection />
        <TrustBadges />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
