import { useQuery, useMutation, useQueryClient,  UseMutationOptions } from '@tanstack/react-query';

import { api } from '../axios/axios';

type UseGenericDeleteOptions<TData, TVariables> = UseMutationOptions<TData, unknown, TVariables>;
type UseGenericPostOptions<TData, TVariables> = UseMutationOptions<TData, unknown, TVariables>;
// Função genérica para GET requests
export const useGenericGet = (endpoint : string, queryKey: string, options = {}) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => api.get(endpoint).then((response) => response.data),
    ...options,
  });
};
export const useGenericPost = <TData, TVariables>(
  endpoint: string,
  queryKey: string,
  options: UseGenericPostOptions<TData, TVariables> = {}
) => {
  const queryClient = useQueryClient();
  
  return useMutation<TData, unknown, TVariables>({
    mutationFn: (data: TVariables) => api.post(endpoint, data).then((response) => response.data as TData),
    onSuccess: (data) => {
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
      queryClient.setQueryData<TData[]>(queryKey, (oldData) => {
           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
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
export const useGenericDelete = <TData, TVariables>(
  endpoint: string,
  queryKey: string,
  options: UseGenericDeleteOptions<TData, TVariables> = {}
) => {
  const queryClient = useQueryClient();

  return useMutation<TData, unknown, TVariables>({
    mutationFn: (id: TVariables) => api.delete(`${endpoint}?id=${id}`).then((response) => response.data as TData),
    onSuccess: (data) => {
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
      queryClient.invalidateQueries(queryKey);
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
export const useGenericPut = <TData, TVariables>(
  endpoint: string,
  queryKey: string,
  options: UseGenericPostOptions<TData, TVariables> = {}
) => {
  const queryClient = useQueryClient();
  
  return useMutation<TData, unknown, TVariables>({
    mutationFn: (data: TVariables) => api.put(endpoint, data).then((response) => response.data as TData),
    onSuccess: (data) => {
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
      queryClient.setQueryData<TData[]>(queryKey, (oldData) => {
           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
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