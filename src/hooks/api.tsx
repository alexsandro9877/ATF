import { useGenericGet, useGenericPost } from "./useQuery";


// Hook para o endpoint de contas
export const useGetAccounts = () => {
    return useGenericGet('/accounts/all', 'accounts', {
      retry: 2,
      refetchOnWindowFocus: true,
      // Adicione outras opções específicas aqui
    });
  };
  
  export const usePostAccount = () => {
    return useGenericPost('/accounts', 'accounts', {
    
    });
  };
  
  // Hook para outro endpoint, por exemplo, usuários
  export const useGetUsers = () => {
    return useGenericGet('/users/all', 'users', {
      retry: 5,
      refetchOnWindowFocus: true,
    
    });
  };
  
  export const usePostUser = () => {
    return useGenericPost('/users', 'users', {
    
    });
  };
  

  