
import {  Result } from 'antd';
const Error404 = () => {
    // https://ant.design/components/result
    return (
        <Result
            status="404"
            title="404"
            subTitle="Desculpe, a página que você visitou não existe."
        // extra={<Button type="primary">Back Home</Button>}
        />
    )
}

export default Error404
