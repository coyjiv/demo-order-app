'use client'
import { useOrderAppStore } from "@/store"
import { Coupon } from "@/types"


const Coupon = (props: Coupon) => {
    const setDiscount = useOrderAppStore((state) => state.setDiscount)
  return (
    <div className="rounded-lg items-center flex-col p-3 border ">
        <h1>Click to copy:</h1>
        <div className="m-3 border flex cursor-pointer justify-center items-center h-10" onClick={()=>{ setDiscount(props.discount); alert('applied '+props.discount*100+'% discount')}}>
            <p>{props.promocode}</p>
        </div>
        <div className="flex flex-col justify-between items-center">
            <p className="max-w-[200px] mx-5 text-center">{props.promoName}</p>
            <p>{props.discount*100}%</p>
            </div>
    </div>
  )
}

export default Coupon