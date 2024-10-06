export interface WikipediaResponse {
  query: {
    pages: {
      [key: string]: {
        extract: string;
      };
    };
  };
}
