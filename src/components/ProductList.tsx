import { Product } from '@/types/product';

type Props = {
  filteredProducts: Product[];
};

const ProductList = ({ filteredProducts }: Props) => {
  return (
    <ul className="products">
      {filteredProducts.map((product) => (
        <li key={product.id}>
          <p>{product.title}</p>
          <p>{product.category}</p>
          <p>{product.brand}</p>
          <p>{product.price}</p>
          <p>{product.rating}</p>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
