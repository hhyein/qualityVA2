import React from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'

export default function RowSummary() {
  const { file, handleDrop } = useFileData()

  return (
    <Box title="row-summary">
    </Box>
  )
}