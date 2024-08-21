import { UseMutationOptions } from "@tanstack/react-query";
import {
  useGenericDelete,
  useGenericGet,
  useGenericPost,
  useGenericPut,
} from "./useQuery";
import { IUserCreated } from "../types/typeUserPost";
import { IRequestApi } from "../components/Meli";
import { ISendEmail } from "../components/Login/login";

type UseGenericPostOptions<TData, TVariables> = UseMutationOptions<  TData,  unknown,  TVariables>;
type UseGenericDeleteOptions<TData, TVariables> = UseMutationOptions<  TData,  unknown,  TVariables>;

// Hook para o endpoint de contas
///Accounts
export const useGetAccounts = () => {
  return useGenericGet("/accounts/all", "accounts", {
    retry: 2,
    refetchOnWindowFocus: true,
    // Adicione outras opções específicas aqui
  });
};
export const usePostAccount = () => {
  return useGenericPost("/accounts", "accounts", {});
};
///Login
type IEmail = { email: string };
type PostEmail = { email: string };
export const useUserEmail = ( options?: UseGenericPostOptions<IEmail, PostEmail>) => {
  return useGenericPost<IEmail, PostEmail>("/user/email", "user", options);
};
///User
type DeleteUser = { id: string };
type CreateUserVariables = Partial<IUserCreated>;
export const useGetUser = (id: string) => {
  return useGenericGet(`/user/${id}`, "user", {
    retry: 5,
    refetchOnWindowFocus: true,
    ReloadOutlined: true,
  });
};
export const useGetUserAll = (id: string) => {
  return useGenericGet(`user/account/?id=${id}`, "user", {
    retry: 5,
    refetchOnWindowFocus: true,
    ReloadOutlined: true,
  });
};
export const useDeleteUser = (options?: UseGenericDeleteOptions<DeleteUser, string>) => {
  return useGenericDelete("/user/", "user", options);
};
export const usePostUser = (  options?: UseGenericPostOptions<IUserCreated, CreateUserVariables>) => {
  return useGenericPost<IUserCreated, CreateUserVariables>(
    "/user",
    "user",
    options
  );
};

/// Sites
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
type DeleteSiteVariables = string;
export const useGetSites = () => {
  return useGenericGet("/sites", "sites", {
    retry: 5,
    refetchOnWindowFocus: true,
    ReloadOutlined: true,
  });
};
export const usePostSites = (  options?: UseGenericPostOptions<SiteData, CreateSiteVariables>) => {
  return useGenericPost<SiteData, CreateSiteVariables>(
    "/sites",
    "sites",
    options
  );
};
export const usePutSites = (  options?: UseGenericPostOptions<SiteData, CreateSiteVariables>) => {
  return useGenericPut<SiteData, CreateSiteVariables>(
    "/sites",
    "sites",
    options
  );
};
export const useDeleteSite = (  options?: UseGenericDeleteOptions<SiteData, DeleteSiteVariables>) => {
  return useGenericDelete<SiteData, DeleteSiteVariables>(
    "/sites",
    "sites",
    options
  );
};



export const useGetMercadoLivreWeb = (  options?: UseGenericPostOptions<IRequestApi, IRequestApi>) => {
  return useGenericPost<IRequestApi, IRequestApi>(
    "/referenceId",
    "mercadoLivreWeb",
    options
  );
};

export const useSendEmail = (  options?: UseGenericPostOptions<ISendEmail, ISendEmail>) => {
  return useGenericPost<ISendEmail, ISendEmail>(
    "/send-email",
    "email",
    options
  );
};