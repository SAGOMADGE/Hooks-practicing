import useFetch from './hooks/useFetch';
// css
import './styles/App.css';
// types
import { DummyResponse } from './types/dummyResponse';

// hooks
import useProductsFilter from './hooks/useProductsFilter';

// components
import ProductList from './components/ProductList';
import ProductFilters from './components/ProductFilteres';
import Dropdown from './components/Dropdown';

const App = () => {
  // 1. server states
  const { data, loading, error, refresh } = useFetch<DummyResponse>(
    'https://dummyjson.com/products?limit=20'
  );

  const products = data?.products ?? [];

  const {
    query,
    setQuery,
    productCategory,
    setProductCategory,
    sort,
    setSort,
    filteredProducts,
  } = useProductsFilter(products);

  return (
    <div>
      <ProductFilters
        query={query}
        setQuery={setQuery}
        productCategory={productCategory}
        setProductCategory={setProductCategory}
        sort={sort}
        setSort={setSort}
      />

      <Dropdown label="Меню">
        <li className="list">Профиль</li>
        <li className="list">Настройки</li>
        <li className="list">Выйти</li>
      </Dropdown>

      <button className="refreshBtn" onClick={refresh}>
        {error ? 'Попробовать снова' : 'Перезагрузить'}
      </button>

      {loading && <p className="loading">Загрузка...</p>}

      {error && <p className="error">{error}</p>}

      {!loading &&
        !error &&
        products.length === 0 &&
        filteredProducts.length === 0 && (
          <p className="emptyState">Еще нет товаров</p>
        )}

      {products.length > 0 && filteredProducts.length === 0 && (
        <p className="noItemsFound">Товары не найдены</p>
      )}

      <ProductList filteredProducts={filteredProducts} />
    </div>
  );
};

export default App;
