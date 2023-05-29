'use client'

import { useState } from "react";

type Props = {}

const HistoryPage = (props: Props) => {
  const [email, setEmail] = useState('')
  const [orders, setOrders] = useState([])
  async function fetchOrders(email:string) {
    const response = await fetch(`/api/history?email=${encodeURIComponent(email)}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        const orders = await response.json();
        console.log(orders);
        return orders.orders;
    }
}

  return (
    <div className="mx-3">
      <p>Enter email to find your orders history</p>
      <input value={email} onChange={(e)=>setEmail(e.target.value)} className="border mt-5 px-3 py-2 rounded-lg" type="text" placeholder="Email" />
      <button className="border ml-5 p-2 rounded-lg" onClick={()=>{
        if (email.length<2) {
          return;
        }
        fetchOrders(email)
        .then(orders => {
            console.log(orders);
            setOrders(orders)
        })
        .catch(error => {
            console.error('An error occurred while fetching orders:', error);
        });
      }}>Find</button>

      <div className="mt-5">
        {orders.length===0? <p>Not found</p> : orders.map((order:any) => (
          <div key={order._id} className="border rounded-lg p-3 mb-3">
            <p>Order ID: {order._id}</p>
            <p>Restaraunt: {order.restaraunt}</p>
            <p>Address: {order.address}</p>
            <p>Phone: {order.phone}</p>
            <p>Name: {order.name}</p>
            <p>Comment: {order.comment}</p>
            </div>
        ))}
        </div>

    </div>
  )
}

export default HistoryPage