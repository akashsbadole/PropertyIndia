import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { PropertyType, PropertyStatus } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Extract query parameters
    const search = searchParams.get('search') || ''
    const propertyType = searchParams.get('propertyType') as PropertyType
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined
    const minBedrooms = searchParams.get('minBedrooms') ? parseInt(searchParams.get('minBedrooms')!) : undefined
    const minBathrooms = searchParams.get('minBathrooms') ? parseInt(searchParams.get('minBathrooms')!) : undefined
    const minArea = searchParams.get('minArea') ? parseFloat(searchParams.get('minArea')!) : undefined
    const maxArea = searchParams.get('maxArea') ? parseFloat(searchParams.get('maxArea')!) : undefined
    const city = searchParams.get('city') || ''
    const state = searchParams.get('state') || ''
    const country = searchParams.get('country') || ''
    const featured = searchParams.get('featured') === 'true'
    const status = searchParams.get('status') as PropertyStatus
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Build where clause
    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { state: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (propertyType) {
      where.propertyType = propertyType
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {}
      if (minPrice !== undefined) where.price.gte = minPrice
      if (maxPrice !== undefined) where.price.lte = maxPrice
    }

    if (minBedrooms !== undefined) {
      where.bedrooms = { gte: minBedrooms }
    }

    if (minBathrooms !== undefined) {
      where.bathrooms = { gte: minBathrooms }
    }

    if (minArea !== undefined || maxArea !== undefined) {
      where.area = {}
      if (minArea !== undefined) where.area.gte = minArea
      if (maxArea !== undefined) where.area.lte = maxArea
    }

    if (city) {
      where.city = { contains: city, mode: 'insensitive' }
    }

    if (state) {
      where.state = { contains: state, mode: 'insensitive' }
    }

    if (country) {
      where.country = { contains: country, mode: 'insensitive' }
    }

    if (featured) {
      where.featured = true
    }

    if (status) {
      where.status = status
    }

    // Build order by clause
    const orderBy: any = {}
    orderBy[sortBy] = sortOrder

    // Calculate pagination
    const skip = (page - 1) * limit

    // Fetch properties with related data
    const properties = await db.property.findMany({
      where,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
        images: {
          orderBy: {
            order: 'asc',
          },
        },
        features: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        _count: {
          select: {
            reviews: true,
            messages: true,
          },
        },
      },
      orderBy,
      skip,
      take: limit,
    })

    // Get total count for pagination
    const total = await db.property.count({ where })

    // Increment views for each property
    await Promise.all(
      properties.map(property =>
        db.property.update({
          where: { id: property.id },
          data: { views: { increment: 1 } },
        })
      )
    )

    return NextResponse.json({
      properties,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      price,
      currency = 'USD',
      propertyType,
      bedrooms,
      bathrooms,
      area,
      landArea,
      yearBuilt,
      address,
      city,
      state,
      country,
      postalCode,
      latitude,
      longitude,
      ownerId,
      features = [],
      images = [],
    } = body

    // Validate required fields
    if (!title || !description || !price || !propertyType || !address || !city || !state || !country || !ownerId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create property
    const property = await db.property.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        currency,
        propertyType,
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        bathrooms: bathrooms ? parseInt(bathrooms) : null,
        area: parseFloat(area),
        landArea: landArea ? parseFloat(landArea) : null,
        yearBuilt: yearBuilt ? parseInt(yearBuilt) : null,
        address,
        city,
        state,
        country,
        postalCode,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        ownerId,
        features: {
          create: features.map((feature: any) => ({
            name: feature.name,
            value: feature.value,
          })),
        },
        images: {
          create: images.map((image: any, index: number) => ({
            url: image.url,
            alt: image.alt,
            isPrimary: index === 0,
            order: index,
          })),
        },
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
        images: {
          orderBy: {
            order: 'asc',
          },
        },
        features: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })

    return NextResponse.json(property, { status: 201 })
  } catch (error) {
    console.error('Error creating property:', error)
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    )
  }
}