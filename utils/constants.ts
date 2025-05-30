import { isDev } from "./helpers";

console.log('isDev:', isDev);
export const pricingPlans= [
    {
        id:'basic',
        name:'Basic',
        price:20,
        items:['5 PDF summaries per month'],
        description:'For personal use',
        paymentLink:'',
        priceId: isDev?'plan_QX9EV669OhB0L7':'plan_QbC8DOdRnZUOAU'
    },
    {
        id:'pro',
        name:'Pro',
        price:50,
        items:['Unlimited PDF summaries','Priority processing','24/7 priority support','Markdown Export'],
        description:'For professionals and teams',
        paymentLink:'',
        priceId:isDev?'plan_QX9HPNX2i0freE':'plan_QbC8fDRKpTFjmo'
    }
];