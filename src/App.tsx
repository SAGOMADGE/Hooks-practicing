import { useState } from 'react';
// css
import './App.css';
// types
import { DummyResponse } from './types/dummyResponse';
import { Category } from './types/category';
import { Sort } from './types/sort';
// hooks
import useFetch from './hooks/useFetch';
import useDebounce from './hooks/useDebounce';
import normalizeText from './utils/normalizeText';
import useDropdown from './hooks/useDropdown';

const App = () => {
  // 1. server states
  const { data, loading, error, refresh } = useFetch<DummyResponse>(
    'https://dummyjson.com/products?limit=20'
  );

  // search state
  const [query, setQuery] = useState('');
  const [productCategory, setProductCategory] = useState<Category>('all');
  const [sort, setSort] = useState<Sort>('asc');

  // 3. derived state
  const debounceQuery = useDebounce(query, 500);

  const products = data?.products ?? [];

  const filteredProducts = [...products]
    .filter((product) => {
      const isMatchingSearch = normalizeText(product.title).includes(
        normalizeText(debounceQuery)
      );

      const isMatchingCategory =
        productCategory === 'all' || product.category === productCategory;

      return isMatchingSearch && isMatchingCategory;
    })
    .sort((a, b) => (sort === 'asc' ? a.price - b.price : b.price - a.price));

  const [isOpen, setIsOpen, divRef] = useDropdown();

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск..."
      />

      <div className="buttonsArea">
        <div className="modalWrapper" ref={divRef}>
          <button
            className="menuBtn"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            Меню
          </button>

          {isOpen && (
            <ul className="menu">
              <li className="list">Профиль</li>
              <li className="list">Настройки</li>
              <li className="list">Выйти</li>
            </ul>
          )}
        </div>

        <button className="refreshBtn" onClick={refresh}>
          {error ? 'Попробовать снова' : 'Перезагрузить'}
        </button>

        <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value as Category)}
        >
          <option value="all">Все</option>
          <option value="beauty">Уход за собой</option>
          <option value="fragrances">Парфюмерия</option>
          <option value="furniture">Мебель</option>
          <option value="groceries">Продукты</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
          <option value="asc">Цена: Дешевле {'>'} Дороже</option>
          <option value="desc">Цена: Дороже {'>'} Дешевле</option>
        </select>
      </div>

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

      <ul className="products">
        {filteredProducts?.map((product) => (
          <li key={product.id}>
            <p>{product.title}</p>
            <p>{product.category}</p>
            <p>{product.brand}</p>
            <p>{product.price}</p>
            <p>{product.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
