export interface CreateSitesProps {
    id?: string;
    company_name: string;
    name: string;
    email: string;
    phone: string;
    routes: string[];
    link_imagem: string[];
    page: { title: string; end_link_imagem: string[]; description: string; type: string[]; obs: string[]; comment: string[]; like: number; status: boolean; }[];
    footerDescriptin: string;
    headerDescriptin: string;
}

interface Endereco {
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    latitude: number;
    longitude: number;
  }
  
  interface Rede {
    id: number;
    nome: string;
  }
  
  interface Loja {
    id: number;
    storeId: string;
    nome: string;
    cnpj: string;
    status: string;
    endereco: Endereco;
    rede: Rede;
    atendimento: any[];
  }
  
  interface Cliente {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    rg: string;
    tipo: string;
    publicidadeEmail: boolean;
    publicidadeSms: boolean;
    dataNascimento: string;
    genero: string;
    telefoneCelular: string;
  }
  
  interface Item {
    id: number;
    uniqueId: string;
    index: number;
    codigo: string;
    codigoLoja: string;
    pesoVariavel: boolean;
    codigoBarra: string;
    plu: string;
    produto: string;
    quantidade: number;
    quantidade3: number;
    valor: number;
    valorTotal: number;
    indisponivel: boolean;
    desistencia: boolean;
    valorOriginal: number;
    pesoVariavelVendidoPorUnidade: boolean;
  }
  
  interface Pagamento {
    id: number;
    nome: string;
    valor: number;
    valorCorrigido?: number;
    tipo: string;
  }
  
  export interface IPurchaseDetail {
    idLoja: number;
    idCliente: number;
    idPedido: string;
    codigo: string;
    codigoLoja: string;
    data: string;
    hora: string;
    dataHora: string;
    agendamentoDataInicio: string;
    agendamentoHoraInicio: string;
    agendamentoDataFim: string;
    agendamentoHoraFim: string;
    entrega: boolean;
    retirada: boolean;
    cpfNaNota: boolean;
    status: string;
    tipo: string;
    statusDescricao: string;
    pessoaAutorizadaRecebimento: string;
    quantidadeItemUnico: number;
    valorMercado: number;
    valorConveniencia: number;
    quantidadeSacolaResfriada: number;
    quantidadeSacolaSeca: number;
    valorEntrega: number;
    valorRetirada: number;
    valorTroco: number;
    valorDesconto: number;
    valorTotal: number;
    valorCorrigido?: number;
    opcaoTroca: string;
    plataforma: string;
    loja: Loja;
    cliente: Cliente;
    items: Item[];
    pagamentos: Pagamento[];
    beneficios: any[];
    beneficiosEntrega: any;
  }
  