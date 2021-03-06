import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
	CART_RESET_ITEM
} from '../constants/cartConstants';

export const cartReducer = (
	state = { cartItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case CART_ADD_ITEM: {
			const existItem = state.cartItems.find(
				(x) => x.productId === action.payload.productId
			);
			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map(
						(x) => (x.productId === existItem.productId ? action.payload : x)
					)
				};
			} else {
				return {
					...state,
					cartItems: [ ...state.cartItems, action.payload ]
				};
			}
		}
		case CART_REMOVE_ITEM: {
			return {
				...state,
				cartItems: state.cartItems.filter((x) => x.productId !== action.payload)
			};
		}
		case CART_SAVE_SHIPPING_ADDRESS: {
			return {
				...state,
				shippingAddress: action.payload
			};
		}
		case CART_SAVE_PAYMENT_METHOD: {
			return {
				...state,
				paymentMethod: action.payload
			};
		}
		case CART_RESET_ITEM: {
			return { cartItems: [] };
		}

		default: {
			return state;
		}
	}
};
