import app from './app'
import config from './config'

app.listen(config.port, () => console.info(`listening on port ${config.port}`))
