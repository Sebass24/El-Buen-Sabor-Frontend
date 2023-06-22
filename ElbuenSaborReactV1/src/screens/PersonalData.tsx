import HeaderEcommerce from 'components/Ecommerce/HeaderEcommerce/HeaderEcommerce'
import NavigationBar from 'components/NavBar/Navbar'
import MyPersonalData from 'components/Users/UsersPersonalData/MyPersonalData/MyPersonalData'
import { Row } from 'react-bootstrap'

export default function PersonalData() {
  return (
    <div>
      <NavigationBar />
      <HeaderEcommerce />
      <Row><label className="page-name">MIS DATOS PERSONALES</label></Row>
      <MyPersonalData />
    </div>
  )
}
