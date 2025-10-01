'use client';

import { motion } from 'framer-motion';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProductShowcase } from '@/components/sections/ProductShowcase';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <HeroSection />
        <ProductShowcase />
        <FeaturesSection />
        <TestimonialsSection />
        <ContactSection />
      </motion.main>
      
      <Footer />
    </div>
  );
} 