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
            <li style={isWide ? divStyle : SPStyle}>
                <a href={program.url}>{program.title}</a>
            </li>
        )
    })

    return (
        <>
            {list}
        </>
    )
}