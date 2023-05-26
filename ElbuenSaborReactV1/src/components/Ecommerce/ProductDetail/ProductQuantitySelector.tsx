import "./ProductQuantitySelector.scss";

interface ProductQuantitySelectorProps {
    quantity: number;
    onChange: (value: number) => void;
}

const ProductQuantitySelector: React.FC<ProductQuantitySelectorProps> = ({ quantity, onChange }) => {
    const handleDecrement = () => {
        if (quantity > 1) {
            onChange(quantity - 1);
        }
    };

    const handleIncrement = () => {
        onChange(quantity + 1);
    };

    return (
        <span className="quantity-selector">
            <button className="button2" onClick={handleDecrement}>-</button>
            <span className="quantity">{quantity}</span>
            <button className="button2" onClick={handleIncrement}>+</button>
        </span>
    );
};

export default ProductQuantitySelector;