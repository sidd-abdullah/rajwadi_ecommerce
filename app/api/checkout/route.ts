import { NextResponse } from "next/server";
import { CartItem } from "@/types/typescript.types";
import { stripe } from "@/lib/stripe";

export const POST = async (request: Request) => {
    const body: { userCartdata: CartItem[]; uid: string } = await request.json();
    const { userCartdata, uid } = body;

    try {
        const lineItems = userCartdata.map((item) => ({
            price_data: {
                currency: "inr",
                unit_amount: item.price * 100,
                product_data: {
                    name: item.productName,
                    description: item.productDescription,
                    images: [item.productImages[0]],
                },
            },
            quantity: 1,
        }));
        
        const checkoutSession = await stripe.checkout.sessions.create({
            line_items: lineItems,
            metadata: {
                userId: uid,
                images: JSON.stringify(userCartdata.map((item) => item.productImages)),
            },
            mode: "payment",
            success_url: `http://localhost:3000/success`,
            cancel_url: `http://localhost:3000/cancel`,
        });
        return NextResponse.json({ url: checkoutSession.url });
    } catch (err) {
        return NextResponse.json(
            {
                error: (err as Error).message,
            },
            { status: 500 }
        );
    }
}