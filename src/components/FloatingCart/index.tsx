import React, { useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {
	Container,
	CartPricing,
	CartButton,
	CartButtonText,
	CartTotalPrice
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';

const FloatingCart: React.FC = () => {
	const { products } = useCart();

	const navigation = useNavigation();

	const cartTotal = useMemo(
		() => {
			const totalSum =
				products.length > 0
					? products.reduce(
							(accumulator, { price, quantity }) =>
								accumulator + Number(price * quantity),
							0
						)
					: 0;

			return formatValue(totalSum);
		},
		[ products ]
	);

	const totalItensInCart = useMemo(
		() => {
			const totalItens =
				products.length > 0
					? products.reduce(
							(accumulator, { quantity }) =>
								accumulator + Number(quantity),
							0
						)
					: 0;

			return totalItens;
		},
		[ products ]
	);

	return (
		<Container>
			<CartButton
				testID="navigate-to-cart-button"
				onPress={() => navigation.navigate('Cart')}
			>
				<FeatherIcon name="shopping-cart" size={24} color="#fff" />
				<CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
			</CartButton>

			<CartPricing>
				<CartTotalPrice>{cartTotal}</CartTotalPrice>
			</CartPricing>
		</Container>
	);
};

export default FloatingCart;
