import { connectDatabase } from './mongo/database'
import { createServer } from 'http'
import { app } from './app'
import { config } from './config'

(async () => {
  await connectDatabase()
  const PORT = config.PORT
  const server = createServer(app.callback())
  console.log(PORT)
  server.listen(PORT, Number('0.0.0.0'), () => {
    console.log('Server is running');
  });
})()
