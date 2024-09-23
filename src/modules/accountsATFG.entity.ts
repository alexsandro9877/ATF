import { action, makeObservable, observable } from 'mobx';
import {api} from '../axios/axios'
export interface IAccount {
  key?: number | undefined;
  id?: string;
  descricao: string;
  valor: number;
  operacao: number; 
  centro_de_custo?: string;
  type?: string;
  status?: boolean ;
  classe?: string;
  parc_de?: number;
  parc_ate?: number;
  parc_pag?: number;
  data_pag: string;
  data_mes: string;
  observacao?:string;
}

export interface IResumo {
  entrada: number;
  saida: number;
  total: number;
}

export class CAccount {
  public resumo: IResumo[];
  public account: IAccount[] = [];


  constructor() {
    this.resumo = [{entrada: 0,  saida: 0, total : 0}]
    this.account = []
    makeObservable(this, {
      account :observable,
      fetchAllAccount: action,
      addAccount: action
  });
  }


  async fetchAllAccount(): Promise<void> {
    try {
        const response = await api.get(`/financeiro/all`);
        this.account = response.data;
    } catch (error) {
        this.account = [];
        console.error("Error fetching account: ", error);
    }
}

async addAccount(item: Omit<IAccount, "id">): Promise<void> {
  try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      const response = await api.post(`/financeiro`, { ...item,parc_pag: ((item.parc_ate - item.parc_de) * item.valor) });
      const newAccount = { ...response.data};
      this.account.push(newAccount);
      this.fetchAllAccount()
  } catch (error) {
      console.error("Error adding account: ", error);
  }
}
 

  async addAccountClone(item: Omit<IAccount, "id">[]): Promise<void>{      
    item.map(async (e)=>{
      try {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      const response = await api.post(`/financeiro`, { ...e,parc_pag: ((e.parc_ate - e.parc_de) * e.valor) });
      const newAccount = { ...response.data};
      this.account.push(newAccount);
    } catch (error) {
      console.error("Error adding account: ", error);
  }
    })
    console.log(item)
}

async deleteAccount(id: string): Promise<void> {
  try {
      await api.delete('/financeiro/', { params: { id } });
      this.account = this.account.filter(e => e.id !== id);
  } catch (error) {
      console.error("Error deleting account: ", error);
  }
}

 
 
  async updateAccount(item: IAccount): Promise<void> {
    try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      const newAttAccount = {...item,id: item.id, parc_pag:  ((item.parc_ate - item.parc_de) * item.valor) }
       const response  = await api.put(`/financeiro`, newAttAccount);        
       const index = this.account.findIndex(id => id === id);
       if (index !== -1) {
           this.account[index] = { ...response.data };
       }
    } catch (error) {
        console.error("Error editar account: ", error);
    }
}


  public updateAccountPag(id: string): void {
      const conta = this.account.filter((e) => e.id === id)[0];
    if (conta && conta.classe) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      
      const newAttAccount = {...conta, parc_pag: (conta.parc_ate - conta.parc_de) * conta.valor }
      this.account = this.account.filter((e) => e.id !== id);
      this.account = [...this.account, newAttAccount]; 
    }
  }



  public getAccountTotal(data_mes: string) {

    if (this.account.length === 0) {
      return null;
    }


    let entrada = 0;
    let saida = 0;
    let total = 0;
   
    this.account.filter((e)=> e.data_mes === data_mes).forEach((item) => {
      if (item.operacao === 1) {
        entrada += item.valor;
      } else if (item.operacao === 2) {
        saida += item.valor;
      }
    });
    
    total = entrada - saida;
    
    this.resumo = [{entrada: entrada, saida: saida, total: total}] 
  
  }

  getAllAccount(): IAccount[] {
    return this.account;
}
  public getResumo(): IResumo[] {
    return [...this.resumo];
  }
}

export const cAccount = new CAccount();
