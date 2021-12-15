import { PlayerEventContext } from '../context/playerEventContext'
import { useContext, useState } from 'react'
import { useActor } from '@xstate/react'
import { portfolio, PortfolioItem } from '../portfolio'
import ShopItem from './ShopItem'
import ItemDescription from './ItemDescription'

export default function ShopMenu() {
  const playerEventState = useContext(PlayerEventContext)
  const [currentPlayerState, sendPlayerEvent] = useActor(playerEventState)
  const [hoveringCancel, setHoveringCancel] = useState(false)
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  return (
    <div
      className="w-11/12 my-auto self-center rounded-2xl bg-black bg-opacity-90 border-2 border-white"
      style={{
        height: '90%',
        borderStyle: 'ridge',
        display: currentPlayerState.matches('shopMenu') ? 'block' : 'none',
      }}>
      <div
        className="grid grid-cols-5 items-center border-b-2"
        style={{ height: '8%', borderStyle: 'ridge' }}>
        <div
          className="flex items-center justify-center h-full col-span-2 border-r-2"
          style={{ borderStyle: 'ridge' }}>
          <h1
            className="font-rpg text-3xl text-white"
            style={{ textShadow: '0px 2px black' }}>
            ⚔️ Parker&apos;s Portfolio Shop
          </h1>
        </div>
        <div className="flex justify-around col-span-2 mx-2">
          <div
            className={`flex-grow w-1/2 ${
              hoveringCancel ? '' : 'bg-green-300'
            } bg-opacity-40 cursor-pointer`}>
            <h1
              className="font-rpg text-2xl text-white text-center opacity-100"
              style={{ textShadow: '0px 2px black' }}>
              💰 Buy
            </h1>
          </div>
          <div
            className={`flex-grow w-1/2 cursor-pointer bg-opacity-40 ${
              hoveringCancel ? 'bg-green-300' : ''
            }`}
            onMouseOver={() => setHoveringCancel(true)}
            onMouseLeave={() => setHoveringCancel(false)}>
            <h1
              className="font-rpg text-2xl text-white text-center "
              style={{ textShadow: '0px 2px black' }}
              onClick={() => sendPlayerEvent('EXIT_SHOPPING')}>
              👋 Exit
            </h1>
          </div>
        </div>
        <div
          className="text-center col-span-1 border-l-2 h-full flex items-center justify-center"
          style={{ borderStyle: 'ridge' }}>
          <h1
            className="font-rpg text-2xl text-white"
            style={{ textShadow: '0px 2px black' }}>
            ✨720 Gold✨
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-2" style={{ height: '92%' }}>
        <div
          className="col-span-1 border-r-2 flex flex-col items-center"
          style={{ borderStyle: 'ridge' }}>
          {portfolio.map((portfolioItem) => (
            <ShopItem
              {...portfolioItem}
              setSelectedItem={setSelectedItem}
              isSelected={selectedItem === portfolioItem.id}
              key={portfolioItem.id}
            />
          ))}
        </div>
        <div className="col-span-1">
          <ItemDescription selectedItem={selectedItem} />
        </div>
      </div>
    </div>
  )
}
