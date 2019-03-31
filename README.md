# Basic Wars

A war game.

## Installation

```
npm install
npm start
```

## Deployment

```
npm run build-deploy
```

## Glossary

- Position: `{ x, y }`
- Tile: string eg:  `'PLAIN'`

## Tour of this repo

Be familiar with React and Redux, then

- Routes can be found in `src/index.js`, views in `src/components`
- The domain game logic is in `src/lib/game`
- The state game logic is in `src/state/reducers`
- How side effects are handled is in `src/state/sagas`
- How the canvas is drawn can is written is `src/lib/game/draw.js`
- How the canvas listens to events can be found in `src/lib/game/registerCanvas`
- How the AI works is in `src/lib/game/computeAiActions.js`
