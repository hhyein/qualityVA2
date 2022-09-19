import React from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'

export default function Summary() {
  const { file, handleDrop } = useFileData()

  return (
    <Box title="summary">
    </Box>
  )
}
