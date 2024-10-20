import Koa, { ParameterizedContext, Request, Response } from 'koa'
import logger from 'koa-logger'
import cors from 'kcors'
import bodyParser from 'koa-bodyparser'
import { OptionsData, graphqlHTTP } from 'koa-graphql'
import koaPlayground from 'graphql-playground-middleware-koa'
import Router from '@koa/router'
import { getUser } from './auth'
import { getContext } from './getContext'
import { schema } from './schema/schema'

const router = new Router()
const app = new Koa()

app.use(bodyParser())

const graphQlSettingsPerReq = async (
  _req: Request,
  _res: Response,
  ctx: ParameterizedContext,
): Promise<OptionsData> => {
  const { user } = await getUser(ctx)
  
  return {
    graphiql: true,
    schema,
    pretty: true,
    
    context: await getContext({
      ctx,
      user,
    }),
   
    customFormatErrorFn: ({ message, locations, stack }) => {
      console.log(message)
      console.log(locations)
      console.log(stack)

      // TODO: sendToSlack, sendToDiscord here

      return {
        message,
        locations,
        stack,
      }
    },
  }
}

const graphQlServer = graphqlHTTP(graphQlSettingsPerReq)

router.all('/graphql', graphQlServer)
router.all(
  '/',
  koaPlayground({
    endpoint: '/',
  }),
)

app.use(cors({ credentials: true }))
app.use(logger())

app.use(router.routes()).use(router.allowedMethods())

export { app }