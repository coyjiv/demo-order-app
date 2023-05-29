'use client'
import { useOrderAppStore } from '@/store'
import React from 'react'
import ProductsWrapper from './ProductsWrapper'

type Props = {}

const Shop = (props: Props) => {
  const selectedRestaraunt = useOrderAppStore(state=>state.selectedRestaurant)

  return (
    <div className='flex border h-full'>
      {selectedRestaraunt ? (
        <ProductsWrapper products={selectedRestaraunt.products} />
      ) : (
        <div className='flex items-center justify-center w-full'>
          Select a restaraunt
        </div>
      )}
    </div>
  )
}

export default Shop
