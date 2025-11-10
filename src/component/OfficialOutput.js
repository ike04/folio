import * as React from 'react';
import useMedia from "use-media";
import Data from '../json/officialOutput.json';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import OutputCell from './OutputCell'

export default function OfficialOutputs() {
  var list = [];
  const isTablet = useMedia({ minWidth: "520px" }) && ({ maxWidth: "959px" });
  const isPc = useMedia({ minWidth: "960px" });
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [])

  const divStyle = {
    margin: '0 auto',
    maxWidth: isPc ? '1200px' : '100%',
    padding: isPc ? '0 40px' : isTablet ? '0 30px' : '0 20px',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
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
    <Box ref={sectionRef} sx={{ flexGrow: 1 }} style={divStyle}>
      <Grid container spacing={isPc ? 3 : 2}>
        {list}
      </Grid>
    </Box>
  )
}
