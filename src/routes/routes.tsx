
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
import AccountPage from '../components/Account/accountPage';
import CustomerPage from '../components/Customer/customerPage';
import UserPage from '../components/User/UserPage';
import SettingsPage from '../components/Settings/settingsPage';
import AgendaPage from '../components/App/agenda';
import UserMeli from '../components/Meli';

const router = createBrowserRouter([
  {path: "/",    element: (<PrivateRoute><App /></PrivateRoute>),//Elemento principal
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
        // {        path: "settings",           element: (          <PrivateRoute tela='/settings' role='admin'><>sd</>          </PrivateRoute>),},
        
        //Cliente
        {        path: "userMeli",           element: (          <PrivateRoute tela='/userMeli' >            <UserMeli/>           </PrivateRoute>),},
        {        path: "customer",           element: (          <PrivateRoute tela='/customer' >            <CustomerPage/>           </PrivateRoute>),},
        //Conta
        {        path: "account",            element: (          <PrivateRoute tela='/account' >            <AccountPage/>            </PrivateRoute>),},
        //Parceria
         {        path: "partnership",        element: (          <PrivateRoute tela='/partnership' >           <AgendaPage/>               </PrivateRoute>),},
        //  //Teste
        {        path: "/settings",         element: (          <PrivateRoute tela='/settings' >              <SettingsPage/>             </PrivateRoute>),},
        // // Para teste
        {        path: "user",               element: (          <PrivateRoute tela='/user' >         <UserPage/>     </PrivateRoute>),},
        {        path: "*",                  element:            <Error404 />,      },    
        {        path: "unauthorized",       element:            <Unauthorized />,      },   
         
    ],
    }, //Rota publica
    { path: 'login', element: <Login /> },
    { path: "*",    element: <Error404 />,}
]);



export default router;
