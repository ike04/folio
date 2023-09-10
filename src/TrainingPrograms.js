import * as React from 'react';
import useMedia from "use-media";
import Data from './json/trainingPrograms.json'

export default function TrainingPrograms() {
    var list = [];

    const divStyle = {
        textAlign: 'center', 
        padding: '0px 5% 0px 5%',
        cursor: 'pointer'
      }

    Data.program.forEach((program) => {
        function click() {
            window.location.href = program.url
          };
      
        list.push(
            <div style={divStyle}>
                <li onClick={click}>{program.title}</li>
            </div>
        )
    })

    return (
        <>
            {list}
        </>
    )
}