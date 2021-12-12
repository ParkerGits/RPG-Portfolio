import Image from 'next/image'
import { Dispatch, SetStateAction, useContext } from 'react'

type ShopItemProps = {
  id: number
  name: string
  icon: string
  percentComplete: number
  isSelected: boolean
  setSelectedItem: Dispatch<SetStateAction<number | null>>
}
export default function ShopItem({
  id,
  name,
  icon,
  percentComplete,
  isSelected,
  setSelectedItem,
}: ShopItemProps) {
  return (
    <div
      className={`w-11/12 mt-2 rounded-xl bg-gray-700 flex items-center justify-between px-1 border-2 border-transparent ${
        isSelected ? 'border-green-300' : 'hover:border-white'
      } cursor-pointer`}
      style={{ height: '10%' }}
      onClick={() => setSelectedItem(id)}>
      <div className="h-full flex items-center flex-grow gap-x-1">
        <div className="h-1/2">
          <h1 className="font-rpg text-3xl">{icon}</h1>
        </div>
        <h1
          className="font-rpg text-2xl font-light text-white leading-tight mt-1"
          style={{ textShadow: '0px 2px black' }}>
          {name}
        </h1>
      </div>
      <div className="h-full flex items-center">
        <h1
          className="font-rpg text-2xl mt-1 text-white"
          style={{ textShadow: '0px 2px black' }}>
          {percentComplete}
        </h1>
      </div>
    </div>
  )
}
