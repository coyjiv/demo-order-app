'use client'
import GMap from '@/components/GMap'
import useIsHydrated from '@/hooks/useIsHydrated'
import { useOrderAppStore } from '@/store'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import { FormContext } from './page'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";

type Props = {
    submitRef: React.MutableRefObject<HTMLButtonElement | null>
    recaptcha: boolean
}

const OrderForm = ({submitRef, recaptcha}: Props) => {

    const [userAdressCoordinates, setUserAdressCoordinates] = useState<null | {
        lat: number
        lng: number
    }>(null)
    const form = useContext(FormContext);

  const selectedRestarauntPlace = useOrderAppStore(
    (state) => state.selectedRestaurant
  )?.place

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300
  });

  const handleInput = (e: { target: { value: string } }) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = async (address: string) => {
    // When user selects a place, we can replace the keyword without request data from API
    // Then set the data as the value of the input box
    setValue(address, false);
    clearSuggestions();

    try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        // now you have your lat and lng that you can pass to your GMap component
        setUserAdressCoordinates({ lat, lng });
      } catch (error) {
        console.log("Error: ", error);
      }
    form.setFieldValue('address', address);
  };
  


  return (
    <div className='overflow-y-scroll px-3'>
      <p className='text-center font-medium text-2xl my-3'>Order Form</p>
      <p className='my-3 text-center'>
        Pin your location for delivery or use our search
      </p>
      <p className='text-xs text-center my-1'>
        (if you think the location sets incorrectly, try zooming in to
        double-check)
      </p>
      <GMap userLocation={userAdressCoordinates} restarauntPlace={selectedRestarauntPlace} />
      <form className='my-5' onSubmit={form.handleSubmit}>
        <div className='flex flex-col gap-5'>
        <Combobox onSelect={handleSelect}>
        <ComboboxInput
          {...form.getFieldProps('address')}
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Address"
          className='border rounded-lg px-3 py-2'
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ description }, i) => (
                <ComboboxOption className='bg-white cursor-pointer border' key={i} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
          <span className='text-red-500 text-xs'>
            {form.errors.address && form.errors.address}
            </span>
          <input
            className='border rounded-lg px-3 py-2'
            type={'email'}
            placeholder='Email'
            {...form.getFieldProps('email')}
          />
          <span className='text-red-500 text-xs'>
            {form.errors.email && form.errors.email}
            </span>
          <input
            className='border rounded-lg px-3 py-2'
            placeholder='Name'
            {...form.getFieldProps('name')}
          />
           <span className='text-red-500 text-xs'>
            {form.errors.name && form.errors.name}
            </span>
          <input
            className='border rounded-lg px-3 py-2'
            placeholder='Phone'
            {...form.getFieldProps('phone')}
          />
           <span className='text-red-500 text-xs'>
            {form.errors.phone && form.errors.phone}
            </span>
          <textarea
            className='border rounded-lg px-3 py-2'
            placeholder='Comment'
            {...form.getFieldProps('comment')}
          />
          
        </div>
      </form>
    </div>
  )
}

export default OrderForm
