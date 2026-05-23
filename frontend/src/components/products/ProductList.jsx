import ProductCard from "./ProductCard.jsx";

const ProductList = ({ products }) => {
	return (
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{products.map((product) => (
				<ProductCard key={product._id || product.id} product={product} />
			))}
		</div>
	);
};

export default ProductList;
