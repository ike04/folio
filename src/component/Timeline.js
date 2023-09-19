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
  const divPCStyle = {
    border: 'none',
    borderColor: '#d3d3d3',
    borderRadius: '10px',
    margin: '0px 25% 0px 25%',
    backgroundColor: '#f0f0f0'
  }

  const divSPStyle = {
    border: 'none',
    borderColor: '#d3d3d3',
    borderRadius: '10px',
    margin: '20px 5%',
    backgroundColor: '#f0f0f0'
  }
  const isWide = useMedia({ minWidth: "480px" });
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
          <TimelineDot color="grey">
            <WorkHistoryIcon />
          </TimelineDot>)
      } else {
        return (
          <TimelineDot color="grey">
            <SchoolIcon />
          </TimelineDot>)
      }
    }

    list.push(
      <TimelineItem sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: isWide ? 0.5 : 0.1,
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
    <div style={isWide ? divPCStyle : divSPStyle}>
      <Timeline position="alternate">
        {list}
      </Timeline>
    </div>
  );
}