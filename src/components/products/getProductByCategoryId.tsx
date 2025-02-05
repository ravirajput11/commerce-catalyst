// src/components/ProductList.jsx
import { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import createApolloClient from "@/graphQL/apollo-client";
// import { GET_PRODUCTS_BY_CATEGORY } from '../queries';

const GET_PRODUCTS_BY_CATEGORY = gql`
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
        nameAllLocales {
          locale
          value
        }
        descriptionAllLocales {
          locale
          value
        }
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

const ProductList = ({ categoryId }: any) => {
  // const client = React.useMemo(
  //   () => createApolloClient("/product-projections/search"),
  //   [categoryId]
  // );

  let client;
  useEffect(() => {
    client = createApolloClient("/product-projections/search");
    console.log("apollo client", client);
  }, [categoryId]);

  // Filters for category ID
  const filters = [
    {
      field: "categories.id",
      value: categoryId,
      // limit: 20,
      // offset: 20,
    },
  ];

  console.log("filters", filters);

  

  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: {
      filters,
      limit: 10, // Adjust the limit as needed
      offset: 10, // Adjust the offset for pagination
    },
    client,
  });

  console.log("ProductList data", data); // Logs variables passed to the query
  console.log("Logs the query", GET_PRODUCTS_BY_CATEGORY.loc?.source.body); // Logs the query

  if (error) {
    console.error("GraphQL Errors:", error.graphQLErrors);
    console.error("Network Errors:", error.networkError);
  }

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Products in Category {categoryId}</h1>
      <ul>
        {data.productProjections.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>Slug: {product.slug}</p>
            <p>
              Price: {(product.price.value.centAmount / 100).toFixed(2)}{" "}
              {product.price.value.currencyCode}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
