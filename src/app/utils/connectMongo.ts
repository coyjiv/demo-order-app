const { MongoClient, ServerApiVersion } = require('mongodb')

const username = process.env.MONGO_USERNAME
  ? encodeURIComponent(process.env.MONGO_USERNAME)
  : ''
const password = process.env.MONGO_PASSWORD
  ? encodeURIComponent(process.env.MONGO_PASSWORD)
  : ''

const uri = `mongodb+srv://${username}:${password}@cluster1.9ftfskb.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

export const mongoPromise = client.connect()
