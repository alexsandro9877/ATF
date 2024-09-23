import { create } from "zustand";
import { CAccount, IAccount, IResumo } from "../modules/accountsATFG.entity";

const Account = new CAccount();

interface AccountState {
  resumo: IResumo[];
  account: IAccount[];
  fetchAccount: () => Promise<void>;
  addAccountClone: (account: Omit<IAccount, "id">[]) => Promise<void>;
  addAccount: (account: Omit<IAccount, "id">) => Promise<void>;
  deleteAccount: (id: number) => Promise<void>;
  getAccountTotal: (data_mes: string) => Promise<void>; 
  updateAccount: (account: IAccount) => Promise<void>;
}

const accountStore = create<AccountState>((set) => ({
  account: [],
  resumo: [],

  fetchAccount: async () => {
    set({ account: Account.getAccount() });
  },

  addAccount: async (account) => {
    await Account.addAccount(account);
    set({ account: Account.getAccount() });
  },

  deleteAccount: async (id) => {
    await Account.deleteAccount(id);
    set({ account: Account.getAccount() });
  },

  getAccountTotal: async (data_mes) => {
    await Account.getAccountTotal(data_mes);
    set({ resumo: Account.getResumo() });
  },
  updateAccount: async (account) => {
    await Account.updateAccount(account);
    set({ account: Account.getAccount() });
  },
  addAccountClone: async (account) => {
    await Account.addAccountClone(account);
    set({ account: Account.getAccount() });
  },
  

}));

export default accountStore;
