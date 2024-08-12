
import { Drawer, Button, Card, Row, Col, Avatar, Typography } from 'antd';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

interface IDrawer {
    open: boolean;
    onClose: () => void;
    handleLogout: () => void;
}

const ProfileDrawer = ({ open, onClose, handleLogout }: IDrawer) => {
    const navigate = useNavigate();

    return (
        <Drawer title="Perfil" onClose={onClose} open={open} bodyStyle={{ padding: 0 }}>
            <Card bordered={false}>
                <Row gutter={16} align="middle">
                    <Col span={8} style={{ textAlign: 'center' }}>
                        <Avatar
                            style={{border: '1px solid black'}}
                            size={100}
                            src="https://i.pinimg.com/originals/81/0f/95/810f95203a1e3f370436718ebc0598cf.jpg"
                            alt="Alex"
                        />
                    </Col>
                    <Col span={16}>
                        <Text strong style={{ fontSize: 18 }}>Alex</Text>
                        <br />
                        <Text type="secondary">Administrator</Text>
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: 20 }}>
                    <Col span={12}>
                        <Button 
                            icon={<SettingOutlined />} 
                            onClick={() => navigate('/settings')} 
                            block
                        >
                            Configurações
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button 
                            icon={<LogoutOutlined />} 
                            type="primary" 
                            danger 
                            onClick={handleLogout} 
                            block
                        >
                            Sair
                        </Button>
                    </Col>
                </Row>
            </Card>
        </Drawer>
    );
};

export default ProfileDrawer;
