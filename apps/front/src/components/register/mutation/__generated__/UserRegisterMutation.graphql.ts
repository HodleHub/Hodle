/**
 * @generated SignedSource<<1b6c601942efb64005ce3abe45d67565>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserRegisterMutation$variables = {
  email: string;
  password: string;
  username: string;
};
export type UserRegisterMutation$data = {
  readonly UserRegister: {
    readonly me: {
      readonly id: string;
      readonly username: string;
    } | null | undefined;
  } | null | undefined;
};
export type UserRegisterMutation = {
  response: UserRegisterMutation$data;
  variables: UserRegisterMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "email"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "password"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "username"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "email",
            "variableName": "email"
          },
          {
            "kind": "Variable",
            "name": "password",
            "variableName": "password"
          },
          {
            "kind": "Variable",
            "name": "username",
            "variableName": "username"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "UserRegisterPayload",
    "kind": "LinkedField",
    "name": "UserRegister",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "username",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserRegisterMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "UserRegisterMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "3f144eb246d388ee08b28989754ef4d8",
    "id": null,
    "metadata": {},
    "name": "UserRegisterMutation",
    "operationKind": "mutation",
    "text": "mutation UserRegisterMutation(\n  $username: String!\n  $email: String!\n  $password: String!\n) {\n  UserRegister(input: {username: $username, password: $password, email: $email}) {\n    me {\n      id\n      username\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "04da33a4c2efee5e5e30af9e576e9f1b";

export default node;
