const allowCrossDomain = require('./middleware/cors.middleware')
const authRouter = require('./routes/auth.routes')
const userRouter = require('./routes/user.routes')
const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const parser = express.urlencoded({ extended: false });
const PORT = process.env.PORT ?? 5000

const app = express()
app.use(allowCrossDomain)
app.use(parser)
app.use(express.json())

app.use('/auth', authRouter)
app.use('/user', userRouter)

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`)
    })
  } catch (e) {
    console.log(e);
  }
}

start()