
export interface IPainel {
    id?: number;
    descricao: string;
    valor: number;
    operacao: string;
    data_pgt: string;
  }
  
  export interface ICartao {
    id?: number;
    date: string;
    referencia_mes: number;
    valor: number;
    operacao: string;
    descricao: string;
    classe: string;
    centro_custo: string;
    desconto: string;
    parc_de: number;
    parc_ate: number;
    parc_pag: number;
  }
  
  export interface IConjuntas {
    id?: number;
    descricao: string;
    valor: number;
  }
  
  export interface IResumo {
    entrada: number;
    saida: number;
    falta: number;
  }
  
  export interface IGastos {
    painel: IPainel[];
    cartao: ICartao[];
    conjuntas: IConjuntas[];
    resumo: IResumo;
  }
  
  export const initialState: IGastos = {
    painel: [],
    cartao: [],
    conjuntas: [],
    resumo: {
      entrada: 0,
      saida: 0,
      falta: 0,
    },
  };


 export class CGastos {
      public gastos: IGastos[]=[];
      public painel: IPainel[] = [];
      public cartao: ICartao[] = [];
      public conjuntas: IConjuntas[] = [];
      public resumo: IResumo;
      private nextId: number = 1;  
  
    constructor() {
      this.painel = [];
      this.cartao = [];
      this.conjuntas = [];
      this.resumo = {
        entrada: 0,
        saida: 0,
        falta: 0,
      };
    }
  
   
    public addPainel(item: Omit<IPainel, 'id'>): void {
      const newItem = { ...item, id: this.nextId++ };
      this.painel = [...this.painel, newItem];  // Ratribuir o array para disparar reatividade
      this.updateResumo();
    }
    public addCartao(item: Omit<ICartao, 'id'>): void {
      const newItem = { ...item, id: this.nextId++ };
      this.cartao = [...this.cartao, newItem];  
      this.updateResumo();
    }
   
    public addConjunta(item: Omit<IConjuntas, 'id'>): void {
      const newItem = { ...item, id: this.nextId++ };
      this.conjuntas = [...this.conjuntas, newItem];  
    }
    
    
    public deletePainel(id: number): void {
      this.painel = this.painel.filter((e) => e.id !== id);  
      this.updateResumo();
    }
    
    public deleteCartao(id: number): void {
      this.cartao = this.cartao.filter((e) => e.id !== id); 
      this.updateResumo();
    }

    public deleteConjunta(id: number): void {
      this.conjuntas = this.conjuntas.filter((e) => e.id !== id);  
      this.updateResumo();
    }
    
    
    
    private updateResumo(): void {
      let entrada = 0;
      let saida = 0;
  
      this.painel.forEach(item => {
        if (item.operacao === 'entrada') {
          entrada += item.valor;
        } else if (item.operacao === 'saida') {
          saida += item.valor;
        }
      });
  

      this.cartao.forEach(item => {
        if (item.operacao === 'entrada') {
          entrada += item.valor;
        } else if (item.operacao === 'saida') {
          saida += item.valor;
        }
      });
  
      this.resumo.entrada = entrada;
      this.resumo.saida = saida;
      this.resumo.falta = entrada - saida;
      this.gastos = [{
        painel: [...this.painel],
        cartao: [...this.cartao],
        conjuntas: [...this.conjuntas],
        resumo: {...this.resumo}
      }]
    }
  
   
    public getResumo(): IResumo {
      return this.resumo;
    }
  
    
    public getPainel(): IPainel[] {
      return this.painel;
    }

    public getCartao(): ICartao[] {
      return this.cartao;
    }

    public getConjuntas(): IConjuntas[] {
      return this.conjuntas;
    }
    public getGastos(): IGastos[] {
      this.gastos = [{
        painel: [...this.painel],
        cartao: [...this.cartao],
        conjuntas: [...this.conjuntas],
        resumo: {...this.resumo}
      }]
      return this.gastos;
    }
  }
  
  export const cGastos = new CGastos;    
  