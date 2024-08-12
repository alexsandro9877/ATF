import {create} from 'zustand';
import { ICustomer,CCustomer } from '../modules/custumer.entity';

const cCustomer = new CCustomer(); 

interface customerState {
    customer: ICustomer[];
    fetchCustomer: () => Promise<void>;
    addCustomer: (user: ICustomer) => Promise<void>;
    deleteCustomer: (id: string) => Promise<void>;
    editeCustomer: ( newCustomer: ICustomer) => Promise<void>;
}

const customerStore = create<customerState>((set) => ({
    customer: [],
    fetchCustomer: async () => {
        await cCustomer.fetchAllCustomer();
        set({ customer: cCustomer.getAllCustomer() });
    },
    addCustomer: async (customer) => {
        await cCustomer.addCustomer(customer);
        set({ customer: cCustomer.getAllCustomer() });
    },
    deleteCustomer: async (id) => {
        await cCustomer.deleteCustomer(id);
        set({ customer: cCustomer.getAllCustomer() });
    },
    editeCustomer: async ( newCustomer) => {
        await cCustomer.editCustomer( newCustomer);
        set({ customer: cCustomer.getAllCustomer() });
    },
}));

export default customerStore;
