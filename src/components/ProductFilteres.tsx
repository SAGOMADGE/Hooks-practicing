import { Category } from '@/types/category';
import { Sort } from '@/types/sort';
import React from 'react';

type Props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  productCategory: Category;
  setProductCategory: React.Dispatch<React.SetStateAction<Category>>;
  sort: Sort;
  setSort: React.Dispatch<React.SetStateAction<Sort>>;
};

const ProductFilteres = ({
  query,
  setQuery,
  productCategory,
  setProductCategory,
  sort,
  setSort,
}: Props) => {
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск..."
      />

      <div className="buttonsArea">
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
    </div>
  );
};

export default ProductFilteres;
