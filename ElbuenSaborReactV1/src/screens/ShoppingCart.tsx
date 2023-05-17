import HeaderEcommerce from "components/Ecommerce/HeaderEcommerce/HeaderEcommerce";
import SuggestedProducts from "components/Ecommerce/SuggestedProducts/SuggestedProducts";

const ShoppingCart = () => {
    return (
        <div>
            <HeaderEcommerce />
            <SuggestedProducts phrase={"¿Te tienta algo más?"} />
        </div>
    );
}

export default ShoppingCart;