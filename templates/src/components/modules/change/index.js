import React from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'

export default function Change() {
  const { file, handleDrop } = useFileData()

  return (
    <Box title="change">
    </Box>
  )
}
