import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface IProps extends LinkProps {
  activeClassName?: string
  className: string
  children: React.ReactNode
}

export const NavLink = ({ activeClassName='font-bold underline', className, children, ...props }: IProps) => {
    const { href } = props
    const pathname = ''
    
    
  return (
    <Link {...props} className={`${className} ${href===pathname ? activeClassName : ''}`}>
      {children}
    </Link>
  )
}
