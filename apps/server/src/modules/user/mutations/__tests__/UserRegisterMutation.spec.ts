import { schema } from "../../../../schema/schema"
import { clearDatabaseAndRestartCounters } from "../../../../test/clearDatabase"
import { graphqlExecute } from "../../../../test/graphqlExecute"
import { UserRegisterMutationResult } from "../../../../test/InterfaceTest"
import { mongooseConnection } from "../../../../test/mongooseConnection"
import { mongooseDisconnect } from "../../../../test/mongooseDisconnect"

beforeAll(mongooseConnection)
beforeEach(clearDatabaseAndRestartCounters)
afterAll(mongooseDisconnect)

const mutation = `
  mutation user($username: String!, $email: String!, $password: String!) {
    userRegisterMutation(
      input: { username: $username, password: $password, email: $email }
    ) {
      token
      me {
        id
        username
      }
    }
  }
`

it('Should create user', async () => {
  
  const variableValues = {
    username: 'test123',
    email: 'test123.com',
    password: 's313s18747s41',
  }

  const result = await graphqlExecute<UserRegisterMutationResult>({
    schema,
    source: mutation,
    variableValues,
  })

  expect(result).toBeDefined()
  expect(result.data?.userRegisterMutation?.me?.id).toBeDefined()
  expect(result.data?.userRegisterMutation.token).toBeDefined()
})