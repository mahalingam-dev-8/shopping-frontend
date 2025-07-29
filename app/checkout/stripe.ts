import { Stripe, loadStripe } from "@stripe/stripe-js"



let stripepromise : Stripe | null = null

const getstripe = async() =>
{
   if(!stripepromise){

   stripepromise = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
   
}
   return stripepromise;
};

export default getstripe;