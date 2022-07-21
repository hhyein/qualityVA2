import React from 'react'
import { Box } from '../../Box'

export default function CombinationSetting() {
  return (
    <Box title="combination-setting">
        <input type="range" min="0" max="100"></input>
        <input type="range" min="0" max="100"></input>
    </Box>
  )
}
