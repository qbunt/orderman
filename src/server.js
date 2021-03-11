import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'

import cookieParser from 'cookie-parser'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

polka()
  .use(cookieParser())
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: async (req, res) => {
        // populates user if it exists
        if (req.cookies.token) {
          return {
            user: req.cookies.token
          }
        }
        return {
          user: false
        }
      }
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log('error', err)
  })
