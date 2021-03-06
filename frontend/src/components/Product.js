import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'react-bootstrap';
import Rating from '../components/Rating';

function Product({ product }) {
	return (
		<React.Fragment>
			<Card className="my-3 p-3 rounded">
				<Link to={`/product/${product._id}`}>
					<Card.Img src={product.image} variant="top" />
				</Link>
				<Card.Body>
					<Link to={`/product/${product._id}`}>
						<Card.Title as="div">
							<strong>{product.name}</strong>
						</Card.Title>
					</Link>
					<Card.Text as="div">
						{product.rating === 0 ? (
							<h4>NO Reviews</h4>
						) : (
							<Rating
								value={product.rating}
								text={`${product.numReviews} reviews`}
							/>
						)}
					</Card.Text>
					<Card.Text as="h3">${product.price}</Card.Text>
				</Card.Body>
			</Card>
		</React.Fragment>
	);
}

export default Product;
