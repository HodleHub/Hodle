import { useMutation } from "react-relay";
import { GraphQLTaggedNode, MutationParameters } from "relay-runtime";
import { toast } from "sonner";

type MutationResponse = {
  success?: string;
  error?: string;
  errors?: string[];
};

type MutationError = {
  source?: {
    errors?: string[];
  };
};

type UseCustomMutationParams<T extends MutationParameters> = {
  name: string;
  mutation: GraphQLTaggedNode;
  afterCompleted?: (response: T['response']) => void;
  afterError?: (error: MutationError, response?: T['response']) => void;
};

export function useCustomMutation<T extends MutationParameters>({
  name,
  mutation,
  afterCompleted,
  afterError,
}: UseCustomMutationParams<T>): [(variables: T['variables']) => void, boolean] {
  const [commit, isInFlight] = useMutation<T>(mutation);

  const getSuccess = (response: T['response']) => {
    const data = response[name as keyof T['response']] as MutationResponse;
    return data?.success || 'Operation completed successfully';
  };

  const getError = (data: MutationError) => {
    if (data.source?.errors) {
      return data.source.errors.join('\n');
    }
    return 'An error occurred';
  };

  const executeMutation = (variables: T['variables']) => {
    if (!commit) {
      console.error('Commit function is not defined');
      return;
    }

    commit({
      variables,
      onCompleted: (response) => {
        const data = response[name as keyof T['response']] as MutationResponse;

        if (data && !data.error && (!data.errors || data.errors.length === 0)) {
          toast.success(getSuccess(response));
        }

        if (afterCompleted) {
          afterCompleted(response);
        }
      },
      onError: (error) => {
        const data = error as MutationError;
        const errorMessage = getError(data);
        toast.error(errorMessage);

        if (afterError) {
          afterError(data, undefined);
        }
      },
    });
  };

  return [executeMutation, isInFlight];
}
