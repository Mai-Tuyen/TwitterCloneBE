import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitterclonecluster.eaq2m.mongodb.net/?retryWrites=true&w=majority&appName=TwitterCloneCluster`
class DatabaseService {
  private client: MongoClient
  constructor() {
    this.client = new MongoClient(uri)
  }
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.client.db('twitter-dev').command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log(error)
    } finally {
      // Ensures that the client will close when you finish/error
      await this.client.close()
    }
  }
}

// create new object
const databaseService = new DatabaseService()
export default databaseService
