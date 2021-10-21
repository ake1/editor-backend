import { ConfigService } from '@nestjs/config'
import { Env } from './config/env-config/config'

export default function mongooseFactory(config: ConfigService<Env>) {
  const uri =
    config.get('NODE_ENV') === 'test' && !config.get('CI')
      ? 'mongodb://user:pass@localhost:27017'
      : config.get('DB_URI')
  if (!uri) throw Error('could not find a url to connect to')
  return { uri }
}
