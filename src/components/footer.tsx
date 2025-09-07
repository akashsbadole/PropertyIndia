'use client'

import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { 
  Home, 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Heart,
  IndianRupee
} from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    property: [
      { name: 'All Properties', href: '/properties' },
      { name: 'Houses & Villas', href: '/properties?type=house' },
      { name: 'Apartments & Flats', href: '/properties?type=apartment' },
      { name: 'Commercial Property', href: '/properties?type=commercial' },
      { name: 'Land & Plots', href: '/properties?type=land' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
    contact: [
      { icon: Phone, text: '🇮🇳 1800-123-4567', href: 'tel:18001234567' },
      { icon: Mail, text: 'info@propertyindia.com', href: 'mailto:info@propertyindia.com' },
      { icon: MapPin, text: 'Mumbai, Maharashtra 400001, India', href: '#' },
    ]
  }

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ]

  const indianCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">PropertyIndia</span>
                <p className="text-xs text-gray-400">Find Your Dream Home in India</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              India's most trusted property platform. Discover the perfect home from millions of listings across all major Indian cities. Buy, sell, and rent with confidence.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
            {/* Popular Cities */}
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2 text-orange-400">Popular Cities</h4>
              <div className="flex flex-wrap gap-2">
                {indianCities.map(city => (
                  <Link 
                    key={city}
                    href={`/properties?city=${city.toLowerCase()}`}
                    className="text-xs bg-gray-800 hover:bg-orange-600 px-2 py-1 rounded transition-colors"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Property Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Home className="h-5 w-5 mr-2 text-orange-400" />
              Properties
            </h3>
            <ul className="space-y-2">
              {footerLinks.property.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Quick Actions */}
            <div className="mt-6 p-3 bg-gray-800 rounded-lg">
              <h4 className="text-sm font-medium mb-2 text-orange-400">Quick Actions</h4>
              <div className="space-y-2">
                <Link href="/post-property" className="flex items-center text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  <IndianRupee className="h-3 w-3 mr-2" />
                  Post Property FREE
                </Link>
                <Link href="/property-valuation" className="flex items-center text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  <Home className="h-3 w-3 mr-2" />
                  Property Valuation
                </Link>
                <Link href="/emi-calculator" className="flex items-center text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  <IndianRupee className="h-3 w-3 mr-2" />
                  EMI Calculator
                </Link>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Services */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2 text-orange-400">Our Services</h4>
              <div className="space-y-2">
                <Link href="/home-loans" className="block text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  Home Loans
                </Link>
                <Link href="/legal-services" className="block text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  Legal Services
                </Link>
                <Link href="/interior-design" className="block text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  Interior Design
                </Link>
                <Link href="/property-management" className="block text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  Property Management
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              {footerLinks.contact.map((contact, index) => (
                <Link
                  key={index}
                  href={contact.href}
                  className="flex items-start space-x-3 text-gray-300 hover:text-orange-400 transition-colors group"
                >
                  <contact.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{contact.text}</span>
                </Link>
              ))}
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Stay Updated</h4>
              <p className="text-xs text-gray-400 mb-3">
                Get the latest property listings and market insights
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Download App */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Download Our App</h4>
              <div className="flex space-x-2">
                <button className="flex-1 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded text-xs transition-colors">
                  📱 Play Store
                </button>
                <button className="flex-1 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded text-xs transition-colors">
                  🍎 App Store
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>© {currentYear} PropertyIndia. All rights reserved.</span>
            <span>|</span>
            <Link href="/terms" className="hover:text-orange-400 transition-colors">
              Terms of Service
            </Link>
            <span>|</span>
            <Link href="/privacy" className="hover:text-orange-400 transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/rera" className="hover:text-orange-400 transition-colors">
              RERA Compliance
            </Link>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for India 🇮🇳</span>
          </div>
        </div>
      </div>

      {/* Quick Links Bar */}
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center space-x-6 text-sm">
            <Link href="/properties" className="text-gray-400 hover:text-orange-400 transition-colors">
              Buy in India
            </Link>
            <Link href="/rent" className="text-gray-400 hover:text-orange-400 transition-colors">
              Rent in India
            </Link>
            <Link href="/commercial" className="text-gray-400 hover:text-orange-400 transition-colors">
              Commercial Property
            </Link>
            <Link href="/agents" className="text-gray-400 hover:text-orange-400 transition-colors">
              Real Estate Agents
            </Link>
            <Link href="/projects" className="text-gray-400 hover:text-orange-400 transition-colors">
              New Projects
            </Link>
            <Link href="/home-loans" className="text-gray-400 hover:text-orange-400 transition-colors">
              Home Loans
            </Link>
            <Link href="/emi-calculator" className="text-gray-400 hover:text-orange-400 transition-colors">
              EMI Calculator
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}