export interface Category {
  id: string;
  key: string;
  name: string; // Now a string type for the localized name
}

export interface CategoriesResponse {
  categories: {
    total: number;
    results: Category[];
  };
}