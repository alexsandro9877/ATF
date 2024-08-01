import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';


interface PrivateRouteProps {
  children: ReactNode;
  role?: string; 
  tela?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, tela, role }) => {
  // const { statusAutenticacao,userAut } = AuthUserStore();
  // if (!statusAutenticacao) {
  //   return <Navigate to="/login" />;
  // }

  // if (tela && !userAut[0].visibleRoutes.includes(tela)) {
  //   return <Navigate to="/unauthorized" />;
  // }
  // if (role && !userAut[0].roles.includes(role)) {
  //   return <Navigate to="/unauthorized" />;
  // }

  return <>{children}</>;
};

export default PrivateRoute;
