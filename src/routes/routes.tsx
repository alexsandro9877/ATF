
import { createBrowserRouter } from 'react-router-dom';
import Error404 from '../components/site/error404';
import PrivateRoute from './privateRoutes';
import LoginSection from '../components/site/LoginSection';
//import CarouselSection from '../components/site/CarouselSection';
//import Site from '../components/site/Site';
import AppManut from '../components/manut/app';
import FeedbackSectionManut from '../components/manut/FeedbackSection';
import FeedbackSection from '../components/site/FeedbackSection';
import Site from '../components/site/Site';
// import FuncionalidadesForm from '../components/manut/FuncionalidadesForm';
// import ServicoForm from '../components/manut/ServicoForm';
import CarrosselForm from '../components/manut/CarrosselForm';



const router = createBrowserRouter([
  {path: "/",    element: (<AppManut />),//Elemento principal
    errorElement: <Error404 />,
    //Rotas privadas
    children: [
      //Principal
      {        path: "FeedbackSectionManut", element: (<PrivateRoute tela='/FeedbackSectionManut' ><FeedbackSectionManut /></PrivateRoute>),},
      {        path: "CarrosselForm", element: (<PrivateRoute tela='/CarrosselForm' ><CarrosselForm /></PrivateRoute>),},
      {        path: "ServicoForm", element: (<PrivateRoute tela='/ServicoForm' ><></></PrivateRoute>),},
      {        path: "FuncionalidadesForm", element: (<PrivateRoute tela='/FuncionalidadesForm' ><></></PrivateRoute>),},
      {        path: "FeedbackSection", element: (<PrivateRoute tela='/FeedbackSection' ><FeedbackSection /></PrivateRoute>),},
      {        path: "site", element: (<PrivateRoute tela='/site' ><Site /></PrivateRoute>),},
         
    ],
    }, //Rota publica
    { path: 'login', element: <LoginSection /> },
    { path: "*",    element: <Error404 />,}
]);



export default router;
