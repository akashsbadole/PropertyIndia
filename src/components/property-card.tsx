'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bed, Bath, Square, MapPin, Heart, Eye } from 'lucide-react'
import { Property } from '@/types/property'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const primaryImage = property.images.find(img => img.isPrimary) || property.images[0]
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: property.currency,
    maximumFractionDigits: 0,
  }).format(property.price)

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative">
        {/* Property Image */}
        <div className="relative h-48 w-full overflow-hidden">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt || property.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <MapPin className="h-12 w-12 text-gray-400" />
            </div>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-2 left-2">
            <Badge 
              variant={property.status === 'AVAILABLE' ? 'default' : 'secondary'}
              className={
                property.status === 'AVAILABLE' 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : property.status === 'SOLD' 
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-yellow-500 hover:bg-yellow-600'
              }
            >
              {property.status}
            </Badge>
          </div>

          {/* Featured Badge */}
          {property.featured && (
            <div className="absolute top-2 right-2">
              <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
                Featured
              </Badge>
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute top-2 right-12 flex gap-1">
            <Button 
              size="sm" 
              variant="secondary" 
              className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Property Details */}
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Title and Location */}
            <div>
              <h3 className="font-semibold text-lg line-clamp-1 mb-1">
                {property.title}
              </h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="line-clamp-1">
                  {property.city}, {property.state}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="text-2xl font-bold text-primary">
              {formattedPrice}
            </div>

            {/* Property Features */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {property.bedrooms && (
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  <span>{property.bedrooms} bed</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  <span>{property.bathrooms} bath</span>
                </div>
              )}
              {property.area && (
                <div className="flex items-center gap-1">
                  <Square className="h-4 w-4" />
                  <span>{property.area} m²</span>
                </div>
              )}
            </div>

            {/* Property Type */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {property.propertyType}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Eye className="h-3 w-3" />
                <span>{property.views}</span>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Card Footer */}
        <CardFooter className="p-4 pt-0">
          <Link href={`/property/${property.id}`} className="w-full">
            <Button className="w-full" variant="outline">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  )
}