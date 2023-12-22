import React from 'react';
import { useState, useEffect } from 'react';

const Cart = () => {
  const selectedProducts = JSON.parse(sessionStorage.getItem('selectedProducts'));
  console.log('selectedProducts: ', selectedProducts);

  return (
		<div className="product-cards-container w-full px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{selectedProducts.map((product, index) => (
				<div key={index}>{product.title}</div>
			))}
		</div>
	);
};

export default Cart;
