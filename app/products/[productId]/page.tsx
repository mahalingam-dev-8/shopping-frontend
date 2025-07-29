
import { Grid, Stack, Typography } from "@mui/material";
import gproduct from "./product"
import Image from "next/image";
import { API_URL } from "@/app/common/constants/api";
import Checkout from "@/app/checkout/checkout";

interface SingleProductProps{
   params : {productId : string}
}

export default async function( {params} : SingleProductProps ){

    const product = await gproduct(+params.productId)

    return (
<Grid container marginBottom={"2rem"} marginTop={"2rem"} rowGap={3}> 
    
         {
        product.imageexists && (
             <Grid md={6} xs={12}>
          <Image src={`${API_URL}/images/products/${product.id}.jpg`} alt="Picture of the product" height="0" width="0" className="w-full sm:w-3/4 h-auto" sizes="100vw"/>
        </Grid>)
      }
      
      <Grid md={6} xs={12}>
        <Stack gap={3} >
           <Typography variant="h4">{product.name}</Typography>
           <Typography>{product.description}</Typography>
           <Typography>${product.price}</Typography>
           <Checkout productid={product.id}/>
        </Stack>
      </Grid>
    
        </Grid>
       
    );
}