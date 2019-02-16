export default {
  tilesCosts: {
    GRASS: { 
      FOOT: 1, 
      WHEEL: 2, 
      FLY: 1, 
      SAIL: Infinity,
    },
    ROAD: { 
      FOOT: 1, 
      WHEEL: 1, 
      FLY: 1, 
      SAIL: Infinity,
    },
    FOREST: { 
      FOOT: 2, 
      WHEEL: 3, 
      FLY: 1, 
      SAIL: Infinity,
    },
    MOUNTAIN: { 
      FOOT: 3, 
      WHEEL: Infinity,
      FLY: 1,
      SAIL: Infinity,
    },
    RIVER: { 
      FOOT: 2, 
      WHEEL: Infinity,
      FLY: 1,
      SAIL: Infinity,
    },
    SEA: { 
      FOOT: Infinity,
      WHEEL: Infinity,
      FLY: 1,
      SAIL:  1,
    },
  }
}
