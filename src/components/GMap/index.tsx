'use client'
import GoogleMapReact from 'google-map-react'
import { SVGProps, useEffect, useRef, useState } from 'react'

type Props = {
  restarauntPlace:
    | {
        lat: number
        lng: number
      }
    | undefined
    userLocation?: | {
      lat: number
      lng: number
    }
  | undefined
}

const GMap = ({ restarauntPlace, userLocation:userAdress }: Props) => {
  const [userLocation, setUserLocation] = useState<null | {
    lat: number
    lng: number
  }>(null)

  
  return (
    <div className='h-[300px] w-full'>
      {restarauntPlace?.lat && (
        <GoogleMapReact
          zoom={9}
          center={{ lat: restarauntPlace.lat, lng: restarauntPlace.lng }}
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
          }}
          onClick={(e) => setUserLocation({ lat: e.lat, lng: e.lng })}
        >
          <Marker
            lat={restarauntPlace.lat}
            lng={restarauntPlace.lng}
            text='Restorant location'
          />
          {userAdress?.lat? <Marker
              lat={userAdress?.lat}
              lng={userAdress?.lng}
              text='Your location'
            />: userLocation?.lat ? (
            <Marker
              lat={userLocation?.lat}
              lng={userLocation?.lng}
              text='Your location'
            />
          ):null}
        </GoogleMapReact>
      )}
    </div>
  )
}

export default GMap

const Marker = ({
  text,
  lat,
  lng,
}: {
  text: string
  lat: number
  lng: number
}) => (
  <div className=' p-5 items-center justify-center flex flex-col text-red-500'>
    <MapPinIcon className=' w-6 h-6' />
    <p className='text-center'>{text}</p>
  </div>
)

const MapPinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='w-6 h-6'
    {...props}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
    />
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
    />
  </svg>
)
