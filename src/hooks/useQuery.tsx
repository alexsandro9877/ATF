import { useQuery, useMutation, useQueryClient,  UseMutationOptions } from '@tanstack/react-query';

import { api } from '../axios/axios';

// Tipagem genérica para as funções de requisição
//interface UseGenericPostOptions<TData, TVariables> extends UseMutationOptions<TData, unknown, TVariables> {}



// Função genérica para GET requests
export const useGenericGet = (endpoint : string, queryKey: string, options = {}) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => api.get(endpoint).then((response) => response.data),
    ...options,
  });
};

// Função genérica para POST requestsxport const useGenericPost = <TData, TVariables>(

type UseGenericPostOptions<TData, TVariables> = UseMutationOptions<TData, unknown, TVariables>;

export const useGenericPost = <TData, TVariables>(
  endpoint: string,
  queryKey: string,
  options: UseGenericPostOptions<TData, TVariables> = {}
) => {
  const queryClient = useQueryClient();
  
  return useMutation<TData, unknown, TVariables>({
    mutationFn: (data: TVariables) => api.post(endpoint, data).then((response) => response.data as TData),
    onSuccess: (data) => {
      queryClient.setQueryData<TData[]>(queryKey, (oldData) => {
        return oldData ? [...oldData, data] : [data];
      });
      if (options.onSuccess) options.onSuccess(data);
    },
    onError: (error) => {
      if (options.onError) options.onError(error);
    },
    ...options,
  });
};

type UseGenericDeleteOptions<TData, TVariables> = UseMutationOptions<TData, unknown, TVariables>;

export const useGenericDelete = <TData, TVariables>(
  endpoint: string,
  queryKey: string,
  options: UseGenericDeleteOptions<TData, TVariables> = {}
) => {
  const queryClient = useQueryClient();

  return useMutation<TData, unknown, TVariables>({
    mutationFn: (id: TVariables) => api.delete(`${endpoint}?id=${id}`).then((response) => response.data as TData),
    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKey);
      if (options.onSuccess) options.onSuccess(data);
    },
    onError: (error) => {
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
      queryClient.setQueryData<TData[]>(queryKey, (oldData) => {
        return oldData ? [...oldData, data] : [data];
      });
      if (options.onSuccess) options.onSuccess(data);
    },
    onError: (error) => {
      if (options.onError) options.onError(error);
    },
    ...options,
  });
};