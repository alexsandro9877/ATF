import {create} from 'zustand';
import {CAccount,IAccount,CreateAccounts} from '../modules/account.entity'

const cAccount = new CAccount(); 

interface AccountState {
    account: IAccount[];
    fetchAccount: () => Promise<void>;
    addAccount: (account: CreateAccounts) => Promise<void>;
    deleteAccount: (id: string) => Promise<void>;
    editeAccount: (newAccount: CreateAccounts) => Promise<void>;
}

const accountStore = create<AccountState>((set) => ({
    account: [],
    fetchAccount: async () => {
        await cAccount.fetchAllAccount();
        set({ account: cAccount.getAllAccount() });
    },
    addAccount: async (account) => {
        await cAccount.addAccount(account);
        set({ account: cAccount.getAllAccount() });
    },
    deleteAccount: async (id) => {
        await cAccount.deleteAccount(id);
        set({ account: cAccount.getAllAccount() });
    },
    editeAccount: async ( newAccount) => {
        await cAccount.editAccount( newAccount);
        set({ account: cAccount.getAllAccount() });
    },
}));

export default accountStore;
