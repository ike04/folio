import * as React from 'react';
import useMedia from "use-media";
import Data from '../json/officialOutput.json';
import Grid from '@mui/material/Unstable_Grid2';
import { style } from '@mui/system';
import Box from '@mui/material/Box';
import OutputCell from './OutputCell'

export default function OfficialOutputs() {
  var list = [];
  const isMobile = useMedia({ minWidth: "519px" });
  const isTablet = useMedia({ minWidth: "520px" }) && ({ maxWidth: "959px" });
  const isPc = useMedia({ minWidth: "960px" })

  const textStyle = {
    textAlign: 'left',
    paddingLeft: '8px',
    paddingRight: '8px'
  }

  const divStyle = {
    margin: '0 auto',
    maxWidth: isPc ? '1200px' : '100%',
    padding: isPc ? '0 40px' : isTablet ? '0 30px' : '0 20px',
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

  Data.data.forEach((output, index) => {
    list.push(
      <OutputCell
        key={index}
        title={output.title}
        image={output.image}
        url={output.url}
        date={output.date}
      />
    )
  })
  return (
    <Box sx={{ flexGrow: 1 }} style={divStyle}>
      <Grid container spacing={isPc ? 3 : 2}>
        {list}
      </Grid>
    </Box>
  )
}
