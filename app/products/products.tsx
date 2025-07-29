
import getproducts from "./actions/get-products";
import ProductsGrid from "./product-grid";

export default async function Products(){

    const products = await getproducts();

    return( 
    <ProductsGrid products={products}  />
    )
      

}