import "./ProductQuantitySelector.scss";

interface ProductQuantitySelectorProps {
    quantity: number;
    onChange: (value: number) => void;
    disabled: boolean;
}

const ProductQuantitySelector: React.FC<ProductQuantitySelectorProps> = ({ quantity, onChange, disabled }) => {
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
            <button className="button2" onClick={handleDecrement} disabled={disabled}>-</button>
            <span className="quantity">{quantity}</span>
            <button className="button2" onClick={handleIncrement} disabled={disabled}>+</button>
        </span>
    );
};

export default ProductQuantitySelector;