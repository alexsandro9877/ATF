

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
            
            centered
            //destroyOnClose
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

// const handleFinish = (values: any) => {
//     // if (activeTab === "painel") {
//     //   const newPainel: Omit<IPainel, "id"> = {
//     //     descricao: values.descricao,
//     //     valor: values.valor,
//     //     operacao: values.operacao,
//     //     data_pgt: values.data_pgt.format("DD/MM/YYYY"),
//     //   };
//       // cGastos.addPainel(newPainel); // Adiciona ao painel com ID gerado automaticamente
//     } else if (activeTab === "cartao") {
//       const newCartao: Omit<ICartao, "id"> = {
//         date: values.date.format("DD/MM/YYYY"),
//         referencia_mes: values.referencia_mes,
//         valor: values.valor,
//         operacao: values.operacao,
//         descricao: values.descricao,
//         classe: values.classe,
//         centro_custo: values.centro_custo,
//         desconto: values.desconto,
//         parc_de: values.parc_de,
//         parc_ate: values.parc_ate,
//         parc_pag: values.parc_pag,
//       };
//       cGastos.addCartao(newCartao);
//     } else if (activeTab === "conjuntas") {
//       const newConjunta: Omit<IConjuntas, "id"> = {
//         descricao: values.descricao,
//         valor: values.valor,
//       };
//       cGastos.addConjunta(newConjunta);
//     }

//     form.resetFields();
//     message.success("Registro adicionado com sucesso!");
//   };