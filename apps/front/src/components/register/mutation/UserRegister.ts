import { graphql } from "react-relay";

export const UserRegister = graphql`
  mutation UserRegisterMutation(
    $username: String!
    $email: String!
    $password: String!
  ) {
    UserRegister(input: { username: $username, password: $password, email: $email }) {
      me {
        id
        username
      }
    }
  }
`;
