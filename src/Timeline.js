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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SchoolIcon from '@mui/icons-material/School';
import Data from './json/timeline.json'

export default function BasicTimeline() {
  var list = [];
  const history = Data.data.history;
  history.forEach((data, index) => {
    const icon = (type) => {
      if (type === "now") {
        return (
          <TimelineDot color="primary">
        <CheckCircleIcon />
        </TimelineDot>)
      } else if (data.type == "before") {
        return (<TimelineDot color="grey">
        <WorkHistoryIcon />
        </TimelineDot>)
      } else {
        return (<TimelineDot color="grey">
        <SchoolIcon />
        </TimelineDot>)
      }
    }
    list.push(
      <TimelineItem sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.5,
        },
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
          <Typography variant="h6" component="span">
            {data.name}
          </Typography>
          <Typography>{data.content}</Typography>
        </TimelineContent>
      </TimelineItem>
    )
  });

  return (
    <Timeline position="alternate">
      {list}
    </Timeline>
  );
}
