export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string | null;
    sold: boolean;
    /** The seller's user id. */
    userid: number;
  }
