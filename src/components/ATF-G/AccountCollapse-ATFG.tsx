import React from 'react';
import { Collapse, Space } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

interface ICollapseProps {
    visible?: boolean;
    onClose?: () => void;
    title?: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
    onOk?: () => void;
    confirmLoading?: boolean;
    onCancel?: () => void;
}

const AccountCollapse: React.FC<ICollapseProps> = ({ content,  title }) => (
  <Space direction="vertical" style={{ width: '100%', margin: '5 px', padding: 5 }} > 
    <Collapse
      collapsible="icon"
      defaultActiveKey={['1']}
      expandIconPosition={'end'}
      size="small"
      style={{ width: '100%' }}  
      items={[
        {
          key: '1',
          label: `${title}`,
          children: <p>{content}</p>,
          extra: <SettingOutlined style={{ margin: '0 8px' }} />,
        },
      ]}
    />
  </Space>
);

export default AccountCollapse;
