'use client'
import { useOrderAppStore } from '@/store'
import { Restaurant } from '@/types'

type Props = {
  doc: Restaurant
}

const Restaraunt = ({ doc }: Props) => {
  const selectedRestaraunt = useOrderAppStore(
    (state) => state.selectedRestaraunt
  )

  return (
    <div
      key={doc?._id}
      className={`p-3 rounded-xl cursor-pointer ${
        doc === selectedRestaraunt ? 'bg-slate-500 text-white' : 'bg-gray-100'
      }`}
      onClick={() => useOrderAppStore.setState({ selectedRestaraunt: doc })}
    >
      <p>{doc?.restaurantName}</p>
      <p className='text-xs'>{doc?.address}</p>
      <p className='text-xs'>{doc?.phone}</p>
    </div>
  )
}

export default Restaraunt
