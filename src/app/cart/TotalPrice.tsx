import { useOrderAppStore } from '@/store'

const TotalPrice = () => {
  const { cart, discount } = useOrderAppStore((state) => state)
  const totalPrice = cart.reduce((acc, product) => {
    return acc + parseInt(product.price)
  }, 0)

  return (
    <div>
        {discount!==1 && <p>Applied discount: {discount*100}%</p>}
      <p>Total: {Math.round(totalPrice * discount)}$</p>
    </div>
  )
}

export default TotalPrice
