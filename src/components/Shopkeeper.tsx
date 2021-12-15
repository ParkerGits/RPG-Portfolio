import Image from 'next/image'
import { shopkeeper } from '../characters'

export default function Shopkeeper() {
  return (
    <div
      tabIndex={0}
      style={{
        position: 'relative',
        bottom: `280px`,
        left: `760px`,
        height: '47px',
      }}>
      <Image
        src={shopkeeper.idle.left}
        width={29}
        height={47}
        alt="shopkeeper"
        loading="eager"
      />
    </div>
  )
}
