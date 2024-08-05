

import { Modal } from 'antd';
import './DynamicModal.css'; // Importando o arquivo de estilos

interface DynamicModalProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    content: React.ReactNode;
    onOk?:()=> void;
    confirmLoading? : boolean;
}

const DynamicModal: React.FC<DynamicModalProps> = ({ visible, onClose,onOk, title, content,confirmLoading }) => {
    return (
        <Modal
            confirmLoading ={confirmLoading}
            onOk={onOk}
            title={title}
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
