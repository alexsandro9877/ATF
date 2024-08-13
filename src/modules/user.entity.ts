

import {api} from '../axios/axios'
import { IUserResp } from '../types/typeUserResp';

export class CUser {
    public user: IUserResp[];
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

    async addUser(user: IUserResp): Promise<void> {
        try {
            
            const response = await api.post(`/user`, user);
            const newUser = { ...response.data};
            this.user.push(newUser);
        } catch (error) {
            console.error("Error adding user: ", error);
        }
    }

    async editUser(id: number, newUser: IUserResp): Promise<void> {
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
    

    getAllUsers(): IUserResp[] {
        return this.user;
    }

    getUserById(id: string): IUserResp | undefined {
        return this.user.find(use => use.accountId === id);
    }
}