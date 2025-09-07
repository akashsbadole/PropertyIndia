'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Filter, X } from 'lucide-react'
import { PropertyFilters, PropertyType, PropertyStatus } from '@/types/property'

interface SearchFiltersProps {
  filters: PropertyFilters
  onFiltersChange: (filters: PropertyFilters) => void
}

export function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const updateFilter = (key: keyof PropertyFilters, value: any) => {
    // Handle special placeholder values
    const undefinedValues = ['', 'all-types', 'any', 'all-status', 'default', 'all']
    onFiltersChange({
      ...filters,
      [key]: undefinedValues.includes(value) ? undefined : value,
    })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '')

  const activeFiltersCount = Object.values(filters).filter(value => value !== undefined && value !== '').length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Hide' : 'Show'} Filters
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice || ''}
                  onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice || ''}
                  onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Property Type</label>
              <Select
                value={filters.propertyType || ''}
                onValueChange={(value) => updateFilter('propertyType', value || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
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
                  <SelectItem value={PropertyType.OFFICE}>Office</SelectItem>
                  <SelectItem value={PropertyType.RETAIL}>Retail</SelectItem>
                  <SelectItem value={PropertyType.WAREHOUSE}>Warehouse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bedrooms */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Bedrooms</label>
              <Select
                value={filters.minBedrooms?.toString() || ''}
                onValueChange={(value) => updateFilter('minBedrooms', value ? Number(value) : undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bathrooms */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Bathrooms</label>
              <Select
                value={filters.minBathrooms?.toString() || ''}
                onValueChange={(value) => updateFilter('minBathrooms', value ? Number(value) : undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Area Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Area (m²)</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minArea || ''}
                  onChange={(e) => updateFilter('minArea', e.target.value ? Number(e.target.value) : undefined)}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxArea || ''}
                  onChange={(e) => updateFilter('maxArea', e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={filters.status || ''}
                onValueChange={(value) => updateFilter('status', value || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value={PropertyStatus.AVAILABLE}>Available</SelectItem>
                  <SelectItem value={PropertyStatus.PENDING}>Pending</SelectItem>
                  <SelectItem value={PropertyStatus.SOLD}>Sold</SelectItem>
                  <SelectItem value={PropertyStatus.RENTED}>Rented</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <div className="flex gap-2">
                <Select
                  value={filters.sortBy || ''}
                  onValueChange={(value) => updateFilter('sortBy', value || undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="createdAt">Date</SelectItem>
                    <SelectItem value="views">Views</SelectItem>
                    <SelectItem value="area">Area</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={filters.sortOrder || ''}
                  onValueChange={(value) => updateFilter('sortOrder', value || undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Asc</SelectItem>
                    <SelectItem value="desc">Desc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Featured */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Featured Only</label>
              <Select
                value={filters.featured?.toString() || ''}
                onValueChange={(value) => updateFilter('featured', value === 'true' ? true : undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Properties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="true">Featured Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}