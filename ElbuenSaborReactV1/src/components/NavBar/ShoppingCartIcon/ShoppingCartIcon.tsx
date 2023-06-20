import "./ShoppingCartIcon.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

library.add(faCartShopping);

const ShoppingCart = () => {
    return (
        <Link to="/cart" className="shoppingCart"><FontAwesomeIcon icon={faCartShopping} className="shoppingCart" /></Link>
    );
}

export default ShoppingCart;

