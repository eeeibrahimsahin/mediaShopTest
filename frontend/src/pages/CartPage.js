import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    ListGroup,
    Image,
    Form,
    Button,
    Card,
    InputGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../components/Message';

function CartPage({ match, location, history }) {
    const productId = match.params.id;
    const [qty, setQty] = useState(
        location.search ? Number(location.search.split('=')[1]) : 1
    );
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const productDetails = useSelector((state) => state.productDetails);
    const { product } = productDetails;
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [productId, dispatch, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping');
    };

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant="primary">
                        Your Cart is empty... <Link to="/">Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.productId}>
                                <Row>
                                    <Col md={2}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fluid
                                            rounded
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.productId}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={3}>
                                        <InputGroup>
                                            <Button
                                                size="sm"
                                                variant="outline-primary"
                                                value={qty}
                                                onClick={() => setQty(qty - 1)}
                                                disabled={qty === 0}
                                            >
                                                <i className="fas fa-minus-circle" />
                                            </Button>
                                            <p className="p-2">
                                                <strong>{qty}</strong>
                                            </p>
                                            <Button
                                                size="sm"
                                                variant="outline-primary"
                                                value={qty}
                                                onClick={() => setQty(qty + 1)}
                                                disabled={
                                                    product.countInStock <
                                                    qty + 1
                                                }
                                            >
                                                <i className="fas fa-plus-circle" />
                                            </Button>
                                        </InputGroup>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() =>
                                                removeFromCartHandler(
                                                    item.productId
                                                )
                                            }
                                        >
                                            <i className="fas fa-trash" />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>
                                Subtotal (
                                {cartItems.reduce(
                                    (acc, item) => acc + item.qty,
                                    0
                                )}
                                ) items
                            </h2>
                            Total Price: $
                            {cartItems
                                .reduce(
                                    (acc, item) => acc + item.qty * item.price,
                                    0
                                )
                                .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type="button"
                                className="btn-block"
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
}

export default CartPage;
