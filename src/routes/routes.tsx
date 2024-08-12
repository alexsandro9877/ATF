
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './privateRoutes';
// import LoginSection from '../components/site/LoginSection';
//import CarouselSection from '../components/site/CarouselSection';
//import Site from '../components/site/Site';
import Error404 from '../components/error404';
// import Principal from '../components/Dynamic/principal';
import Unauthorized from '../components/unauthorized';
import Login from '../components/Login/login';
import App from '../components/App';

const router = createBrowserRouter([
  {path: "/",    element: (<App />),//Elemento principal
    errorElement: <Error404 />,
    //Rotas privadas
    children: [
      //Principal
      // {        path: "FeedbackSectionManut", element: (<PrivateRoute tela='/FeedbackSectionManut' ><FeedbackSectionManut /></PrivateRoute>),},
      // {        path: "CarrosselForm", element: (<PrivateRoute tela='/CarrosselForm' ><CarrosselForm /></PrivateRoute>),},
      // {        path: "ServicoForm", element: (<PrivateRoute tela='/ServicoForm' ><ServicoForm /></PrivateRoute>),},
      // {        path: "ServicoForm", element: (<PrivateRoute tela='/ServicoForm' ><ServicoForm /></PrivateRoute>),},
      // {        path: "FuncionalidadesForm", element: (<PrivateRoute tela='/FuncionalidadesForm' ><FuncionalidadesForm /></PrivateRoute>),},
      // {        path: "FeedbackSection", element: (<PrivateRoute tela='/FeedbackSection' ><FeedbackSection /></PrivateRoute>),},
      // {        path: "site", element: (<PrivateRoute tela='/site' ><Site /></PrivateRoute>),},
        //Principal
        {        path: "settings",           element: (          <PrivateRoute tela='/settings' role='admin'><>sd</>          </PrivateRoute>),},
        //Cliente
        {        path: "customer",           element: (          <PrivateRoute tela='/customer' >            <>sd</>           </PrivateRoute>),},
        //Conta
        {        path: "account",            element: (          <PrivateRoute tela='/account' >             <>sd</>            </PrivateRoute>),},
        //Parceria
        // {        path: "partnership",        element: (          <PrivateRoute tela='/partnership' >           <PedidoIfood/>               </PrivateRoute>),},
        //  //Teste
        // {        path: "teste",              element: (          <PrivateRoute tela='/teste' >              <CreateSites/>             </PrivateRoute>),},
        // // Para teste
        {        path: "userMeli",           element: (          <PrivateRoute tela='/userMeli' >          <></>     </PrivateRoute>),},
        {        path: "*",                  element:            <Error404 />,      },    
        {        path: "unauthorized",       element:            <Unauthorized />,      },   
         
    ],
    }, //Rota publica
    { path: 'login', element: <Login /> },
    { path: "*",    element: <Error404 />,}
]);



export default router;
