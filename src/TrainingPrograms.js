import * as React from 'react';
import useMedia from "use-media";
import Data from './json/trainingPrograms.json'

export default function TrainingPrograms() {
    var list = [];

    const isWide = useMedia({ minWidth: "480px" });

    const SPStyle = {
        textAlign: 'left',
        margin: '20px 5%',
        cursor: 'pointer'
    }

    const divStyle = {
        textAlign: 'left',
        margin: '20px 25%',
        cursor: 'pointer'
    }

    Data.program.forEach((program) => {
        function click() {
            window.location.href = program.url
        };

        list.push(
            <div style={isWide ? divStyle : SPStyle}>
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