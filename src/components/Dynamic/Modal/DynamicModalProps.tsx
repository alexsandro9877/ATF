

import { Modal } from 'antd';
import './DynamicModal.css'; // Importando o arquivo de estilos

interface DynamicModalProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
    onOk?:()=> void;
    confirmLoading? : boolean;
    onCancel?: ()=>void;
}

const DynamicModal: React.FC<DynamicModalProps> = ({ visible, onClose,onOk, title, icon, onCancel, content,confirmLoading }) => {
    return (
        <Modal
            width={'35%'}
            centered
            destroyOnClose
            onClose={onClose}
            confirmLoading ={confirmLoading}
            onOk={onOk}
            title={title}
            closeIcon={icon}
            visible={visible}
            onCancel={onCancel}
            footer={null}
             className="dynamic-modal" 
             okText="Sim"
             cancelText="Não"
        >
            {content}
        </Modal>
    );
};

export default DynamicModal;
