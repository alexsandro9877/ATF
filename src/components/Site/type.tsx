type Menu = {
    label: string;
    key: string;
  };
  
  type Card = {
    title?: string;
    description?: string;
    subDescription?: string;
    image?: string;
    status?: boolean;
    icon?: string;
  };
  
 export type IPrincipal = Card & {
    imageLogo?:string;
    buttonDescription?: string;
    buttonLink?: string;
  };
  
  type Project = Card & {
    obs: string;
    local: string[];
    footer: string[];
  };
  
  export type IServico = Card & {
    price: string;
    type: string;
    header: string;
    obs: string;
    local: string[];
    footer: string;
  };
  
 export type IAbount = Card & {

    card: Card[];
    team: Card[];
  };
  
 export type IContact = {
    title: string;
    description: string;
    subDescription: string;
    avatar: string;
    icon: string;
    link: string;
    email: string;
    phone: string[];
    local: string[];
    card: Card[];
    obs: string;
    status: boolean;
  };
  
 export type ICarousel = {
    description: string;
    image: string;
    key: number;
    link: string;
    status: boolean;
    alt: string;
  };
  
  type Team = {
    name: string;
    image: string;
    title: string;
    obs: string;
  };
  
  type AppData = {
    menu: Menu[];
    principal: IPrincipal[];
    project: Project[];
    servico: IServico[];
    abount: IAbount[];
    contact: IContact[];
    carousel: ICarousel[];
    team: Team[];
  };
  
 export const dataWebSite: AppData = {
    menu: [
      { label: "principal", key: "/principal" },
      { label: "project", key: "/project" },
      { label: "servico", key: "/servico" },
      { label: "abount", key: "/abount" },
      { label: "contact", key: "/contact" },
      { label: "carousel", key: "/carousel" },
      { label: "team", key: "/team" },
    ],
    principal: [
      {
        title: "Projetos Recentes",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi istaprobare, quae sunt a te dicta? Refert tamen, quo modo.",
        imageLogo:"https://i.pinimg.com/736x/6e/8a/fd/6e8afd1bf5993ae1f2631e2909b86cf7.jpg",
        subDescription: "descrição curta",
        image: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        buttonDescription: "Faça orçamento gratis",
        buttonLink: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        status: true
      },
      {
        title: "Projetos Recentes",
        description: "descrição do card",
        imageLogo:"https://blog.anhangueraferramentas.com.br/wp-content/uploads/2023/02/ferramentas-para-eletricista-1024x682.jpg",
        subDescription: "descrição curta",
        image: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        buttonDescription: "Faça orçamento gratis",
        buttonLink: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        status: true
      },
      {
        title: "Projetos Recentes",
        description: "descrição do card",
        imageLogo:"https://blog.anhangueraferramentas.com.br/wp-content/uploads/2022/01/C%C3%A1c-ch%E1%BB%89-ti%C3%AAu-CAT-trong-%C4%91o-l%C6%B0%E1%BB%9Dng-%C4%91i%E1%BB%87n.gif",
        subDescription: "descrição curta",
        image: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        buttonDescription: "Faça orçamento gratis",
        buttonLink: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        status: true
      }
    ],
    project: [
      {
        title: "Projetos Recentes",
        description: "descrição do card",
        subDescription: "descrição curta",
        image: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        obs: "teste",
        status: true,
        local: ["Rua jarama"],
        footer: ["teste"]
      },
      {
        title: "Projetos Recentes",
        description: "descrição do card",
        subDescription: "descrição curta",
        image: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        obs: "teste",
        status: true,
        local: ["Rua jarama"],
        footer: ["teste"]
      },
      {
        title: "Projetos Recentes",
        description: "descrição do card",
        subDescription: "descrição curta",
        image: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        obs: "teste",
        status: true,
        local: ["Rua jarama"],
        footer: ["teste"]
      }
    ],
    servico: [
      {
        title: "Projetos Recentes",
        description: "descrição do card",
        subDescription: "descrição curta",
        image: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        price: "R$ 120,00",
        icon: 'iluminacao',
        status: true,
        type: "instalação de quadro",
        header: "instalação de quadro",
        obs: "1",
        local: ["rua jarama"],
        footer: "teste"
      },
      {
        title: "Projetos Recentes",
        description: "descrição do card",
        subDescription: "descrição curta",
        image: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        price: "R$ 120,00",
        icon: 'instalacao',
        status: true,
        type: "instalação de quadro",
        header: "instalação de quadro",
        obs: "1",
        local: ["rua jarama"],
        footer: "teste"
      },
      {
        title: "Projetos Recentes",
        description: "descrição do card",
        subDescription: "descrição curta",
        image: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        price: "R$ 120,00",
        icon: 'instalacao',
        status: true,
        type: "instalação de quadro",
        header: "instalação de quadro",
        obs: "1",
        local: ["rua jarama"],
        footer: "teste"
      },
      {
        title: "Projetos Recentes",
        description: "descrição do card",
        subDescription: "descrição curta",
        image: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        price: "R$ 120,00",
        icon: 'instalacao',
        status: true,
        type: "instalação de quadro",
        header: "instalação de quadro",
        obs: "1",
        local: ["rua jarama"],
        footer: "teste"
      },
      {
        title: "Projetos Recentes",
        description: "descrição do card",
        subDescription: "descrição curta",
        image: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        price: "R$ 120,00",
        icon: 'instalacao',
        status: true,
        type: "instalação de quadro",
        header: "instalação de quadro",
        obs: "1",
        local: ["rua jarama"],
        footer: "teste"
      },
      {
        title: "Projetos Recentes",
        description: "descrição do card",
        subDescription: "descrição curta",
        image: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        price: "R$ 120,00",
        icon: 'instalacao',
        status: true,
        type: "instalação de quadro",
        header: "instalação de quadro",
        obs: "1",
        local: ["rua jarama"],
        footer: "teste"
      }
    ],
    abount: [
      {
        
        title: "Sobre nós",
        description: "Tratamos cada projeto com o respeito que ele merece e não paramos até que você esteja satisfeito.",
        subDescription: "descrição curta",
        image: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        status: true,
        card: [{
          title: 'Clientes atendidos',
          description: '15K',
          image: '',
          status: true,
          subDescription: '',
          icon: "localizacao",
        },
        {
          title: 'Clientes atendidos',
          description: '15K',
          image: '',
          status: true,
          subDescription: '',
          icon: "localizacao",
        },
        {
          title: 'Clientes atendidos',
          description: '15K',
          image: '',
          status: true,
          subDescription: '',
          icon: "localizacao",
        },
        {
          title: 'Clientes atendidos',
          description: '15K',
          image: '',
          status: true,
          subDescription: '',
          icon: "localizacao",
        }],
        team:[
          {
          title: 'Alex Sandro Alves de Lima',
          description: 'Eletricista',
          image: "https://thumbs.dreamstime.com/b/%C3%ADcone-do-usu%C3%A1rio-do-vetor-7337510.jpg",
          status: true,
          subDescription: '',
          icon: "localizacao",
        },
        {
          title: 'Alex Sandro Alves de Lima',
          description: 'Eletricista',
          image: "https://thumbs.dreamstime.com/b/%C3%ADcone-do-usu%C3%A1rio-do-vetor-7337510.jpg",
          status: true,
          subDescription: '',
          icon: "localizacao",
        },
      ]
        
      }
    ],
    contact: [
      {
        title: "CONTATO",
        description: "",
        subDescription: "descrição curta",
        avatar: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        icon: "<icon/>",
        link: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        email: "teste@teste.com",
        phone: ["11 9 8100-7578", ""],
        local: ["https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8698.510463902505!2d-46.90434117571634!3d-23.558631902795653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf06d3648f4e27%3A0x7b956e254bada23e!2sR.%20Jarama%2C%20101%20-%20Jardim%20Sao%20Joao%2C%20Jandira%20-%20SP%2C%2006634-020!5e0!3m2!1spt-BR!2sbr!4v1724786413815!5m2!1spt-BR!2sbr", ""],
        obs: "",
        status: true,
        card: [{
          title: 'LOCALIZAÇÃO',
          description: 'Rua jarama 101, Jandira - SP, BR 06634-000. /n Atendemos na região de Osasco, Itapevi, Perus.',
          image: '',
          status: true,
          subDescription: '',
          icon: "localizacao",
        },{
          title: 'PRINCIPAIS SERVIÇOS',
          description: 'Instalação de quadros./n Montagem de cameras IP./n Intalação tomadas./n lampadas chuveiro etc.',
          image: '',
          status: true,
          subDescription: '',
          icon: "informacao",
        },
        {
          title: 'Telefone',
          description: '(11) 9 8100-7578',
          image: '',
          status: true,
          subDescription: '',
          icon: "telefone",
        }]
      },
      
    ],
    carousel: [
      {
        description: "logo principal",
        image: "https://omsengenharia.com.br/wp-content/uploads/2023/06/EMPRESA-DE-ENGENHARIA-CIVIL-EM-CURITIBA-2-1200x600.jpg",
        key: 1,
        link: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        status: true,
        alt: "Logo inicial"
      },
      {
        description: "logo principal2",
        image: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        key: 2,
        link: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        status: true,
        alt: "Logo inicial"
      },
      // {
      //   description: "logo principal3",
      //   image: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
      //   key: 3,
      //   link: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
      //   status: true,
      //   alt: "Logo inicial"
      // },
      // {
      //   description: "logo principal4",
      //   image: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
      //   key: 4,
      //   link: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
      //   status: true,
      //   alt: "Logo inicial"
      // }
    ],
    team: [
      {
        name: "Alex Sandro",
        image: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        title: "Eletriscista",
        obs: "campo de obs"
      }
    ]
  };
  