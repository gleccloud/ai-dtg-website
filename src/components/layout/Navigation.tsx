'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, ChevronDown } from 'lucide-react';

const navigationItems = [
  {
    title: 'Products',
    href: '#products',
    children: [
      { title: 'Hardware Solutions', href: '#hardware' },
      { title: 'Software Platform', href: '#software' },
      { title: 'AI Services', href: '#ai-services' },
    ]
  },
  {
    title: 'Solutions',
    href: '#solutions',
    children: [
      { title: 'Enterprise', href: '#enterprise' },
      { title: 'SMB', href: '#smb' },
      { title: 'Startups', href: '#startups' },
    ]
  },
  {
    title: 'Resources',
    href: '#resources',
    children: [
      { title: 'Documentation', href: '#docs' },
      { title: 'API Reference', href: '#api' },
      { title: 'Tutorials', href: '#tutorials' },
    ]
  },
  { title: 'Pricing', href: '#pricing' },
  { title: 'About', href: '#about' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <span className="text-white font-bold text-xl lg:text-2xl">GLEC AI DTG</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList className="space-x-1">
                {navigationItems.map((item, index) => (
                  <NavigationMenuItem key={item.title}>
                    {item.children ? (
                      <NavigationMenuTrigger className="bg-transparent text-white hover:bg-slate-800/50 hover:text-purple-300 transition-colors">
                        {item.title}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </NavigationMenuTrigger>
                    ) : (
                      <NavigationMenuLink
                        href={item.href}
                        className="block px-4 py-2 text-white hover:text-purple-300 transition-colors"
                      >
                        {item.title}
                      </NavigationMenuLink>
                    )}
                    
                    {item.children && (
                      <NavigationMenuContent>
                        <div className="grid w-[400px] gap-3 p-4 bg-slate-800/95 backdrop-blur-md border border-slate-700/50 rounded-lg">
                          {item.children.map((child) => (
                            <NavigationMenuLink
                              key={child.title}
                              href={child.href}
                              className="block p-3 rounded-md hover:bg-slate-700/50 transition-colors"
                            >
                              <div className="text-white font-medium">{child.title}</div>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:text-purple-300 hover:bg-slate-800/50">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-slate-900/95 border-l border-slate-700/50">
              <div className="flex flex-col space-y-6 mt-8">
                {navigationItems.map((item) => (
                  <div key={item.title}>
                    <a
                      href={item.href}
                      className="block text-white hover:text-purple-300 text-lg font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </a>
                    {item.children && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.children.map((child) => (
                          <a
                            key={child.title}
                            href={child.href}
                            className="block text-slate-300 hover:text-purple-300 text-sm transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t border-slate-700/50">
                  <Button variant="ghost" className="w-full text-white hover:text-purple-300 hover:bg-slate-800/50 mb-2">
                    Sign In
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white">
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
} 