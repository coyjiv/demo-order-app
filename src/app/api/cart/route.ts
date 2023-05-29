import { NextResponse } from 'next/server';
import { mongoPromise } from '@/app/utils/connectMongo';
 
export async function POST(request: Request) {
    const values = await request.json();
    const client = await mongoPromise
      const db = await client.db('OrderApp').collection('Orders')
     await db.insertOne(values)
 
 
     return NextResponse.json({ message: "Document successfully inserted!" });
}