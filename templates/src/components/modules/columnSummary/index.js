import React from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'

export default function ColumnSummary() {
  const { file, handleDrop } = useFileData()

  return (
    <Box title="column-summary">
    </Box>
  )
}
