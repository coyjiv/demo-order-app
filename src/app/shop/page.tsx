import { useOrderAppStore } from '@/store'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    const state = useOrderAppStore.getState()
    console.log(state);
    
  return (
    <div className='flex border h-full'>
        
    </div>
  )
}

export default page