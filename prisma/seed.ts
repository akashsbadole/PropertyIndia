import { db } from '../src/lib/db'
import { PropertyType, PropertyStatus, UserRole } from '@prisma/client'

async function main() {
  console.log('Seeding database...')

  // Create sample users
  const users = await Promise.all([
    db.user.create({
      data: {
        email: 'john.doe@example.com',
        name: 'John Doe',
        phone: '+1-555-0123',
        role: UserRole.AGENT,
        bio: 'Experienced real estate agent with 10+ years in the industry.',
      },
    }),
    db.user.create({
      data: {
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
        phone: '+1-555-0124',
        role: UserRole.AGENT,
        bio: 'Luxury property specialist serving the downtown area.',
      },
    }),
    db.user.create({
      data: {
        email: 'bob.wilson@example.com',
        name: 'Bob Wilson',
        phone: '+1-555-0125',
        role: UserRole.USER,
        bio: 'First-time home buyer looking for a cozy apartment.',
      },
    }),
  ])

  console.log('Created users:', users.length)

  // Create sample properties
  const properties = await Promise.all([
    db.property.create({
      data: {
        title: 'Modern Downtown Apartment',
        description: 'Stunning modern apartment in the heart of downtown with panoramic city views. This luxury unit features high-end finishes, floor-to-ceiling windows, and state-of-the-art appliances.',
        price: 750000,
        currency: 'USD',
        propertyType: PropertyType.APARTMENT,
        status: PropertyStatus.AVAILABLE,
        bedrooms: 2,
        bathrooms: 2,
        area: 120,
        yearBuilt: 2020,
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        postalCode: '10001',
        latitude: 40.7128,
        longitude: -74.0060,
        featured: true,
        ownerId: users[0].id,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
              alt: 'Modern apartment living room',
              isPrimary: true,
              order: 0,
            },
            {
              url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
              alt: 'Modern apartment kitchen',
              order: 1,
            },
            {
              url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop',
              alt: 'Modern apartment bedroom',
              order: 2,
            },
          ],
        },
        features: {
          create: [
            { name: 'Parking', value: '2 spaces' },
            { name: 'Gym', value: '24/7 access' },
            { name: 'Pool', value: 'Rooftop' },
            { name: 'Concierge', value: 'Full service' },
            { name: 'Pet Friendly', value: 'Yes' },
          ],
        },
      },
    }),
    db.property.create({
      data: {
        title: 'Luxury Villa with Ocean View',
        description: 'Magnificent villa offering breathtaking ocean views from every room. This exclusive property features a private beach, infinity pool, and lush tropical gardens.',
        price: 2500000,
        currency: 'USD',
        propertyType: PropertyType.VILLA,
        status: PropertyStatus.AVAILABLE,
        bedrooms: 5,
        bathrooms: 4,
        area: 450,
        landArea: 1200,
        yearBuilt: 2018,
        address: '456 Ocean Drive',
        city: 'Miami',
        state: 'FL',
        country: 'USA',
        postalCode: '33139',
        latitude: 25.7617,
        longitude: -80.1918,
        featured: true,
        ownerId: users[1].id,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop',
              alt: 'Luxury villa exterior',
              isPrimary: true,
              order: 0,
            },
            {
              url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
              alt: 'Luxury villa pool',
              order: 1,
            },
          ],
        },
        features: {
          create: [
            { name: 'Swimming Pool', value: 'Infinity' },
            { name: 'Beach Access', value: 'Private' },
            { name: 'Garden', value: 'Tropical' },
            { name: 'Garage', value: '4 cars' },
            { name: 'Smart Home', value: 'Fully equipped' },
          ],
        },
      },
    }),
    db.property.create({
      data: {
        title: 'Cozy Suburban House',
        description: 'Charming family home in a quiet suburban neighborhood. Perfect for families with excellent schools nearby and a large backyard for children to play.',
        price: 450000,
        currency: 'USD',
        propertyType: PropertyType.HOUSE,
        status: PropertyStatus.AVAILABLE,
        bedrooms: 3,
        bathrooms: 2,
        area: 180,
        landArea: 600,
        yearBuilt: 2015,
        address: '789 Maple Avenue',
        city: 'Austin',
        state: 'TX',
        country: 'USA',
        postalCode: '73301',
        latitude: 30.2672,
        longitude: -97.7431,
        featured: false,
        ownerId: users[0].id,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
              alt: 'Suburban house exterior',
              isPrimary: true,
              order: 0,
            },
          ],
        },
        features: {
          create: [
            { name: 'Backyard', value: 'Fenced' },
            { name: 'Garage', value: '2 cars' },
            { name: 'Fireplace', value: 'Wood burning' },
            { name: 'Patio', value: 'Covered' },
          ],
        },
      },
    }),
    db.property.create({
      data: {
        title: 'Downtown Commercial Space',
        description: 'Prime commercial space in the bustling downtown business district. Excellent visibility and high foot traffic make this perfect for retail or office use.',
        price: 1200000,
        currency: 'USD',
        propertyType: PropertyType.COMMERCIAL,
        status: PropertyStatus.AVAILABLE,
        area: 300,
        yearBuilt: 2019,
        address: '321 Business Blvd',
        city: 'Chicago',
        state: 'IL',
        country: 'USA',
        postalCode: '60601',
        latitude: 41.8781,
        longitude: -87.6298,
        featured: false,
        ownerId: users[1].id,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
              alt: 'Commercial space interior',
              isPrimary: true,
              order: 0,
            },
          ],
        },
        features: {
          create: [
            { name: 'Parking', value: 'Customer parking' },
            { name: 'HVAC', value: 'Central' },
            { name: 'Security', value: '24/7' },
            { name: 'Accessibility', value: 'ADA compliant' },
          ],
        },
      },
    }),
    db.property.create({
      data: {
        title: 'Modern Condo with City Views',
        description: 'Sleek and modern condominium offering stunning city views. This unit features an open floor plan, high-end appliances, and access to building amenities.',
        price: 625000,
        currency: 'USD',
        propertyType: PropertyType.CONDO,
        status: PropertyStatus.PENDING,
        bedrooms: 1,
        bathrooms: 1,
        area: 85,
        yearBuilt: 2021,
        address: '555 High Street',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        postalCode: '94105',
        latitude: 37.7749,
        longitude: -122.4194,
        featured: false,
        ownerId: users[0].id,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
              alt: 'Modern condo interior',
              isPrimary: true,
              order: 0,
            },
          ],
        },
        features: {
          create: [
            { name: 'Gym', value: 'Building gym' },
            { name: 'Pool', value: 'Building pool' },
            { name: 'Concierge', value: 'Part-time' },
            { name: 'Parking', value: '1 space' },
          ],
        },
      },
    }),
    db.property.create({
      data: {
        title: 'Vacant Land for Development',
        description: 'Excellent opportunity for developers! This vacant land is zoned for mixed-use development and offers great potential in a growing area.',
        price: 850000,
        currency: 'USD',
        propertyType: PropertyType.LAND,
        status: PropertyStatus.AVAILABLE,
        area: 2000, // Total area including land
        landArea: 2000,
        address: '999 Development Way',
        city: 'Phoenix',
        state: 'AZ',
        country: 'USA',
        postalCode: '85001',
        latitude: 33.4484,
        longitude: -112.0740,
        featured: false,
        ownerId: users[1].id,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
              alt: 'Vacant land aerial view',
              isPrimary: true,
              order: 0,
            },
          ],
        },
        features: {
          create: [
            { name: 'Zoning', value: 'Mixed-use' },
            { name: 'Utilities', value: 'Available' },
            { name: 'Road Access', value: 'Paved' },
          ],
        },
      },
    }),
  ])

  console.log('Created properties:', properties.length)

  // Create some sample reviews
  const reviews = await Promise.all([
    db.review.create({
      data: {
        rating: 5,
        comment: 'Amazing property! The views are breathtaking and the location is perfect.',
        userId: users[2].id,
        propertyId: properties[0].id,
      },
    }),
    db.review.create({
      data: {
        rating: 4,
        comment: 'Great house for families. The neighborhood is quiet and safe.',
        userId: users[2].id,
        propertyId: properties[2].id,
      },
    }),
    db.review.create({
      data: {
        rating: 5,
        comment: 'Luxury at its finest! Every detail is perfect.',
        userId: users[2].id,
        propertyId: properties[1].id,
      },
    }),
  ])

  console.log('Created reviews:', reviews.length)

  // Create some sample messages
  const messages = await Promise.all([
    db.message.create({
      data: {
        subject: 'Inquiry about Downtown Apartment',
        content: 'Hi, I\'m interested in the downtown apartment. Could you provide more information about the amenities?',
        senderId: users[2].id,
        propertyId: properties[0].id,
      },
    }),
    db.message.create({
      data: {
        subject: 'Question about the Villa',
        content: 'Is the villa furnished? Also, what are the maintenance fees?',
        senderId: users[2].id,
        propertyId: properties[1].id,
      },
    }),
  ])

  console.log('Created messages:', messages.length)

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })