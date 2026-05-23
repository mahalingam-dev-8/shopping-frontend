"use client"

import { Button } from "@mui/material";
import checkout from "./actions/checkout"
import getstripe from "./stripe";


 
interface Checkoutnumber{
    productid : number
}

export default function Checkout({productid}:Checkoutnumber)
{
    const handleset = async() =>
{
    // const session = await checkout(productid);
    const origin = window.location.origin;
    const { error, data } = await checkout(productid, `${origin}/`, `${origin}/`);

if (error) {
  console.error("Checkout error:", error);
  return;
}
    const stripe = await getstripe();
    await stripe?.redirectToCheckout({sessionId: data.id});
}

return (
    <Button
      variant="contained"
      className="max-w-[25%]"
      onClick={handleset}
    >
      Buy Now
    </Button>
  );
}