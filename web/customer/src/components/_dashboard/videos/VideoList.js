import { Grid } from '@mui/material';
import { VideoCard } from '.';

// ----------------------------------------------------------------------

export default function VideoList({ videos, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {videos.map((video) => (
        <Grid key={video._id} item xs={12} sm={6} md={3}>
          <VideoCard video={video} />
        </Grid>
      ))}
    </Grid>
  );
}
