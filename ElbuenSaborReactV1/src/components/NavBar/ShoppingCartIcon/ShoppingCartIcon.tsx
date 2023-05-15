import React from 'react'; 
import "./ShoppingCartIcon.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faCartShopping);

const ShoppingCart = () => {
    return(
        <FontAwesomeIcon icon={faCartShopping} className="shoppingCart" />
    );
}

export default ShoppingCart;

