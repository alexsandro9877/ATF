import { Drawer, Button, Card, Row, Col, Avatar, Typography, Divider } from 'antd';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../modules/autentica.entity';

const { Text } = Typography;

interface IDrawer {
    open: boolean;
    onClose: () => void;
    handleLogout: () => void;
    useAut: IUser[];
}

const ProfileDrawer = ({ open, onClose, handleLogout, useAut }: IDrawer) => {
    const navigate = useNavigate();


    if (!useAut || useAut.length === 0) {
        return null; 
    }

    const { accountId, id, picture, name, roles, visibleRoutes, email,azp } = useAut[0];

    return (
        <Drawer title="Perfil" onClose={onClose} open={open} bodyStyle={{ padding: 0 }}>
            <Card bordered={false}>
                <Row gutter={16} align="middle">
                    <Col span={8} style={{ textAlign: 'center' }}>
                        <Avatar
                            style={{ border: '1px solid black' }}
                            size={100}
                            src={picture ? picture : "https://i.pinimg.com/originals/81/0f/95/810f95203a1e3f370436718ebc0598cf.jpg"}
                            alt={name || ''}
                        />
                    </Col>
                    <Col span={16}>
                        <Text strong style={{ fontSize: 18 }}>{name || ''}</Text>
                        <br />
                        <Text type="secondary">{id || ''}</Text>
                        <br />
                        <Text type="secondary">{email || ''}</Text>
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
                <Divider />
                <Row gutter={16} align="middle">
                    <Col span={8} style={{ textAlign: 'center' }}>
                        <Text strong style={{ fontSize: 18 }}>Role</Text>
                        <br />
                        <Text type="secondary">{roles ? roles.join(", ") : ''}</Text>
                        <br />
                        <Text type="secondary">{azp ? azp : ''}</Text>
                    </Col>
                    <Col span={16}>
                        <Text strong style={{ fontSize: 18 }}>Acesso</Text>
                        <br />
                        <Text type="secondary">{visibleRoutes ? visibleRoutes.join(", ") : ''}</Text>
                        <br />
                
                    </Col>
                </Row>
                <Divider/>
                <Row gutter={16} align="middle">
                  
                    <Col span={16}>
                    <Text strong style={{ fontSize: 18 }}>Cliente</Text>
                        <br />
                    <Text type="secondary">{accountId || ''}</Text>
                    <br />
                
                    </Col>
                </Row>
            </Card>
        </Drawer>
    );
};

export default ProfileDrawer;
