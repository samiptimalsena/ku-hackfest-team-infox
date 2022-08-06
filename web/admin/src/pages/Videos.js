import { useContext, useEffect, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { Container, Stack, Typography, Button, Pagination } from '@mui/material';
// components
import { Icon } from '@iconify/react';
import Page from '../components/Page';
import { VideoList } from '../components/_dashboard/videos';
import publicFetch from '../utils/fetch';
import { AppContext } from '../context/AppContext';
import AddNewVideoModal from '../components/_dashboard/videos/AddNewVideoModal';
// ----------------------------------------------------------------------

export default function Videos() {
  const appContext = useContext(AppContext);
  const [videos, setVideos] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [total, setTotal] = useState(0);
  const [openEditVideoModal, setOpenEditVideoModal] = useState(false);
  const handleChange = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    publicFetch
      .get(`videos?limit=${limit}&page=${page}`)
      .then((res) => {
        setVideos(res.data.data);
        setTotal(Math.ceil(res.data.total / limit));
      })
      .catch(() => {
        appContext.handleAlert();
      });
  }, [appContext, limit, page]);

  return (
    <Page title="Admin Panel | Videos">
      <AddNewVideoModal
        open={openEditVideoModal}
        handleOpen={() => setOpenEditVideoModal(true)}
        handleClose={() => setOpenEditVideoModal(false)}
      />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Videos
          </Typography>
          <Button
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => setOpenEditVideoModal(true)}
          >
            New Video
          </Button>
        </Stack>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }} />
          {!videos ? <h1>Loading...</h1> : <VideoList videos={videos} />}
        </Stack>
        <Stack direction="column" alignItems="center">
          <Pagination count={total} page={page} onChange={handleChange} />
        </Stack>
      </Container>
    </Page>
  );
}
