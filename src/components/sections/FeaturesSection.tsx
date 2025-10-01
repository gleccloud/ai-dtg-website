'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Shield, 
  Cpu, 
  Battery, 
  Wifi, 
  Smartphone,
  TrendingUp,
  Users,
  Globe,
  Lock
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Performance",
    description: "Experience blazing-fast speeds with our cutting-edge technology that delivers results in milliseconds.",
    category: "Performance",
    color: "bg-gradient-to-r from-yellow-400 to-orange-500"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security protocols ensure your data is protected with military-grade encryption.",
    category: "Security",
    color: "bg-gradient-to-r from-blue-500 to-purple-600"
  },
  {
    icon: Cpu,
    title: "AI-Powered Intelligence",
    description: "Advanced machine learning algorithms that adapt and improve with every interaction.",
    category: "AI",
    color: "bg-gradient-to-r from-green-400 to-teal-500"
  },
  {
    icon: Battery,
    title: "24/7 Reliability",
    description: "99.99% uptime guarantee with redundant systems and automatic failover protection.",
    category: "Reliability",
    color: "bg-gradient-to-r from-red-400 to-pink-500"
  },
  {
    icon: Wifi,
    title: "Global Connectivity",
    description: "Seamless connectivity across 150+ countries with local data centers for optimal performance.",
    category: "Connectivity",
    color: "bg-gradient-to-r from-indigo-400 to-blue-500"
  },
  {
    icon: Smartphone,
    title: "Mobile First Design",
    description: "Optimized for all devices with responsive design that works perfectly on any screen size.",
    category: "Design",
    color: "bg-gradient-to-r from-purple-400 to-pink-500"
  }
];

const stats = [
  { label: "Active Users", value: "2M+", icon: Users, color: "text-blue-500" },
  { label: "Countries", value: "150+", icon: Globe, color: "text-green-500" },
  { label: "Uptime", value: "99.99%", icon: TrendingUp, color: "text-purple-500" },
  { label: "Security", value: "256-bit", icon: Lock, color: "text-red-500" }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
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
            Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the cutting-edge features that make our platform the industry leader in innovation and performance.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 h-full">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-2xl ${feature.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {feature.category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div 
          className="bg-gradient-to-r from-slate-800/50 to-purple-800/30 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-slate-700/30"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Trusted by Millions Worldwide
            </h3>
            <p className="text-gray-300 text-lg">
              Our platform powers businesses across the globe with unmatched reliability and performance.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 