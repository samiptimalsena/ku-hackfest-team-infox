// material
import { Box, Grid, Container, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
// components
import Page from '../components/Page';
import {
  TotalBlogCount,
  TotalYoutubeVideos,
  TotalNewsCount,
  TotalGalleryCount,
  AppWidgetSummary
} from '../components/_dashboard/app';
import AppWebsiteVisits from '../components/_dashboard/app/AppWebsiteVisits';
import { AppContext } from '../context/AppContext';
import { FetchContext } from '../context/FetchContext';
// import fill from '@iconify/icons-ic/block';

export default function DashboardApp() {
  const fetchContext = useContext(FetchContext);
  const appContext = useContext(AppContext);
  const [state, setState] = useState(null);

  return (
    <Page title="Dashboard | Admin Panel">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome to demo dashboard</Typography>
        </Box>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Weekly Sales"
              total={714000}
              color="success"
              icon={'ant-design:dollar'}
            />
          </Grid> */}

          <Grid item xs={12} sm={12} md={4}>
            <AppWidgetSummary
              title="NFT Solds"
              total={3}
              color="info"
              icon={'ant-design:dollar-circle-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <AppWidgetSummary
              title="Number of NFT hits"
              total={47}
              color="warning"
              icon={'ant-design:cloud-server'}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <AppWidgetSummary
              title="NFT Price"
              total={`1 SOL`}
              color="error"
              icon={'ant-design:dollar-circle-filled'}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppWebsiteVisits
              title="NFT Hits"
              subheader="(+43%)"
              chartLabels={[
                '01/01/2022',
                '02/01/2022',
                '03/01/2022',
                '04/01/2022',
                '05/01/2022',
                '06/01/2022',
                '07/01/2022',
                '08/01/2022',
                '09/01/2022',
                '10/01/2022',
                '11/01/2022'
              ]}
              chartData={[
                {
                  name: '',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
                },
                {
                  name: '',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
                },
                {
                  name: '',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
                }
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
