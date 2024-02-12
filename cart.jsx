const ShoppingCart = ({ product, count }) => {
    const [quantity, setQuantity] = useState(count);

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleRemoveFromCart = async () => {
        // Implement remove from cart logic here
    };

    return (
        <div className="shopping-cart">
            <div className="product">
                <div className="product-image">
                    <img src={product.productImage} alt="..." />
                </div>
                <div className="product-details">
                    <div className="product-title"><h3>{product.prodName}</h3></div>
                </div>
                <div className="product-price">{product.price}</div>
                <div className="product-quantity">
                    <button onClick={decrementQuantity}>-</button>
                    <input type="text" value={quantity} readOnly />
                    <button onClick={incrementQuantity}>+</button>
                </div>
                <div className="product-removal">
                    <button className="remove-product" onClick={handleRemoveFromCart}>
                        Remove
                    </button>
                </div>
                <div className="product-line-price">{count * product.price}</div>
            </div>
        </div>
    );
};
