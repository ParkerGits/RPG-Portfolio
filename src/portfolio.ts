import ReactIcon from '../public/icons/react.svg'
import NextIcon from '../public/icons/next.svg'
import FirebaseIcon from '../public/icons/firebase.svg'
import StripeIcon from '../public/icons/stripe.svg'
import TypeScriptIcon from '../public/icons/typescript.svg'
import XStateIcon from '../public/icons/xstate.png'
import NodeJSIcon from '../public/icons/node.svg'
import CPlusPlusIcon from '../public/icons/cpp.svg'
import MongoDBIcon from '../public/icons/mongodb.svg'
import TendsIcon from '../public/icons/portfolio/tends2.svg'
import DigitalDomainIcon from '../public/icons/portfolio/digitaldomain.svg'

type Link = { text: string; href: string }

export type PortfolioItem = {
  id: number
  name: string
  description: string
  icon: string
  percentComplete: number
  techStackIcons: any[]
  links: Link[]
}

export const portfolio: PortfolioItem[] = [
  {
    id: 1,
    name: "Parker's Digital Domain",
    description:
      'This site serves as my digital garden: it is where I publish and organize my personal writing. Topics that I choose to write about on this site are strictly those that I am immersed in and interested by. As my knowledge and writing skills expand, so too will this digital domain. This website is built using React, Next.js, MDX, TypeScript, and Tailwind.',
    links: [
      {
        text: "Link to Parker's Digital Domain",
        href: 'https://parkerlandon.com',
      },
    ],
    icon: '👑',
    percentComplete: 100,
    techStackIcons: [ReactIcon, TypeScriptIcon, NextIcon],
  },
  {
    id: 2,
    name: 'tends',
    description:
      'My SaaS project, "tends," is an application that helps users manage "quantities" in their lives (i.e., daily calories, screen time, exercise time, etc.). This project was built alongside a number of other projects in an iteration of egghead.io\'s Portfolio Project Club. The goal of the club was to design, build, and document a SaaS application that would serve as an excellent addition to our business-oriented developer portfolios. At the end of the club, I produced a technical case study for my project that is now published on egghead.io. I built this project using React, TypeScript, Next.js, Stripe, and Firebase.',
    links: [
      {
        text: 'Technical Case Study published on egghead.io!',
        href: 'https://egghead.io/blog/saas-application-with-next-js-stripe-and-firebase',
      },
      {
        text: 'Related article - sharing state in Next.js with useContext',
        href: 'https://parkerlandon.com/posts/programming/share-state-in-your-next-js-application-with-usecontext',
      },
    ],
    icon: '📈',
    percentComplete: 80,
    techStackIcons: [
      ReactIcon,
      TypeScriptIcon,
      FirebaseIcon,
      StripeIcon,
      NextIcon,
    ],
  },
  {
    id: 3,
    name: 'State Management Project Club',
    description:
      'Over a 6 week period, from July to August of 2021, I led a Portfolio Project Club in the egghead.io community. The objective of this club was to design, build, and document a business-oriented portfolio project that demonstrates an understanding of State Management in React. At the end of the 6 weeks, club members presented functional projects that would make for impressive additions to their resumes. The project that I worked on was this website! I used React and XState to control the animations and interactions. I hope to add more functionality here in the future.',
    links: [
      {
        text: 'RPG Portfolio GitHub Repository',
        href: 'https://github.com/ParkerGits/RPG-Portfolio',
      },
      {
        text: 'Related article - TypeScript with XState and React Context',
        href: 'https://parkerlandon.com/posts/programming/using-typescript-with-xstate-and-react-context',
      },
    ],
    icon: '🌵',
    percentComplete: 90,
    techStackIcons: [ReactIcon, TypeScriptIcon, XStateIcon],
  },
  {
    id: 4,
    name: 'Participation App',
    description:
      "With guidance from a Seattle Pacific University professor, I am producing an application for professors who track student participation in their courses. This app randomly selects a student who is enrolled in the course, and allows the professor to score that student's participation. This way, the professor may manage and keep track of total class participation via the app. Eventually, I would like to implement integration with Canvas. Canvas will provide authentication as well as data about the professor's classes and students.",
    links: [
      {
        text: '12/5/2021 Participation App Functionality Demo',
        href: 'https://www.youtube.com/watch?v=gN-dsE9fbho',
      },
    ],
    icon: '🎒',
    percentComplete: 30,
    techStackIcons: [ReactIcon, TypeScriptIcon, NodeJSIcon, MongoDBIcon],
  },
  {
    id: 5,
    name: 'Huffman Coding Tree',
    description:
      'Serving as my final lab submission for Data Structures 2, my Huffman Coding Tree program written in C++ can encode, compress, and decode messages. The encoding process functions by first creating a frequency table that stores the frequency of each character in the message, then by creating a Huffman Tree from the frequency table, then by creating an encoding table from the Huffman tree. I use bitwise operations to convert the binary encoding of each character into an ASCII character before writing it to a file. To decode the message, the Huffman Tree is written to the top of the encoded message, and is read during the decoding process. While I cannot share my code for this lab as it is still being used to assess students at Seattle Pacific University, the grade report I received is included below.',
    links: [
      {
        text: 'Huffman Coding Tree Lab Grade Report',
        href: 'https://i.gyazo.com/ee76bfd6046307a229a7903196d002c6.png',
      },
    ],
    icon: '🌲',
    percentComplete: 100,
    techStackIcons: [CPlusPlusIcon],
  },
  {
    id: 6,
    name: 'Minecraft Furnace State Machine',
    description:
      'To demonstrate my knowledge of state machines and state management in React, I created a functional Minecraft furnace in the browser. Check it out below!',
    links: [
      {
        text: 'Minecraft Furnace State Machine Deployment',
        href: 'https://parkergits.github.io/minecraft-furnace-xstate-react/',
      },
      {
        text: 'ParkerGits/minecraft-furnace-xstate-react Repository',
        href: 'https://github.com/ParkerGits/minecraft-furnace-xstate-react',
      },
    ],
    icon: '🏭',
    percentComplete: 100,
    techStackIcons: [ReactIcon, XStateIcon],
  },
]
