import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../axios/axios';


export const usePost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ accounts, completed }) => {
      return api.post('/accounts', { accounts, completed }).then((response) => response.data);
    },
    onSuccess: (data) => {
      // Revalidar a query "accounts"
      queryClient.setQueryData(['accounts'], (oldData) => {
        // Atualize os dados da query aqui se necessário
        return oldData ? [...oldData, data] : [data];
      });
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
};

export const useGet = () => {
  const query = useQuery({
    queryKey: ['accounts'],
    queryFn: () => {
      return api.get('/accounts/all').then((response) => response.data);
    },
    retry: 5,
    refetchOnWindowFocus: true, // mudar de aba ele atualiza
    // refetchInterval: 6000, //refazer de 5 em 5 min
    // initialData:[{id: 10, valor: 1}] // inicia com esses dados
  });

  return query;
};
