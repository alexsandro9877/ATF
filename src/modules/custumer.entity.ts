

import {api} from '../axios/axios'


export interface ICustomerCreat {
    name: string;
    email: string;
    password: string;
    acesso: string[];
    token: string;
    imagem: string[];
    partner: string[];
}

export interface ICustomer {
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


export class CCustomer {
    public customer: ICustomer[];
    public lastId: number;
    constructor() {
        this.customer = [];
        this.lastId = 0;
    }


    async fetchAllCustomer(): Promise<void> {
        try {
            const response = await api.get(`/customers`);
            this.customer = response.data;
        } catch (error) {
            console.error("Error fetching customer: ", error);
        }
    }

    async addCustomer(customer: ICustomer): Promise<void> {
        try {
            
            const response = await api.post(`/customer`, customer);
            const newCustomer = { ...response.data};
            this.customer.push(newCustomer);
        } catch (error) {
            console.error("Error adding customer: ", error);
        }
    }

    async editCustomer(newCustomer: ICustomer): Promise<void> {
        try {
            const response  = await api.put(`/customer`, newCustomer);        
            const index = this.customer.findIndex(id => id === id);
            if (index !== -1) {
                this.customer[index] = { ...response.data };
            }
        } catch (error) {
            console.error("Error editar customer: ", error);
        }
    }

    async deleteCustomer(id: string): Promise<void> {
        try {
            // Envia o ID do produto como um parâmetro de consulta
            await api.delete('/customer/', { params: { id } });
            this.customer = this.customer.filter(e => e.id !== id);
        } catch (error) {
            console.error("Error deleting customer: ", error);
        }
    }
    

    getAllCustomer(): ICustomer[] {
        return this.customer;
    }

    getCustomerById(id: string): ICustomer | undefined {
        return this.customer.find(e => e.id === id);
    }
}