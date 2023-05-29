'use client'
import dynamic from 'next/dynamic'
const Modal = dynamic(() => import('@/components/Modal'))
import { useOrderAppStore } from '@/store'
import { Product as IProduct } from '@/types'
import React from 'react'
import Link from 'next/link'

type Props = {
  product: IProduct
}

const Product = ({ product }: Props) => {
  const addToCart = useOrderAppStore((state) => state.addToCart)
  const [active, setActive] = React.useState(false)
  return (
    <div className='border w-full rounded-lg flex flex-col pb-5'>
      <img src={product.img} alt={product.name} />
      <div className='mt-auto px-3 flex flex-col gap-2'>
        <div>
          <p>{product.name}</p>
          <p>{product.price}$</p>
        </div>
        <button
          className='border hover:translate-y-1 hover:bg-slate-400/30 transition-all text-sm rounded-xl px-3 py-2'
          onClick={() => {
            addToCart(product)
            setActive(true)
          }}
        >
          Add to cart
        </button>
      </div>
      <Modal
        title='Success'
        content={
          <p>
            The dish was added to the order. You can view or edit it in{' '}
            <Link href={'cart'}>Cart</Link>
          </p>
        }
        onClose={() => setActive(false)}
        active={active}
      />
    </div>
  )
}

export default Product
