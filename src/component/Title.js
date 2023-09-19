import React from 'react';
import useMedia from "use-media";

const Title = (props) => {
    const isMobile = useMedia({ minWidth: "519px" });
    const isTablet = useMedia({ minWidth: "520px" }) && ({ maxWidth: "959px" });
    const isPc = useMedia({ minWidth: "960px" })
    const style = {
        margin: isPc ? '20px 25%' : isTablet ? '20px 15%' : '20px 5%'
    }

    return (
        <section id={props.title}>
            <h2 style={style}>{props.title}</h2>
        </section>
    )
}

export default Title;