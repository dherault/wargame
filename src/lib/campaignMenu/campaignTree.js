import Tree from '../common/Tree'
import getMission1MapDefinition from '../maps/campaign/mission1'
import getMission2MapDefinition from '../maps/campaign/mission2'

const campaignDefinition = new Tree()

const mission1 = {
  id: '1',
  getMapDefinition: getMission1MapDefinition,
  position: {
    x: 0.29, 
    y: 0.74,
  },
}

mission1.treeIndex = campaignDefinition.addNode(mission1)

const mission2 = {
  id: '2',
  getMapDefinition: getMission2MapDefinition,
  position: {
    x: 0.35,
    y: 0.6,
  },
}

mission2.treeIndex = campaignDefinition.addNode(mission2, mission1.treeIndex)

const mission2point1 = {
  id: '2.1',
  getMapDefinition: getMission2MapDefinition,
  position: {
    x: 0.2,
    y: 0.5,
  },
}

mission2point1.treeIndex = campaignDefinition.addNode(mission2point1, mission2.treeIndex)

const mission2point2 = {
  id: '2.2',
  getMapDefinition: getMission2MapDefinition,
  position: {
    x: 0.38,
    y: 0.71,
  },
}

mission2point2.treeIndex = campaignDefinition.addNode(mission2point2, mission2.treeIndex)

const mission3 = {
  id: '3',
  getMapDefinition: getMission2MapDefinition,
  position: {
    x: 0.28,
    y: 0.4,
  },
}

mission3.treeIndex = campaignDefinition.addNode(mission3, mission2.treeIndex)

export default campaignDefinition
