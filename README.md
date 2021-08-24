# 🧙‍♂️ RPG Portfolio

Given my love for RPGs, it's not hard to understand why I would want my online portfolio to be themed like an old-school RPG shop cutscene.

## 💻 Tech Stack

- React
- Next.js
- TailwindCSS
- XState

## 🌟 Features

### 👑 Animated Shop Cutscene

Your character will enter the shop and approach the shop keeper. The shop keeper will then introduce his wares (which happen to be my portfolio projects).

A long term goal for this project might be to allow the player to exit the event with the shop keeper and talk to other NPCs in the shop.

### 💬 Interactive Dialogue Box

When talking with an NPC, there will be a dialogue box that the user can interact with. The short term vision of this is for the user to click through the dialogue. Perhaps I could implement some user choice, though.

### 💰 Shop Menu

When the shop keeper presents his wares, a menu of my portfolio projects will be listed. Then, the player can select a project to receive a summary and a link to learn more.

### 🚶‍♂️ Movable Player

After the shop cutscene has finished, I would like for the player to be able to move around.

### 👨‍👩‍👧‍👧 Interactive NPCs

Eventually, I would like to have other interactive NPCs in the shop that present different aspects of my portfolio.

## 💭 Dev Thoughts & Notes

Instead of implementing keyboard input, I can use a state machine and predetermined paths between NPCs to let the player move from one NPC to another. Then, when the user clicks on an NPC, the player will follow the predetermined path from the NPC he was previously interacting with to the NPC that was clicked on. This is analagous to a transition from one finite state to the next: different finite states will represent the different interactive NPCs

The state machine will look like:

[Interacting with NPC1] -> [Walking to NPC2] -> [Interacting with NPC2]

Nested inside [Walking to NPC2] will be the states that lay out the predefined path from NPC1 to NPC2. Something like

[Walking Down] -> [Walking Left] -> [Walking Up]

Each of these finite states will have an `after` property that defines how long the player walks for. Then, with a constant walk speed, we can set up paths easily.

Furthermore, as I realized while developing, we can group the walking states into one `Walking` finite state. The benefit of this is that, because there is functionality common to all walking states regardless of who the player is walking to, we can trigger functionality based on whether the player is simply `Walking`. This also holds for dialogue states: there is functionality common to all dialogue states that warrant a general `Dialogue` state to group them within.

Is it more performant to import images than to just store their paths?

TODO:

- Other NPCs
- useSelector? (xstate performance)
- Characters fade out on unmount
- make Tailwind classes for all styles
- Testing state machines with Jest
- Test React?
