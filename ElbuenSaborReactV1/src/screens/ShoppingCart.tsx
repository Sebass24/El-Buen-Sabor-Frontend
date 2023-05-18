import HeaderEcommerce from "components/Ecommerce/HeaderEcommerce/HeaderEcommerce";
import SuggestedProducts from "components/Ecommerce/SuggestedProducts/SuggestedProducts";
import Cart from "components/Ecommerce/ShoppingCart/ShoppingCart";

const ShoppingCart = () => {
    return (
        <div>
            <HeaderEcommerce />
            <Cart />
            <SuggestedProducts phrase={"¿Te tienta algo más?"} />
        </div>
    );
}

export default ShoppingCart;