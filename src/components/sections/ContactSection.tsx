'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Calendar,
  Users
} from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Get in touch via email',
    value: 'contact@glec-ai-dtg.com',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20'
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak with our experts',
    value: '+1 (555) 123-4567',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Our headquarters',
    value: 'San Francisco, CA',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    description: 'When we\'re available',
    value: 'Mon-Fri 9AM-6PM PST',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20'
  }
];

const supportOptions = [
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Get instant help from our support team',
    availability: '24/7',
    response: '< 2 minutes'
  },
  {
    icon: Calendar,
    title: 'Schedule Call',
    description: 'Book a personalized consultation',
    availability: 'Business Hours',
    response: 'Same day'
  },
  {
    icon: Users,
    title: 'Community Forum',
    description: 'Connect with other users and experts',
    availability: 'Always',
    response: 'Community driven'
  }
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your operations with AI-powered digital twin technology? 
            Get in touch with our team to discuss your needs and explore solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Send us a Message</CardTitle>
                <CardDescription className="text-gray-400">
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                      placeholder="Your Company"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500 resize-none"
                      placeholder="Tell us about your project and how we can help..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white py-3"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-lg ${method.bgColor} flex items-center justify-center`}>
                    <method.icon className={`w-6 h-6 ${method.color}`} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{method.title}</h4>
                    <p className="text-gray-400 text-sm">{method.description}</p>
                    <p className="text-purple-300 font-medium">{method.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Support Options */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Support Options</h3>
              {supportOptions.map((option, index) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                      <option.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2">{option.title}</h4>
                      <p className="text-gray-400 text-sm mb-3">{option.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Availability: <span className="text-green-400">{option.availability}</span></span>
                        <span className="text-gray-500">Response: <span className="text-blue-400">{option.response}</span></span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 