'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Menu, 
  X, 
  Search, 
  Home, 
  Building, 
  Phone, 
  User, 
  Heart,
  LogIn,
  MapPin,
  IndianRupee
} from 'lucide-react'
import { PropertyType } from '@/types/property'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const indianCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
    'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
    'Chandigarh', 'Indore', 'Nagpur', 'Patna', 'Ludhiana'
  ]

  const propertyTypes = [
    { value: PropertyType.HOUSE, label: 'House/Villa' },
    { value: PropertyType.APARTMENT, label: 'Apartment/Flat' },
    { value: PropertyType.CONDO, label: 'Condominium' },
    { value: PropertyType.TOWNHOUSE, label: 'Townhouse' },
    { value: PropertyType.VILLA, label: 'Luxury Villa' },
    { value: PropertyType.LAND, label: 'Land/Plot' },
    { value: PropertyType.COMMERCIAL, label: 'Commercial' },
    { value: PropertyType.OFFICE, label: 'Office Space' },
    { value: PropertyType.RETAIL, label: 'Retail Shop' },
    { value: PropertyType.WAREHOUSE, label: 'Warehouse' }
  ]

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-orange-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>🇮🇳 India's Most Trusted Property Platform</span>
              <span>|</span>
              <span>24x7 Customer Support: 1800-123-4567</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/post-property" className="hover:text-orange-200 transition-colors">
                Post Property FREE
              </Link>
              <span>|</span>
              <Link href="/agents" className="hover:text-orange-200 transition-colors">
                Find Agents
              </Link>
              <span>|</span>
              <Link href="/contact" className="hover:text-orange-200 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PropertyIndia</h1>
              <p className="text-xs text-gray-600">Find Your Dream Home in India</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/properties" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Buy
            </Link>
            <Link href="/rent" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Rent
            </Link>
            <Link href="/commercial" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Commercial
            </Link>
            <Link href="/projects" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              New Projects
            </Link>
            <Link href="/agents" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              Agents
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden md:flex"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>

            {/* Post Property Button */}
            <Button className="hidden md:flex bg-orange-600 hover:bg-orange-700">
              <IndianRupee className="h-4 w-4 mr-2" />
              Post Property
            </Button>

            {/* User Actions */}
            <div className="hidden lg:flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Search Bar (Expanded) */}
        {isSearchOpen && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <Input 
                  placeholder="Search by location, property name, or keyword..." 
                  className="w-full"
                />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {indianCities.map(city => (
                    <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {propertyTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-3">
              <Link href="/" className="block text-gray-700 hover:text-orange-600 font-medium py-2">
                Home
              </Link>
              <Link href="/properties" className="block text-gray-700 hover:text-orange-600 font-medium py-2">
                Buy Property
              </Link>
              <Link href="/rent" className="block text-gray-700 hover:text-orange-600 font-medium py-2">
                Rent Property
              </Link>
              <Link href="/commercial" className="block text-gray-700 hover:text-orange-600 font-medium py-2">
                Commercial Property
              </Link>
              <Link href="/projects" className="block text-gray-700 hover:text-orange-600 font-medium py-2">
                New Projects
              </Link>
              <Link href="/agents" className="block text-gray-700 hover:text-orange-600 font-medium py-2">
                Find Agents
              </Link>
              <Link href="/post-property" className="block text-orange-600 font-medium py-2">
                <IndianRupee className="h-4 w-4 inline mr-1" />
                Post Property FREE
              </Link>
              <div className="flex space-x-3 pt-3 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <User className="h-4 w-4 mr-2" />
                  Register
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}