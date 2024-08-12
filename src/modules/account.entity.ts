

import {api} from '../axios/axios'
import { observable, makeObservable, action } from "mobx";

export interface CreateAccounts {
    id?: string;
    name: string;
    aplication: string;
    routes: string[];
    customerId: string;
}


interface Customer {
    id: string;
    name: string;
    email: string;
    password: string;
    acesso: string[];
    token: string;
    imagem: string[];
    partner: string[];
    status: boolean;
    created_at: string;
    updated_at: string;
}

export interface IAccount {
    id: string;
    name: string;
    aplication: string;
    routes: string[];
    created_at: string;
    updated_at: string;
    customerId: string;
    customer: Customer;
}





export class CAccount {
    public account: IAccount[] = [];
    public lastId: number = 0;
    constructor() {
        this.account = [];
        this.lastId = 0;
        makeObservable(this, {
            account :observable,
            lastId :observable,
            fetchAllAccount: action,
            addAccount: action,
            editAccount:action
        });
      }
  

    async fetchAllAccount(): Promise<void> {
        try {
            const response = await api.get(`/accounts/all`);
            this.account = response.data;
        } catch (error) {
            this.account = [];
            console.error("Error fetching account: ", error);
        }
    }

    async addAccount(account: CreateAccounts): Promise<void> {
        try {
            const response = await api.post(`/account`, account);
            const newAccount = { ...response.data};
            this.account.push(newAccount);
        } catch (error) {
            console.error("Error adding account: ", error);
        }
    }

    async editAccount(newAccount: CreateAccounts): Promise<void> {
        try {
           const response  = await api.put(`/account`, newAccount);        
           const index = this.account.findIndex(id => id === id);
           if (index !== -1) {
               this.account[index] = { ...response.data };
           }
        } catch (error) {
            console.error("Error editar account: ", error);
        }
    }

    async deleteAccount(id: string): Promise<void> {
        try {
            await api.delete('/account/', { params: { id } });
            this.account = this.account.filter(e => e.id !== id);
        } catch (error) {
            console.error("Error deleting account: ", error);
        }
    }
    

    getAllAccount(): IAccount[] {
        return this.account;
    }

    getAccountById(id: string): IAccount | undefined {
        return this.account.find(e => e.id === id);
    }
}