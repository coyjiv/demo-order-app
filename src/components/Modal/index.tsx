'use client'

import { ReactElement, useState } from 'react'

type Props = {
  active?: boolean
  title?: string
  content?: string | ReactElement
  onClose: () => void
}

const Modal = ({ title, active, content, onClose }: Props) => {
  return active ? (
    <div className='absolute top-0 left-0 w-screen h-screen overflow-hidden bg-black/30'>
      <div className='absolute top-1/3 bg-white left-1/2 p-5 -translate-x-1/2'>
        <button className='p-3' onClick={() => onClose()}>Close</button>
        <h1>{title}</h1>
        <div>{content}</div>
      </div>
    </div>
  ) : null
}

export default Modal
