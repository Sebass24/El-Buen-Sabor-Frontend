import HeaderEcommerce from "components/Ecommerce/HeaderEcommerce/HeaderEcommerce";
import Productdetail from "components/Ecommerce/ProductDetail/ProductDetail";
import SuggestedProducts from "components/Ecommerce/SuggestedProducts/SuggestedProducts";

const ProductDetail = () => {
    return (
        <div>
            <HeaderEcommerce />
            <Productdetail />
            <SuggestedProducts phrase={"Otras personas lo combinaron con..."} />
        </div>
    );
}

export default ProductDetail;