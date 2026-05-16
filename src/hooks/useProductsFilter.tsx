import React from 'react';
import { useState } from 'react';
import { Category } from '@/types/category';
import { Sort } from '@/types/sort';
import { Product } from '@/types/product';
import useDebounce from './useDebounce';
import normalizeText from '@/utils/normalizeText';

type UseProductsFilterReturn = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  productCategory: Category;
  setProductCategory: React.Dispatch<React.SetStateAction<Category>>;
  sort: Sort;
  setSort: React.Dispatch<React.SetStateAction<Sort>>;
  filteredProducts: Product[];
};

const useProductsFilter = (products: Product[]): UseProductsFilterReturn => {
  const [query, setQuery] = useState('');
  const [productCategory, setProductCategory] = useState<Category>('all');
  const [sort, setSort] = useState<Sort>('asc');

  const debounceQuery = useDebounce(query, 500);

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

  return {
    query,
    setQuery,
    productCategory,
    setProductCategory,
    sort,
    setSort,
    filteredProducts,
  };
};

export default useProductsFilter;
