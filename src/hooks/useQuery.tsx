import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../axios/axios';


// Função genérica para GET requests
export const useGenericGet = (endpoint:string, queryKey:string, options = {}) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => api.get(endpoint).then((response) => response.data),
    ...options,
  });
};

// Função genérica para POST requests
export const useGenericPost = (endpoint:string, queryKey:string, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => api.post(endpoint, data).then((response) => response.data),
    onSuccess: (data) => {
      queryClient.setQueryData([queryKey], (oldData:[]) => {
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
