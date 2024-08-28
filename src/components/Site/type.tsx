type Menu = {
    label: string;
    key: string;
  };
  
  type Card = {
    title: string;
    description: string;
    subDescription: string;
    image: string[];
    status: boolean;
  };
  
  type Principal = Card & {
    imageLogo:string;
    buttonDescription: string;
    buttonLink: string;
  };
  
  type Project = Card & {
    obs: string;
    local: string[];
    footer: string[];
  };
  
  type Servico = Card & {
    price: string;
    type: string;
    header: string;
    obs: string;
    local: string[];
    footer: string;
  };
  
  type Abount = Card & {
    titleAbountDetail: string;
    descriptionAbountDetail: string;
    subDescriptionAbountDetail: string;
    imageAbountDetail: string[];
    hours: string;
    client: string;
    projects: string;
  };
  
  type Contact = {
    title: string;
    description: string;
    subDescription: string;
    avatar: string;
    icon: string;
    link: string;
    email: string;
    phone: string[];
    local: string[];
    obs: string;
    status: boolean;
  };
  
  type Carousel = {
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
    principal: Principal[];
    project: Project[];
    servico: Servico[];
    abount: Abount[];
    contact: Contact[];
    carousel: Carousel[];
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
        description: "descrição do card",
        imageLogo:"https://i.pinimg.com/736x/6e/8a/fd/6e8afd1bf5993ae1f2631e2909b86cf7.jpg",
        subDescription: "descrição curta",
        image: ["https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg"],
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
        image: ["https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg"],
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
        image: ["https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg"],
        price: "R$ 120,00",
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
        title: "Projetos Recentes",
        description: "descrição do card",
        subDescription: "descrição curta",
        image: ["https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg"],
        titleAbountDetail: "",
        descriptionAbountDetail: "descrição do card",
        subDescriptionAbountDetail: "descrição curta",
        imageAbountDetail: ["https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg"],
        hours: "300hs",
        client: "150K",
        projects: "30M",
        status: true
      }
    ],
    contact: [
      {
        title: "Projetos Recentes",
        description: "descrição do card",
        subDescription: "descrição curta",
        avatar: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        icon: "<icon/>",
        link: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
        email: "teste@teste.com",
        phone: ["11 9 8100-7578", ""],
        local: ["https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8698.510463902505!2d-46.90434117571634!3d-23.558631902795653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf06d3648f4e27%3A0x7b956e254bada23e!2sR.%20Jarama%2C%20101%20-%20Jardim%20Sao%20Joao%2C%20Jandira%20-%20SP%2C%2006634-020!5e0!3m2!1spt-BR!2sbr!4v1724786413815!5m2!1spt-BR!2sbr", ""],
        obs: "",
        status: true
      }
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
      // {
      //   description: "logo principal2",
      //   image: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
      //   key: 2,
      //   link: "https://cdn.pixabay.com/photo/2017/09/19/22/10/tool-2766835_640.jpg",
      //   status: true,
      //   alt: "Logo inicial"
      // },
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
  