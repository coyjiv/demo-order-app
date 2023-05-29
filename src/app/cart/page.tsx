'use client'
import useIsHydrated from '@/hooks/useIsHydrated'
import { useOrderAppStore } from '@/store'
import { createContext, useRef, useState } from 'react'
import CartProductWrapper from './CartProductWrapper'
import OrderForm from './OrderForm'
import ReCAPTCHA from 'react-google-recaptcha'
import TotalPrice from './TotalPrice'
import { useFormik } from 'formik'
import { validationSchema } from './validationSchema'
import { useLoadScript } from '@react-google-maps/api'
import {  mongoPromise } from '../utils/connectMongo'

type Props = {}

export const FormContext = createContext<any>(null);

const CartPage = (props: Props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const isHydrated = useIsHydrated()
  const [recaptcha, setRecaptcha] = useState(false)


  const { cart, selectedRestaurant, selectRestaurant, clearCart } = useOrderAppStore((state) => state)

  const submitRef = useRef<HTMLButtonElement>(null)

  const formik = useFormik({
    initialValues: {
      address: '',
      email: '',
      phone: '',
      name: '',
      comment: '',
    },
    validationSchema,
    onSubmit: async(values) => {
      console.log('submitting');
      
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
    
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        // Handle the response from the server
      } else {
        // Handle the error
        console.log("Error: ", response.status);
      }
      selectRestaurant(null),
      clearCart()
    },
  })

  return isHydrated ? (
    <div className='flex mx-5 gap-3 items-start h-[80vh]'>
      {!selectedRestaurant || cart.length === 0 ? (
        <div className='flex items-center justify-center w-full'>
          {selectedRestaurant ? 'Cart is empty' : 'Select a restaraunt'}
        </div>
      ) : (
        <>
        <FormContext.Provider value={formik}>
          <div className='w-1/2 px-5 py-8 flex flex-col border h-full'>
            {isLoaded&&<OrderForm submitRef={submitRef} recaptcha={recaptcha} />}
          </div>
          <div className='w-1/2 border flex flex-col h-full'>
            <CartProductWrapper />

            <div className='mx-10 mb-5 mt-auto'>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY ?? ''}
                onChange={() => setRecaptcha(!recaptcha)}
              />
              <div className='flex  justify-between items-center'>
                <TotalPrice/>
                <button disabled={!recaptcha || !formik.isValid || formik.isSubmitting} className='disabled:text-gray-400 disabled:bg-gray-100 disabled:hover:bg-gray-200 transition-all border rounded-lg px-3 py-2' onClick={formik.handleSubmit} type='submit'>
              Create an order
            </button>
              </div>
            </div>
          </div>
          </FormContext.Provider>
        </>
      )}
    </div>
  ) : null
}

export default CartPage
