import HeaderEcommerce from 'components/Ecommerce/HeaderEcommerce/HeaderEcommerce'
import MyPersonalData from 'components/Ecommerce/MyPersonalData/MyPersonalData'
import { Row } from 'react-bootstrap'

export default function PersonalData() {
    return (
        <div>
            <HeaderEcommerce />
            <Row><label className="page-name">MIS DATOS PERSONALES</label></Row>
            <MyPersonalData />
        </div>
    )
}
