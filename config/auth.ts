import env from '#start/env'
import { defineConfig } from '@adonisjs/auth'
import { JwtGuard } from '../app/auth/guards/jwt.js'
import { sessionUserProvider } from '@adonisjs/auth/session'

const jwtConfig = {
  secret: env.get('APP_KEY'),
}
const userProvider = sessionUserProvider({
  model: () => import('#models/user'),
})

const authConfig = defineConfig({
  default: 'jwt',
  guards: {
    jwt: (ctx) => {
      return new JwtGuard(ctx, userProvider, jwtConfig)
    },
  },
})

export default authConfig
