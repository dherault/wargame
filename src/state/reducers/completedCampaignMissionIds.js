function completedCampaignMissionIds(state = [], action) {
  if (action.type === 'COMPLETE_CAMPAIGN_MISSION') {
    return [...state, action.payload]
  }

  return state
}

export default completedCampaignMissionIds
