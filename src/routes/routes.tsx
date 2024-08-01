
import { createBrowserRouter } from 'react-router-dom';
import Error404 from '../components/site/error404';
import PrivateRoute from './privateRoutes';
import LoginSection from '../components/site/LoginSection';
//import CarouselSection from '../components/site/CarouselSection';
//import Site from '../components/site/Site';
import AppManut from '../components/manut/app';
import FeedbackSectionManut from '../components/manut/FeedbackSection';



const router = createBrowserRouter([
  {path: "/",    element: (<AppManut />),//Elemento principal
    errorElement: <Error404 />,
    //Rotas privadas
    children: [
      //Principal
      {        path: "FeedbackSectionManut", element: (<PrivateRoute tela='/FeedbackSectionManut' ><FeedbackSectionManut /></PrivateRoute>),},
         
    ],
    }, //Rota publica
    { path: 'login', element: <LoginSection /> },
    { path: "*",    element: <Error404 />,}
]);



export default router;
