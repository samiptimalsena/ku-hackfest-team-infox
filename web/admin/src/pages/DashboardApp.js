// material
import { Box, Grid, Container, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
// components
import Page from '../components/Page';
import {
  TotalBlogCount,
  TotalYoutubeVideos,
  TotalNewsCount,
  TotalGalleryCount
} from '../components/_dashboard/app';
import { AppContext } from '../context/AppContext';
import { FetchContext } from '../context/FetchContext';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const fetchContext = useContext(FetchContext);
  const appContext = useContext(AppContext);
  const [state, setState] = useState(null);
  useEffect(() => {
    fetchContext.authAxios
      .get('stats')
      .then((res) => {
        console.log('stats');
        console.log(res);
        const { videos, news, blogs, gallery } = res.data;
        setState({
          videos,
          news,
          blogs,
          gallery
        });
      })
      .catch(() => {
        appContext.handleAlert();
      });
  }, []);
  return (
    <Page title="Dashboard | Admin Panel">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          {!state ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <TotalNewsCount count={state.news} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TotalBlogCount count={state.blogs} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TotalYoutubeVideos count={state.videos} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                {/* <AppItemOrders /> */}
                <TotalGalleryCount count={state.gallery} />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Page>
  );
}
