# 🏠 Property Sell & Buy Platform

A modern, full-featured property marketplace built with Next.js 15, TypeScript, and Prisma. This platform enables users to buy, sell, and browse properties with advanced search capabilities, detailed property listings, and contact functionality.

## ✨ Key Features

### 🏘️ Property Management
- **Property Listings**: Browse extensive collection of residential and commercial properties
- **Advanced Search**: Filter by location, price, property type, bedrooms, bathrooms, and more
- **Property Details**: Comprehensive property information with high-quality images
- **Featured Properties**: Highlight premium listings on the homepage
- **Property Categories**: Houses, Apartments, Condos, Villas, Land, Commercial spaces

### 🔍 Search & Discovery
- **Smart Search**: Real-time search with autocomplete suggestions
- **Advanced Filters**: Multiple filter options for precise property discovery
- **Location-based Search**: Find properties by city, state, or country
- **Price Range Filtering**: Set min/max price ranges
- **Property Type Filtering**: Filter by specific property types
- **Status Filtering**: Available, Pending, Sold, Rented properties

### 📱 User Experience
- **Responsive Design**: Mobile-first approach with beautiful desktop experience
- **Modern UI**: Clean, intuitive interface built with shadcn/ui components
- **Property Cards**: Engaging property previews with key information
- **Image Gallery**: High-quality property images with gallery view
- **Contact Forms**: Easy-to-use contact forms for property inquiries
- **Quick Actions**: Save, share, and contact property owners

### 🛠️ Technical Features
- **Type Safety**: Full TypeScript implementation with strict typing
- **Database**: Prisma ORM with SQLite (development) and PostgreSQL/MySQL (production) support
- **API Routes**: RESTful API for property and message management
- **Performance**: Optimized images, lazy loading, and efficient data fetching
- **Scalability**: Built with modern, scalable architecture patterns

## 🚀 Technology Stack

### Core Framework
- **⚡ Next.js 15** - React framework with App Router
- **📘 TypeScript 5** - Type-safe JavaScript development
- **🎨 Tailwind CSS 4** - Utility-first CSS framework

### UI & Components
- **🧩 shadcn/ui** - High-quality, accessible components
- **🎯 Lucide React** - Beautiful icon library
- **🖼️ Next.js Image** - Optimized image handling

### Database & Backend
- **🗄️ Prisma** - Next-generation ORM
- **💾 SQLite** - Development database
- **🐘 PostgreSQL/MySQL** - Production database support

### State & Data Management
- **🔄 React Hooks** - Built-in state management
- **📡 Fetch API** - Modern data fetching
- **🗂️ Client-side Caching** - Efficient data management

## 🎯 Property Types Supported

### Residential Properties
- **Houses**: Single-family homes, townhouses
- **Apartments**: Multi-unit residential buildings
- **Condos**: Condominiums with shared amenities
- **Villas**: Luxury standalone properties
- **Land**: Vacant land for development

### Commercial Properties
- **Commercial**: General commercial spaces
- **Offices**: Business and office spaces
- **Retail**: Shops and retail spaces
- **Warehouses**: Industrial and storage spaces

## 🏗️ Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/                     # API routes
│   │   ├── properties/          # Property-related endpoints
│   │   ├── messages/            # Message/contact endpoints
│   │   └── health/              # Health check endpoint
│   ├── property/[id]/           # Property detail page
│   ├── page.tsx                 # Homepage
│   └── layout.tsx               # Root layout
├── components/                  # React components
│   ├── hero-section.tsx        # Homepage hero with search
│   ├── property-card.tsx        # Property listing card
│   ├── search-filters.tsx       # Advanced search filters
│   └── ui/                     # shadcn/ui components
├── types/                       # TypeScript type definitions
│   └── property.ts              # Property-related types
└── lib/                         # Utility functions
    ├── db.ts                    # Prisma database client
    └── utils.ts                 # Utility functions
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd property-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your database configuration.

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed with sample data (optional)
   npx tsx prisma/seed.ts
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The platform uses a comprehensive database schema with the following main entities:

### Core Models
- **User**: Property owners, agents, and buyers
- **Property**: Property listings with detailed information
- **PropertyImage**: Property images with ordering and primary flags
- **PropertyFeature**: Property features and amenities
- **Message**: Contact/inquiry messages between users
- **Review**: Property reviews and ratings

### Key Relationships
- Users can own multiple properties
- Properties can have multiple images and features
- Users can send messages about properties
- Users can review properties they've interacted with

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database with sample data

# Deployment
npm run export       # Export static site (if applicable)
npm run analyze      # Analyze bundle size
```

## 🌟 Features in Detail

### Property Search
- **Homepage Search**: Quick search bar with location and property type filters
- **Advanced Filters**: Comprehensive filtering options including:
  - Price range (min/max)
  - Property type (House, Apartment, Condo, etc.)
  - Bedrooms and bathrooms
  - Area range
  - Property status
  - Featured properties only
  - Location-based filtering

### Property Listings
- **Grid Layout**: Responsive grid of property cards
- **Property Cards**: Include image, title, price, location, key features
- **Status Badges**: Visual indicators for property status
- **Featured Properties**: Special highlighting for premium listings
- **Loading States**: Skeleton loaders during data fetching
- **Pagination**: Navigate through multiple pages of results

### Property Details
- **Image Gallery**: Primary image with thumbnail gallery
- **Comprehensive Info**: All property details including:
  - Price and currency
  - Bedrooms, bathrooms, area
  - Year built, land area
  - Full address and location
  - Property features and amenities
- **Owner Information**: Contact details for property owners
- **Contact Form**: Easy way to inquire about properties
- **Quick Actions**: Save, share, and contact options

### Contact System
- **Message Forms**: Structured contact forms for property inquiries
- **Owner Contact**: Direct contact with property owners
- **Message Management**: Track and manage contact requests
- **Email Notifications**: Automated notifications for new messages

## 🚀 Deployment

### Production Deployment
1. **Set up production database**
2. **Configure environment variables**
3. **Build the application**
4. **Deploy to your preferred platform**

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Deployment Platforms
- **Vercel**: Recommended for Next.js applications
- **Netlify**: Static site hosting with serverless functions
- **AWS Amplify**: Full-stack deployment
- **Docker**: Containerized deployment

## 🔧 Configuration

### Environment Variables
```env
# Database
DATABASE_URL="file:./dev.db" # Development
DATABASE_URL="postgresql://..." # Production

# Application
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Optional: OAuth providers
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

### Customization
- **Branding**: Update logos and colors in the components
- **Property Types**: Modify the PropertyType enum in Prisma schema
- **Features**: Add custom property features as needed
- **UI Components**: Customize shadcn/ui components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the [GitHub Issues](https://github.com/your-repo/issues)
- Review the [deployment guide](./DEPLOYMENT.md)
- Contact the development team

---

Built with ❤️ for the property marketplace community. Powered by Next.js and modern web technologies.
