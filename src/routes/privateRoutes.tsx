import React, { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthUserStore from '../store/auth.store';

interface PrivateRouteProps {
  children: ReactNode;
  role?: string; 
  tela?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, tela, role }) => {
  const { statusAutenticacao, userAut,fetchUser } = AuthUserStore();

  useEffect(() => {
    if (!statusAutenticacao) {
      fetchUser(); // Verifica se as informações do usuário estão carregadas
    }
  }, [statusAutenticacao, fetchUser]);

  const getAuthToken = localStorage.getItem('refreshToken');// SE NAO TOKEN SAI 

  if (!statusAutenticacao || !getAuthToken) {
    return <Navigate to="/login" />;
  }

  if (tela && !userAut[0]?.visibleRoutes.includes(tela)) {
    return <Navigate to="/unauthorized" />;
  }
  
  if (role && !userAut[0]?.roles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
