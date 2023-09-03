import * as React from 'react';
import Data from './officialOutput.json'

export default function OfficialOutputs() {
  var list = [];
  const textStyle = {
    textAlign: 'left',
    paddingLeft: '8px',
    paddingRight: '8px'
  }

  const divStyle = {
    textAlign: 'center', 
    border: 'solid', 
    borderColor: '#d3d3d3', 
    margin: '20px 35%', 
    boxShadow: '10px 10px 15px -10px', 
    borderRadius: '10px', 
    cursor: 'pointer'
  }

  Data.data.forEach((output) => {
    function click() {
      window.location.href = output.url
    };

    list.push(
      <div style={divStyle} onClick={click}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            // Enter or Space で実行
            click();
          }
        }} >
        <img src={output.imageUrl} style={{ width: '100%', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
        <h3 style={textStyle}>{output.title}</h3>
        <h4 style={textStyle}> {output.date}</h4>
      </ div>
    )
  })
  return (
    <>
      {list}
    </>
  )
}
