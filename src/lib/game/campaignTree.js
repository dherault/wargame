import Tree from '../common/Tree'
import mission1mapDefinition from '../maps/campaign/mission1'

const campaignDefinition = new Tree()

const mission1 = {
  id: '1',
  mapDefinition: mission1mapDefinition,
  position: {
    x: 0, 
    y: 0,
  },
}

mission1.treeIndex = campaignDefinition.addNode(mission1)

export default campaignDefinition
