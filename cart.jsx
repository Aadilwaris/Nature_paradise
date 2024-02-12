import React, { useState, useEffect } from "react";
import { deleteFromCart, displayCart } from "../../services/Apiservices";
import { useNavigate, useSearchParams } from "react-router-dom";
import './Cart.css';

const CheckoutPanel = ({ grandTotal, goToCheckout }) => {
    return (
        <>
            <div className="totals">
                <div className="totals-item totals-item-total">
                    <label>Grand Total</label>
                    <div className="totals-value" id="cart-total">{grandTotal}</div>
                </div>
            </div>

            <button className="checkout" onClick={goToCheckout}>Checkout</button>
        </>
    )
}

const ShoppingCart = ({ product, count, updateCount }) => {
    const [quantity, setQuantity] = useState(count);

    useEffect(() => {
        setQuantity(count);
    }, [count]);

    const incrementQuantity = () => {
        updateCount(product._id, quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            updateCount(product._id, quantity - 1);
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

const Cart = () => {
    const navigate = useNavigate();
    const [productDetails, setProductDetails] = useState([]);
    const [productIdToCountMap, setProductIdToCountMap] = useState({});
    const [grandTotal, setGrandTotal] = useState(0);

    const updateCount = (productId, newCount) => {
        const newProductIdToCountMap = { ...productIdToCountMap };
        newProductIdToCountMap[productId] = newCount;
        setProductIdToCountMap(newProductIdToCountMap);
    };

    const calculateGrandTotal = () => {
        let total = 0;
        for (const productId in productIdToCountMap) {
            const count = productIdToCountMap[productId];
            const product = productDetails.find(p => p._id === productId);
            if (product) {
                total += count * product.price;
            }
        }
        setGrandTotal(total);
    };

    const goToCheckout = () => {
        navigate('/checkout');
    };

    // Fetch product details and populate cart
    useEffect(() => {
        const populateCart = async () => {
            try {
                const id = searchParams.get('productId');
                const receivedProduct = await displayCart(id);
                if (receivedProduct !== null) {
                    setProductDetails(receivedProduct.data);
                }
            } catch (error) {
                setError("Failed to fetch cart details");
                console.error("Error fetching cart details:", error);
            }
        };

        populateCart();
    }, []);

    // Recalculate grand total whenever product details or product count changes
    useEffect(() => {
        calculateGrandTotal();
    }, [productDetails, productIdToCountMap]);

    return (
        <>
            <div style={{ paddingTop: "10%", display: "flex", flexDirection: "column", gap: "2.5rem 1rem" }}>
                {productDetails.map(product => (
                    <ShoppingCart
                        key={product._id}
                        product={product}
                        count={productIdToCountMap[product._id] || 0}
                        updateCount={updateCount}
                    />
                ))}
            </div>
            <CheckoutPanel grandTotal={grandTotal} goToCheckout={goToCheckout} />
        </>
    );
};

export default Cart;
