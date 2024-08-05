
import { Layout } from 'antd';
import {  Outlet } from 'react-router-dom';

function App() {
  return (
    <Layout className="layout">
      <Outlet />
    </Layout>
  );
}

export default App;
