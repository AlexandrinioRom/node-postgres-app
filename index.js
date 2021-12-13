const authRouter = require('./routes/auth.routes')
const userRouter = require('./routes/user.routes')
const express = require('express')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

const parser = express.urlencoded({ extended: false });
const PORT = process.env.PORT ?? 5000

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, 'static')))
app.use('/', parser, authRouter)
app.use('/', parser, userRouter)

async function start() {
  try {

    app.listen(PORT, () => {
      console.log(`Server has benn started on port ${PORT}`)
    })
  } catch (e) {
    console.log(e);
  }
}

start()

