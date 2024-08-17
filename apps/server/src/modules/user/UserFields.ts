import { DataLoaderKey } from "@entria/graphql-mongo-helpers";
import { BaseContext } from "@entria/graphql-mongo-helpers/lib/createLoader";
import { UserLoader } from "./UserLoader";
import { UserDocument } from "./UserModel";
import { UserType } from "./UserType";

export const userTypeField = (key = 'user') => ({
  [key]: {
    type: UserType,
    resolve: async (obj: { [x: string]: DataLoaderKey; }, context: BaseContext<"UserLoader", UserDocument>) => UserLoader.load(context, obj[key]),
  },
});