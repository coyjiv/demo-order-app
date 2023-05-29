import { NavLink } from '../NavLink'

type Props = {}

export const Navbar = (props: Props) => {
  return (
    <header>
      <nav className='p-6'>
        <ul className='flex gap-5'>
          <li>
            <NavLink
              href={'shop'}
              className='text-lg font-medium'
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink href={'cart'} className='text-lg font-medium'>
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink href={'history'} className='text-lg font-medium'>
                History
            </NavLink>
          </li>
          <li>
            <NavLink href={'coupons'} className='text-lg font-medium'>
                Coupons
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
