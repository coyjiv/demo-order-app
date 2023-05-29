import { Product as IProduct } from '@/types'
import React from 'react'
import Product from './Product'

type Props = {
  products: IProduct[]
}

const ProductsWrapper = ({products}: Props) => {
  return (
    <div className='grid p-3 grid-cols-5 w-full gap-3 justify-items-center'>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductsWrapper