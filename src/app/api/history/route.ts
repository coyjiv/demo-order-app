import { NextApiRequest, NextApiResponse } from 'next';
import { mongoPromise } from '@/app/utils/connectMongo';
import { NextResponse } from 'next/server';

export async function GET(request: NextApiRequest, response: NextApiResponse) {
    const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
    
    
    if (!email) {
        return response.status(400).json({error: "Missing email in the request"});
    }
    
    const client = await mongoPromise;
    const db = await client.db('OrderApp').collection('Orders');
    
    const orders = await db.find({email: String(email)}).toArray();
    

    if (!orders) {
        return NextResponse.json({error: "No orders found for this email"});
    }

    return NextResponse.json({orders});
}
