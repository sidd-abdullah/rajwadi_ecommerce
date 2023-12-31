import { NextResponse } from "next/server";
import { TCartItem } from "@/types/typescript.types";
import { stripe } from "@/lib/stripe";

export const POST = async (request: Request) => {
  const body: { userCartdata: TCartItem[]; uid: string } = await request.json();
  const { userCartdata, uid } = body;

  try {
    const lineItems = userCartdata.map((item) => ({
      price_data: {
        currency: "inr",
        unit_amount: item.price * 100,
        product_data: {
          name: item.productName,
          description: item.productDescription,
          images: item.productImages,
        },
      },
      quantity: item.quantity,
    }));

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: lineItems,
      metadata: {
        userId: uid,
        images: JSON.stringify(userCartdata.map((item) => item.productImages)),
        productName: JSON.stringify(
          userCartdata.map((item) => item.productName)
        ),
        quantity: JSON.stringify(userCartdata.map((item) => item.quantity)),
        selectedSize: JSON.stringify(
          userCartdata.map((item) => item.selectedSize)
        ),
        price: JSON.stringify(userCartdata.map((item) => item.price)),
        category: JSON.stringify(userCartdata.map((item) => item.category)),
        slug: JSON.stringify(userCartdata.map((item) => item.slug)),
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });
    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
};