import * as React from 'react';
import useMedia from "use-media";
import Data from './json/officialOutput.json';
import Grid from '@mui/material/Unstable_Grid2';
import { style } from '@mui/system';
import Box from '@mui/material/Box';
import Ogp from './Ogp'

export default function OfficialOutputs() {
  var list = [];
  const isWide = useMedia({ minWidth: "480px" });
  const textStyle = {
    textAlign: 'left',
    paddingLeft: '8px',
    paddingRight: '8px'
  }

  const divPCStyle = {
    margin: '20px 25%',
  }

  const divSPStyle = {
    margin: '20px 5%',
  }

  const outputStyle = {
    textAlign: 'center',
    border: 'solid',
    borderColor: '#d3d3d3',
    margin: '20px 15%',
    boxShadow: '10px 10px 15px -10px',
    borderRadius: '10px',
    cursor: 'pointer'
  }

  Data.data.forEach((output) => {
    list.push(
      <Ogp url={output.url} />
    )
  })
  return (
    <Box sx={{ flexGrow: 1 }} style={isWide ? divPCStyle : divSPStyle}>
      <Grid container spacing={0.5}>
        {list}
      </Grid>
    </Box>
  )
}
