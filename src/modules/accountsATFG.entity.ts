export interface IAccount {
  key?: number | undefined;
  id?: number;
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
  private nextId: number = 1;
  private nextKey: number = 1;

  constructor() {
    this.resumo = [{entrada: 0,  saida: 0, total : 0}]
    this.account = [];
  }

  public addAccount(item: Omit<IAccount, "id">): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
    const newItem = { ...item, id: this.nextId++, key: this.nextKey++ ,parc_pag: ((item.parc_ate - item.parc_de) * item.valor) };
    this.account = [...this.account, newItem]; 
  }

  public addAccountClone(item: Omit<IAccount, "id">[]): void {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      
    item.map((e)=>{
      const newItem = { ...e, id: this.nextId++, key: this.nextKey++ }
      this.account = [...this.account, newItem]; 
    })
    console.log(item)
}

  public deleteAccount(id: number): void {
    this.account = this.account.filter((e) => e.id !== id);
  }

  public updateAccount(item: IAccount): void {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      const newAttAccount = {...item,id: item.id, parc_pag:  ((item.parc_ate - item.parc_de) * item.valor) }
      console.log(newAttAccount)
      this.account = this.account.filter((e) => e.id !== item.id);
      this.account = [...this.account, newAttAccount]; 
  }
 
  public updateAccountPag(id: number): void {
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

  public getAccount(): IAccount[] {
    return [...this.account];
  }
  public getResumo(): IResumo[] {
    return [...this.resumo];
  }
}

export const cAccount = new CAccount();
