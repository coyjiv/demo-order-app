import { useOrderAppStore } from "@/store"
import { Product } from "@/types"

type Props = {}

const CartProductWrapper = (props: Props) => {
    const productsData = useOrderAppStore(state=>state.cart)
    const addToCart = useOrderAppStore(state=>state.addToCart)
    const removeFromCart = useOrderAppStore(state=>state.removeFromCart)
    console.log(productsData);
    // group identical products
    const products = productsData.reduce((acc, product) => {
        const existingProduct = acc.find((p) => p.id === product.id)
        if (existingProduct) {
          existingProduct.quantity += 1
        } else {
          acc.push({ ...product, quantity: 1 })
        }
        return acc
      }, [] as Product[])
      console.log(products);
      
  return (
    <div>
        {products.map((product)=>(
            <div key={product.id} className='flex justify-between items-center'>
                <div>
                    <img src={product.img} alt={product.name} />
                    <div>
                        <p>{product.name}</p>
                        <p>{product.price}$</p>
                    </div>
                </div>
                <div className="px-3 flex items-center gap-5">
                    <button className="px-3 py-1 bg-slate-300 rounded-lg hover:bg-slate-500 transition-all" onClick={()=>removeFromCart(product)}>-</button>
                    <span>{product.quantity}</span>
                    <button className="px-3 py-1 bg-slate-300 rounded-lg hover:bg-slate-500 transition-all" onClick={()=>addToCart(product)}>+</button>
                    </div>
                </div>
        ))}

    </div>
  )
}

export default CartProductWrapper