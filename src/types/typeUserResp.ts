type UserRole = "user" | "admin";
type UserPermission = 
  | "/user"
  | "/product"
  | "/item"
  | "/dashboard"
  | "/userMeli"
  | "/customer"
  | "/account"
  | "/teste"
  | "/404"
  | "/partnership";

type VisibleRoute =
  | "/"
  | "/user"
  | "/product"
  | "/item"
  | "/dashboard"
  | "/view/:id"
  | "/edit/:id/desc_prod"
  | "/edit/:id/images"
  | "/edit/:id/prices"
  | "/edit/:id/measures"
  | "/edit/:id/ean_codes"
  | "/listItemForm"
  | "/listItem"
  | "/AddItemForm"
  | "/userMeli"
  | "/settings"
  | "/customer"
  | "/account"
  | "/teste"
  | "/dashboard"
  | "/404"
  | "/partnership";

  export interface IUserResp {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  picture: string;
  status: boolean;
  azp: string;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
  accountId: string;
  roles: UserRole[];
  permissions: UserPermission[];
  visibleRoutes: VisibleRoute[];
}