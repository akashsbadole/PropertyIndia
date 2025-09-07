import { db } from '../src/lib/db'

async function clearDatabase() {
  console.log('Clearing database...')
  
  await db.message.deleteMany()
  await db.review.deleteMany()
  await db.propertyFeature.deleteMany()
  await db.propertyImage.deleteMany()
  await db.property.deleteMany()
  await db.user.deleteMany()
  
  console.log('Database cleared successfully!')
}

clearDatabase()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })