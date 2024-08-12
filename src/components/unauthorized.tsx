import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <Result
        status="403"
        title="403"
        subTitle="Desculpe, você não tem permissão para acessar esta página."
        extra={
          <Button type="primary" onClick={handleBackToLogin}>
            Voltar para dashboard.
          </Button>
        }
      />
    </div>
  );
};

export default Unauthorized;
