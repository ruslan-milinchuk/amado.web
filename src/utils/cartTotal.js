import {DELIVERY} from "../constants";

export const cartTotal = cartList => {
	let cartTotal = { subtotal: 0, total: 0 };
	cartTotal.subtotal = Object.values(cartList).reduce(function(sum, current) {
		return sum + current.price * current.qty;
	}, 0);
	cartTotal.total = cartTotal.subtotal + DELIVERY;
	return cartTotal;
};
