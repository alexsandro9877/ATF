import { observable, makeObservable, action } from "mobx";
import { api } from "../axios/axios"; // Assumindo que api é a configuração da API

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  picture: string;
  status: boolean;
  azp: string;
  createdAt: string;
  updatedAt: string;
  accountId: string;
  roles: string[];
  permissions: string[];
  visibleRoutes: string[];
}



export interface DecodedToken {
  exp: number;
  iat: number;
  email: string;
  azp?: string;
  visibleRoutes?: string[];
  allowedRoutes?: string[];
  role?: string;
  key: string;
}

interface IToken {
  accessToken: string;
  refreshToken: string;
  expires_in: number;
}

export class AuthUserStore {
  public statusAutenticacao = false;
  public userAut: IUser[] = [];
  access_token: { token: string } = { token: "" };
  refreshToken: string = "";
  expires_in: number = 0;
  accountId: string = '';
  azp: string = '';

  constructor() {
    makeObservable(this, {
      statusAutenticacao: observable,
      userAut: observable,
      access_token: observable,
      logIn: action,
      logOut: action,
      expires_in: observable,
      refreshToken: observable,
      getUser: action
    });
  }

  async logIn(email: string): Promise<{ success: boolean; message?: string }> {
    try {
      const loginResponse = await api.post<IToken>(`/login`, { username: email });

      if (!loginResponse.data || !loginResponse.data.refreshToken) {
        return { success: false, message: "Login failed. No refresh token received." };
      }

    //  localStorage.setItem('authToken', loginResponse.data.accessToken);
      localStorage.setItem('refreshToken', loginResponse.data.refreshToken);
      const userResponse = await api.post('/user/email', { email: email });
      if (!userResponse.data || !userResponse.data.status) {
        return { success: false, message: "User not registered." };
      }

      this.access_token = { token: loginResponse.data.refreshToken };
      this.expires_in = loginResponse.data.expires_in
      this.userAut = [userResponse.data];
      this.statusAutenticacao = userResponse.data.status;
      this.accountId = userResponse.data.accountId;
      this.azp = userResponse.data.azp;
      return { success: true };

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Error";
      console.error("Error during login:", errorMessage);
      return { success: false, message: errorMessage };
    }
  }

  async logOut() {
    this.statusAutenticacao = false;
    this.access_token = { token: "" };
    this.userAut = [];
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }

  getUser(): IUser[] {
    return this.userAut;
  }
 
}

const authUserStore = new AuthUserStore();
export default authUserStore;
