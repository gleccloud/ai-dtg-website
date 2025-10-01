'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'TechFlow Industries',
    image: '/api/placeholder/100/100',
    content: 'GLEC AI DTG has revolutionized our monitoring capabilities. The real-time insights and predictive analytics have helped us reduce downtime by 40%.',
    rating: 5,
    initials: 'SC'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Operations Director',
    company: 'Global Logistics Corp',
    image: '/api/placeholder/100/100',
    content: 'The AI-powered predictive maintenance has been a game-changer. We\'ve seen significant cost savings and improved operational efficiency.',
    rating: 5,
    initials: 'MR'
  },
  {
    name: 'Emily Watson',
    role: 'Head of Engineering',
    company: 'Smart Manufacturing Ltd',
    image: '/api/placeholder/100/100',
    content: 'Implementation was seamless and the support team is exceptional. The platform has exceeded our expectations in every way.',
    rating: 5,
    initials: 'EW'
  },
  {
    name: 'David Kim',
    role: 'VP of Technology',
    company: 'Innovation Dynamics',
    image: '/api/placeholder/100/100',
    content: 'The digital twin technology is cutting-edge. We\'ve gained unprecedented visibility into our operations and can now make data-driven decisions.',
    rating: 5,
    initials: 'DK'
  },
  {
    name: 'Lisa Thompson',
    role: 'Chief Data Officer',
    company: 'DataFirst Solutions',
    image: '/api/placeholder/100/100',
    content: 'The AI algorithms are incredibly accurate. We\'ve improved our predictive capabilities and can now anticipate issues before they occur.',
    rating: 5,
    initials: 'LT'
  },
  {
    name: 'James Wilson',
    role: 'Plant Manager',
    company: 'Industrial Excellence Inc',
    image: '/api/placeholder/100/100',
    content: 'The real-time monitoring and automated alerts have transformed how we manage our facilities. It\'s like having an expert watching everything 24/7.',
    rating: 5,
    initials: 'JW'
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-purple-900/10 to-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6">
            <Quote className="w-4 h-4 mr-2" />
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See what our customers say about how GLEC AI DTG has transformed their operations 
            and delivered measurable business value.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="flex justify-end mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                      <Quote className="w-5 h-5 text-purple-400" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-gray-300 text-base leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.role}</div>
                      <div className="text-purple-300 text-sm font-medium">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-slate-800/50 to-purple-800/30 rounded-2xl p-8 border border-slate-700/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Operations?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join hundreds of companies already using GLEC AI DTG to optimize their operations, 
              reduce costs, and gain competitive advantages through intelligent automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105">
                Start Free Trial
              </button>
              <button className="border border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-full font-medium transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 