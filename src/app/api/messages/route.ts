import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { MessageStatus } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const propertyId = searchParams.get('propertyId')
    const senderId = searchParams.get('senderId')
    const status = searchParams.get('status') as MessageStatus
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: any = {}
    
    if (propertyId) where.propertyId = propertyId
    if (senderId) where.senderId = senderId
    if (status) where.status = status

    const skip = (page - 1) * limit

    const messages = await db.message.findMany({
      where,
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        property: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    })

    const total = await db.message.count({ where })

    return NextResponse.json({
      messages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { subject, content, senderId, propertyId } = body

    // Validate required fields
    if (!content || !senderId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify sender exists
    const sender = await db.user.findUnique({
      where: { id: senderId },
    })

    if (!sender) {
      return NextResponse.json(
        { error: 'Sender not found' },
        { status: 404 }
      )
    }

    // If propertyId is provided, verify property exists
    if (propertyId) {
      const property = await db.property.findUnique({
        where: { id: propertyId },
      })

      if (!property) {
        return NextResponse.json(
          { error: 'Property not found' },
          { status: 404 }
        )
      }
    }

    const message = await db.message.create({
      data: {
        subject,
        content,
        senderId,
        propertyId,
        status: MessageStatus.UNREAD,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        property: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error('Error creating message:', error)
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    )
  }
}