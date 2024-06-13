import {Stripe} from "stripe"
import express, {Request,Response} from "express"

const stripe = new Stripe("sk_test_51PPPASCVDF5HLoSRoCmHThMuFEVqAf85TB4Jvy4hGsckfSocRyjwB5UWOEUR16j11qF9g5oLyz2qWMjj0cuEhSYE00ffwAUy0D")
export const checkout = async (req:Request,res:Response)=>{
    try {
        const { cartData } = req.body;
        let vendorIds:any[] = [];
        let line_items: any[] = [];
        cartData.forEach((item:any) => {
            line_items.push({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        images: [item.image],
                    },
                    unit_amount: item.price * 100, 
                },
                quantity: item.quantity,
            });
            vendorIds.push(item.vendorId);
        });
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: 'https://alloxa-backend.onrender.com/success',
            cancel_url: 'https://alloxa-backend.onrender.com/cancel',
            metadata: {
                vendorIds: JSON.stringify(vendorIds),
            },
        });

        res.json({ sessionId: session.id, url: session.url });
        
    } catch (error:any) {
        res.status(500).json({message: error.meassage})
        
    }

}

export const webhook = async(req:Request,res:Response)=>{
    const sig:any = req.headers['stripe-signature'];
    const webhookSecret:any = "whsec_KUYyC7TzJgrNT3nAAk1SBFBTp1ALt1AX";

    let event:any;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err:any) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;

            try {
                const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
                const vendorIds = JSON.parse(session.metadata.vendorIds);

                const order = createOrderObject(lineItems.data, vendorIds, session); // Create order object

                await saveOrder(order); 

                console.log('Order created and saved successfully:', order);

            } catch (err) {
                console.error('Error processing session completed event:', err);
            }
            break;

        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('Payment Intent succeeded: ', paymentIntent);
            break;

        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            console.log('Payment Method attached: ', paymentMethod);
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });

}

function createOrderObject(lineItems:any, vendorIds:any, session:any) {
    const orderItems = lineItems.map((item:any, index:number) => ({
        name: item.description,
        amount: item.amount_subtotal,
        quantity: item.quantity,
        vendorId: vendorIds[index]
    }));

    return {
        sessionId: session.id,
        paymentIntentId: session.payment_intent,
        customerId: session.customer,
        orderItems: orderItems,
        totalAmount: session.amount_total,
        currency: session.currency,
        status: 'pending',
        created_at: new Date()
    };
}


async function saveOrder(order:any) {

    console.log('Saving order to database:', order);

}
