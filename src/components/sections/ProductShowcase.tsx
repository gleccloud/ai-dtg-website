'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Cpu, 
  Smartphone, 
  Database, 
  Cloud, 
  Zap, 
  Shield,
  ArrowRight,
  Play,
  Eye
} from 'lucide-react';

const productCategories = [
  {
    id: 'hardware',
    title: 'Hardware Solutions',
    description: 'Advanced IoT devices and sensors',
    icon: Cpu,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'software',
    title: 'Software Platform',
    description: 'Intelligent data processing and analytics',
    icon: Database,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'ai-services',
    title: 'AI Services',
    description: 'Machine learning and predictive analytics',
    icon: Cloud,
    color: 'from-green-500 to-emerald-500'
  }
];

const products = {
  hardware: [
    {
      title: 'DTG Sensor Array',
      description: 'High-precision sensors for real-time monitoring',
      features: ['IoT Enabled', 'Low Power', 'High Accuracy'],
      image: '/api/placeholder/400/300',
      price: '$299',
      badge: 'Popular'
    },
    {
      title: 'Smart Gateway',
      description: 'Edge computing device for local data processing',
      features: ['Edge AI', '5G Ready', 'Scalable'],
      image: '/api/placeholder/400/300',
      price: '$599',
      badge: 'New'
    },
    {
      title: 'Mobile DTG Unit',
      description: 'Portable monitoring solution for field operations',
      features: ['Portable', 'Battery Powered', 'Rugged'],
      image: '/api/placeholder/400/300',
      price: '$199',
      badge: 'Best Value'
    }
  ],
  software: [
    {
      title: 'DTG Analytics Platform',
      description: 'Comprehensive data analysis and visualization',
      features: ['Real-time Dashboards', 'Custom Reports', 'API Access'],
      image: '/api/placeholder/400/300',
      price: '$99/month',
      badge: 'Enterprise'
    },
    {
      title: 'Predictive Maintenance',
      description: 'AI-powered maintenance scheduling and alerts',
      features: ['ML Algorithms', 'Alert System', 'Integration'],
      image: '/api/placeholder/400/300',
      price: '$149/month',
      badge: 'AI-Powered'
    },
    {
      title: 'Data Connector',
      description: 'Seamless integration with existing systems',
      features: ['REST API', 'Webhooks', 'SDK'],
      image: '/api/placeholder/400/300',
      price: '$49/month',
      badge: 'Integration'
    }
  ],
  'ai-services': [
    {
      title: 'Custom AI Models',
      description: 'Tailored machine learning solutions for your data',
      features: ['Custom Training', 'Model Optimization', 'Deployment'],
      image: '/api/placeholder/400/300',
      price: 'Custom',
      badge: 'Premium'
    },
    {
      title: 'Predictive Analytics',
      description: 'Forecast trends and optimize operations',
      features: ['Time Series', 'Anomaly Detection', 'Forecasting'],
      image: '/api/placeholder/400/300',
      price: '$199/month',
      badge: 'Advanced'
    },
    {
      title: 'AI Consulting',
      description: 'Expert guidance for AI implementation',
      features: ['Strategy', 'Implementation', 'Training'],
      image: '/api/placeholder/400/300',
      price: '$500/hour',
      badge: 'Expert'
    }
  ]
};

export function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState('hardware');

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
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
            Products
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Complete DTG Solution
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From hardware sensors to AI-powered analytics, we provide everything you need 
            to build a comprehensive digital twin solution.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700/50 mb-12">
            {productCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
              >
                <category.icon className="w-5 h-5 mr-2" />
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Product Grids */}
          {productCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products[category.id as keyof typeof products].map((product, index) => (
                  <motion.div
                    key={product.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 h-full">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                            <category.icon className="w-8 h-8 text-white" />
                          </div>
                          <Badge variant="outline" className="border-purple-500/50 text-purple-300">
                            {product.badge}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors">
                          {product.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400 text-base leading-relaxed">
                          {product.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        {/* Features */}
                        <div className="space-y-2 mb-6">
                          {product.features.map((feature) => (
                            <div key={feature} className="flex items-center space-x-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                              <span className="text-gray-300">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-2xl font-bold text-white">{product.price}</div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </Button>
                            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                              <Play className="w-4 h-4 mr-2" />
                              Demo
                            </Button>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white group">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white text-lg px-8 py-6 h-auto rounded-full group"
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
} 