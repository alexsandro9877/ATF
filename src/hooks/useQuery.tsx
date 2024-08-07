import { useQuery, useMutation, useQueryClient,  UseMutationOptions } from '@tanstack/react-query';
import { api } from '../axios/axios';

// Tipagem genérica para as funções de requisição
interface UseGenericPostOptions<TData, TVariables> extends UseMutationOptions<TData, unknown, TVariables> {}



// Função genérica para GET requests
export const useGenericGet = (endpoint : string, queryKey: string, options = {}) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => api.get(endpoint).then((response) => response.data),
    ...options,
  });
};

// Função genérica para POST requests
export const useGenericPost = <TData, TVariables>(  endpoint: string,   queryKey: string,   options: UseGenericPostOptions<TData, TVariables> = {}) => {
  const queryClient = useQueryClient();
  
  return useMutation<TData, unknown, TVariables>({
    mutationFn: (data: TVariables) => api.post(endpoint, data).then((response) => response.data as TData),
    onSuccess: (data) => {
      queryClient.setQueryData<TData[]> ([queryKey], (oldData) => {
        return oldData ? [...oldData, data] : [data];
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      if (options.onSuccess) options.onSuccess(data);
    },
    onError: (error) => {
       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      if (options.onError) options.onError(error);
    },
    ...options,
  });
};
