import { useContext } from 'react'
import { portfolio, PortfolioItem } from '../portfolio'
import Image from 'next/image'
import Link from 'next/link'

type ItemDescriptionProps = {
  selectedItem: number
}

export default function ItemDescription({
  selectedItem,
}: ItemDescriptionProps) {
  const portfolioItem: PortfolioItem | undefined = portfolio.find(
    (item) => item.id === selectedItem,
  )

  if (!portfolioItem) return null
  return (
    <div className="h-full w-full">
      <div className="w-full h-1/6 flex px-2">
        <div className="h-full flex-grow flex items-center w-2/3">
          <h1
            className="font-rpg text-3xl text-white"
            style={{ textShadow: '0px 2px black' }}>
            {portfolioItem.name}
          </h1>
        </div>
        <div className="flex h-full flex-grow w-1/3 items-center justify-end">
          {portfolioItem.techStackIcons.map((icon) => (
            <div key={icon.src} className="w-1/6 ml-1">
              <Image src={icon} alt={'Tech Stack Icon'} />
            </div>
          ))}
        </div>
      </div>
      <div className="h-4/6 px-2">
        <p className="font-rpg text-white">{portfolioItem.description}</p>
      </div>
      <div className="px-2">
        <h1
          className="font-rpg text-2xl text-white"
          style={{ textShadow: '0px 2px black' }}>
          Check out the project! 👀
        </h1>
        <ul className="list-disc mx-4">
          {portfolioItem.links.map((link) => (
            <li className="font-rpg text-white" key={link.href}>
              <a target="_blank" rel="noopener noreferrer" href={link.href}>
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
