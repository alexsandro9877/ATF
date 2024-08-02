import React from 'react';
import { Card, Button, Tooltip, Space } from 'antd';
//import { EllipsisOutlined } from '@ant-design/icons';
// import './DynamicCard.css';

interface DynamicCardProps {
    title: React.ReactNode;
    content: React.ReactNode;
    actionsButton?: { title: string; icon: React.ReactNode; onClick: () => void; disabled?: boolean }[];
    extra?: React.ReactNode;
    style?: React.CSSProperties;
}

const DynamicCard: React.FC<DynamicCardProps> = ({ title, content, actionsButton = [], extra, style }) => (
    <Card
    
        title={title}
        extra={extra}
        style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', ...style }}
    >
        {content}
        {actionsButton.length > 0 && (
            <Space style={{ marginTop: '16px' }}>
                {actionsButton.map((action, index) => (
                    <Tooltip key={index} title={action.title}>
                        <Button
                            type="primary"
                            icon={action.icon}
                            onClick={action.onClick}
                            disabled={action.disabled}
                            style={{ minWidth: 'fit-content' }}
                            className="button-icon"
                        >
                            {action.title}
                        </Button>
                    </Tooltip>
                ))}
            </Space>
        )}
    </Card>
);

export default DynamicCard;
