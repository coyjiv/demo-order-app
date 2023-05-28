import { ReactNode } from 'react'
import { client, mongoPromise } from '../utils/connectMongo'
import Restaraunt from './Restaraunt'
type Props = {
  children: ReactNode
}
const ShopPage = async (props: Props) => {
  await mongoPromise
  const db = await client.db('OrderApp').collection('Restaraunts')
  const docs = await db.find({}).toArray()

  return (
    <main className='flex gap-3 px-10 py-5'>
      <div className='w-2/3 lg:w-1/5 max-h-[80vh] px-3 py-5 space-y-5 overflow-y-scroll border'>
        {docs.map((doc:any) => (
          <Restaraunt key={doc._id} doc={doc} />
        ))}
      </div>
        <div className='w-5/6'>
          {props.children}
        </div>
    </main>
  )
}

export default ShopPage
