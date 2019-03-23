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

export default campaignDefinition
