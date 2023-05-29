import { mongoPromise } from "../utils/connectMongo"
import Coupon from "./Coupon"

type Props = {}

const CouponsPage = async(props: Props) => {  
  const client = await mongoPromise
      const db = await client.db('OrderApp').collection('Coupons')
      const docs = await db.find({}).toArray()
  return (
    <div className="flex gap-3 mx-5">
      {
        docs.map((doc:any) => (
          <Coupon key={doc._id} {...doc} />
        ))

      }
    </div>
  )
}

export default CouponsPage