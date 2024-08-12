

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
}

const DynamicModal: React.FC<DynamicModalProps> = ({ visible, onClose,onOk, title, icon, content,confirmLoading }) => {
    return (
        <Modal
            width={'35%'}
            centered
            destroyOnClose
            confirmLoading ={confirmLoading}
            onOk={onOk}
            title={title}
            //closeIcon={icon}
            visible={visible}
            onCancel={onClose}
            footer={null}
            className="dynamic-modal" 
        >
            {content}
        </Modal>
    );
};

export default DynamicModal;
