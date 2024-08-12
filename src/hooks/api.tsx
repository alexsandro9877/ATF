import { UseMutationOptions } from "@tanstack/react-query";
import { useGenericDelete, useGenericGet, useGenericPost, useGenericPut } from "./useQuery";
// import { ReloadOutlined } from "@ant-design/icons";

type UseGenericPostOptions<TData, TVariables> = UseMutationOptions<TData, unknown, TVariables>;
type SiteData = {
  id: string;
  company_name: string;
  email: string;
  phone: string;
  routes: string[];
  footerDescriptin: string;
  headerDescriptin: string;
  link_imagem: string[];
};
type CreateSiteVariables = Partial<SiteData>;
type UseGenericDeleteOptions<TData, TVariables> = UseMutationOptions<TData, unknown, TVariables>;  
type DeleteSiteVariables = string;


type IEmail ={
  email : string
}
type PostEmail = {
  email: string
};

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
  export const useGetSites = () => {
    return useGenericGet('/sites', 'sites', {
      retry: 5,
      refetchOnWindowFocus: true,
      ReloadOutlined: true
    
    });
  };
  

  export const useUserEmail = (options?: UseGenericPostOptions<IEmail, PostEmail>) => {
    return useGenericPost<IEmail, PostEmail>('/user/email', 'user', options); 
  };

  export const usePostSites = (options?: UseGenericPostOptions<SiteData, CreateSiteVariables>) => {
    return useGenericPost<SiteData, CreateSiteVariables>('/sites', 'sites', options);
  };
  export const usePutSites = (options?: UseGenericPostOptions<SiteData, CreateSiteVariables>) => {
    return useGenericPut<SiteData, CreateSiteVariables>('/sites', 'sites', options);
  };
  export const useDeleteSite = (options?: UseGenericDeleteOptions<SiteData, DeleteSiteVariables>) => {
    return useGenericDelete<SiteData, DeleteSiteVariables>('/sites', 'sites', options);
  };
  

  