import express from 'express'
import morgan from 'morgan'
import { getDatabase } from './config/db.js'

const app = express()

//  Middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))

//  Router

app.post('/login', (req, res) => {
  res.json({ user: 'Login' })
})
app.post('/register', (req, res) => {
  res.json({ user: 'register' })
})
app.post('/logout', (req, res) => {
  res.json({ user: 'Logout' })
})

// test data base
app.get('/test-db', async (req, res) => {
  try {
    const db = getDatabase()
    const result = await db.query(
      "SELECT 'Database connection successful!' as message, NOW() as timestamp"
    )
    res.json({
      status: 'success',
      data: result[0],
      message: 'Database connection test passed'
    })
  } catch (error) {
    console.error('Error testing database connection:', error)
    res.status(500).json({
      status: 'error',
      message: 'Database connection test failed',
      error: error.message
    })
  }
})

export default app
