'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Home, DollarSign, MapPin } from 'lucide-react'
import { PropertyFilters, PropertyType } from '@/types/property'

interface HeroSectionProps {
  onSearch: (filters: PropertyFilters) => void
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [propertyType, setPropertyType] = useState<PropertyType | 'all-types' | ''>('')
  const [location, setLocation] = useState('')

  const handleSearch = () => {
    const filters: PropertyFilters = {
      search: searchQuery || undefined,
      propertyType: propertyType && propertyType !== 'all-types' ? propertyType : undefined,
      city: location || undefined,
    }
    onSearch(filters)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Find Your Dream Property
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover the perfect property from our extensive collection of homes, apartments, and commercial spaces
        </p>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-2">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 border-0 focus-visible:ring-0"
              />
            </div>

            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 border-0 focus-visible:ring-0"
              />
            </div>

            <div className="flex-1 relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Select value={propertyType} onValueChange={(value) => setPropertyType(value as PropertyType)}>
                <SelectTrigger className="pl-10 border-0 focus-visible:ring-0">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Types</SelectItem>
                  <SelectItem value={PropertyType.HOUSE}>House</SelectItem>
                  <SelectItem value={PropertyType.APARTMENT}>Apartment</SelectItem>
                  <SelectItem value={PropertyType.CONDO}>Condo</SelectItem>
                  <SelectItem value={PropertyType.TOWNHOUSE}>Townhouse</SelectItem>
                  <SelectItem value={PropertyType.VILLA}>Villa</SelectItem>
                  <SelectItem value={PropertyType.LAND}>Land</SelectItem>
                  <SelectItem value={PropertyType.COMMERCIAL}>Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 h-auto"
            >
              <DollarSign className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
            <div className="text-gray-600">Properties Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Trusted Agents</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">Customer Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  )
}