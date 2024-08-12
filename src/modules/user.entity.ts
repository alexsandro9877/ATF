

import {api} from '../axios/axios'



export interface IUserCreate {
    name: string;
    email: string;
    phone: string;
    password: string;
    picture: string;
    authMethods: {
        email?: {
            enabled: boolean;
            email: string;
        };
        phone?: {
            enabled: boolean;
            phoneNumber: string;
            otpEnabled: boolean;
        };
        social?: {
            enabled: boolean;
            providers: Record<string, { enabled: boolean; providerId: string }>;
        };
    };
    roles: string[];
    permissions: string[];
    visibleRoutes: string[];
    theme: {
        colorPrimary: string;
        colorInfo: string;
        colorTextBase: string;
        colorBgBase: string;
        colorTextTertiary: string;
        colorTextSecondary: string;
    };
    accountId: string;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    picture: string;
    createdAt: string;
    updatedAt: string;
    accountId: string;
    roles: string[];
    permissions: string[];
    visibleRoutes: string[];
    authMethods: AuthMethod[];
    theme: Theme[];
}

interface AuthMethod {
    id: string;
    userId: string;
    email: AuthEmail[];
    phone: AuthPhone[];
    social: AuthSocial[];
}

interface AuthEmail {
    id: string;
    enabled: boolean;
    email: string;
    authmethodsId: string;
}

interface AuthPhone {
    id: string;
    enabled: boolean;
    phoneNumber: string;
    otpEnabled: boolean;
    authmethodsId: string;
}

interface AuthSocial {
    id: string;
    enabled: boolean;
    providers: {
        google: {
            enabled: boolean;
            providerId: string;
        };
        facebook: {
            enabled: boolean;
            providerId: string;
        };
    };
    authmethodsId: string;
}

interface Theme {
    id: string;
    colorPrimary: string;
    colorInfo: string;
    colorTextBase: string;
    colorBgBase: string;
    colorTextTertiary: string;
    colorTextSecondary: string;
    userId: string;
}



export class CUser {
    public user: IUser[];
    public lastId: number;
    constructor() {
        this.user = [];
        this.lastId = 0;
    }


    async fetchAllUsers(id :string): Promise<void> {
   
        try {
            const response = await api.get(`user/account/`, { params: { id } });
            this.user = response.data;
        } catch (error) {
            console.error("Error fetching products: ", error);
        }
    }

    async addUser(user: IUserCreate): Promise<void> {
        try {
            
            const response = await api.post(`/user`, user);
            const newUser = { ...response.data};
            this.user.push(newUser);
        } catch (error) {
            console.error("Error adding user: ", error);
        }
    }

    async editUser(id: number, newUser: IUser): Promise<void> {
        try {
            const response = await api.put(`/user/${id}`, newUser);
            const index = this.user.findIndex(id => id === id);
            if (index !== -1) {
                this.user[index] = { ...response.data, id };
            }
        } catch (error) {
            console.error("Error editar product: ", error);
        }
    }

    async deleteUser(id: string): Promise<void> {
        try {
            // Envia o ID do produto como um parâmetro de consulta
            await api.delete('/user/', { params: { id } });
            this.user = this.user.filter(use => use.accountId !== id);
        } catch (error) {
            console.error("Error deleting user: ", error);
        }
    }
    

    getAllUsers(): IUser[] {
        return this.user;
    }

    getUserById(id: string): IUser | undefined {
        return this.user.find(use => use.accountId === id);
    }
}