export default {
  initialViewBoxWidth: 15, // tiles
  tilesConfiguration: {
    GRASS: {
      color: '#047a02',
      cost: {
        FOOT: 1, 
        WHEEL: 2, 
        FLY: 1, 
        SAIL: Infinity,
      } 
    },
    ROAD: {
      color: '#e0dac9',
      cost: {
        FOOT: 1, 
        WHEEL: 1, 
        FLY: 1, 
        SAIL: Infinity,
      } 
    },
    FOREST: {
      color: '#014c00',
      cost: {
        FOOT: 2, 
        WHEEL: 3, 
        FLY: 1, 
        SAIL: Infinity,
      } 
    },
    MOUNTAIN: {
      color: '#a5a195',
      cost: {
        FOOT: 3, 
        WHEEL: Infinity,
        FLY: 1,
        SAIL: Infinity,
      } 
    },
    RIVER: {
      color: '#57def9',
      cost: {
        FOOT: 2, 
        WHEEL: Infinity,
        FLY: 1,
        SAIL: Infinity,
      } 
    },
    SEA: {
      color: '#2032a3',
      cost: {
        FOOT: Infinity,
        WHEEL: Infinity,
        FLY: 1,
        SAIL:  1,
      } 
    },
  }
}
