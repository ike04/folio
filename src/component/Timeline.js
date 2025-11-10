import * as React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography'
import useMedia from "use-media";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SchoolIcon from '@mui/icons-material/School';
import Data from '../json/timeline.json'

export default function BasicTimeline() {
  const isMobile = useMedia({ minWidth: "519px" });
  const isTablet = useMedia({ minWidth: "520px" }) && ({ maxWidth: "959px" });
  const isPc = useMedia({ minWidth: "960px" });
  
  const divStyle = {
    border: 'none',
    borderRadius: '24px',
    margin: '0 auto',
    maxWidth: isPc ? '900px' : '100%',
    padding: isPc ? '50px' : isTablet ? '40px' : '20px',
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    animation: 'fadeInUp 0.8s ease-out',
    marginBottom: '40px',
  }

  var list = [];
  const history = Data.data.history;
  history.forEach((data, index) => {
    const icon = (type) => {
      if (index == 0) {
        return (
          <TimelineDot color="primary">
            <CheckCircleIcon />
          </TimelineDot>)
      } else if (data.type == "work") {
        return (
          <TimelineDot
            sx={{
              background: 'linear-gradient(135deg, #f093fb, #f5576c)',
              boxShadow: '0 4px 15px rgba(245, 87, 108, 0.3)',
            }}
          >
            <WorkHistoryIcon />
          </TimelineDot>)
      } else {
        return (
          <TimelineDot
            sx={{
              background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
              boxShadow: '0 4px 15px rgba(79, 172, 254, 0.3)',
            }}
          >
            <SchoolIcon />
          </TimelineDot>)
      }
    }

    list.push(
      <TimelineItem sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.1,
        },
        mx: -3
      }}>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          {data.startDate}~<br></br>{data.endDate}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          {icon(data.type)}
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <br></br>
          <Typography variant="body1" component="span">
            {data.name}
          </Typography>
          <Typography variant='body2'>
            {data.content}
          </Typography>
          <br></br>
        </TimelineContent>
      </TimelineItem>
    )
  });

  return (
    <div style={divStyle}>
      <Timeline position="alternate">
        {list}
      </Timeline>
    </div>
  );
}
