// src/hooks/useProductsByCategory.ts
import { useApolloClient, useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  key: string;
  name: string;
}

interface Product {
  id: string;
  key: string;
  name: string;
  description?: string;
  masterVariant: {
    prices: {
      value: {
        currencyCode: string;
        centAmount: number;
      };
    }[];
    images: {
      url: string;
    }[];
  };
}

interface ProductsByCategoryResponse {
  productProjectionSearch: {
    offset: number;
    total: number;
    count: number;
    results: Product[];
  };
}

const GET_CATEGORIES = gql`
  query GetCategories {
    categories(limit: 4) {
      total
      results {
        id
        key
        name(locale: "en-US")
      }
    }
  }
`;

const PRODUCTS_BY_CATEGORY = gql`
  query ProductsByCategory(
    $filters: [SearchFilterInput!]!
    $limit: Int
    $offset: Int
  ) {
    productProjectionSearch(filters: $filters, limit: $limit, offset: $offset) {
      offset
      total
      count
      results {
        id
        key
        name(locale: "en-US")
        description(locale: "en-US")
        masterVariant {
          prices {
            value {
              currencyCode
              centAmount
            }
          }
          images {
            url
          }
        }
      }
    }
  }
`;

/**
 * Custom hook to fetch products by category.
 * 
 * @param params - Object containing parameters to control the query.
 * @param params.limit - The maximum number of products to fetch per category (default is 1).
 * @param params.offset - The starting point to fetch products from (default is 0).
 * @param params.categoryId - The ID of the specific category to fetch products from. If null, fetches from all categories.
 */
const useProductsByCategory = ({
  limit = 1, // Limit: Number of products to fetch
  offset = 0, // Offset: Starting point for fetching
  categoryId = null, // Category ID: Specific category to fetch products from
}: {
  limit?: number;
  offset?: number;
  categoryId?: string | null;
}) => {
  const { data: categoriesData } = useQuery<{ categories: { results: Category[] } }>(GET_CATEGORIES, {
    skip: !!categoryId, // Skip fetching categories if categoryId is provided
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const client = useApolloClient();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (categoryId) {
          // Fetch products for the provided categoryId
          const { data } = await client.query<ProductsByCategoryResponse>({
            query: PRODUCTS_BY_CATEGORY,
            variables: {
              filters: [
                {
                  model: {
                    value: { path: "categories.id", values: [categoryId] },
                  },
                },
              ],
              limit, // Limit of products
              offset, // Offset for pagination
            },
          });
          setProducts(data.productProjectionSearch.results);
        } else if (categoriesData?.categories.results) {
          // Fetch products for all categories
          const promises = categoriesData.categories.results.map((category) =>
            client.query<ProductsByCategoryResponse>({
              query: PRODUCTS_BY_CATEGORY,
              variables: {
                filters: [
                  {
                    model: {
                      value: { path: "categories.id", values: [category.id] },
                    },
                  },
                ],
                limit, // Limit of products per category
                offset, // Offset for pagination
              },
            })
          );

          const results = await Promise.all(promises);
          const allProducts = results.flatMap(
            (r) => r.data.productProjectionSearch.results
          );
          setProducts(allProducts);
        }
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoriesData, client, limit, offset, categoryId]);

  return { products, loading, error };
};

export default useProductsByCategory;
