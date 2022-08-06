import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import { useContext, useEffect, useState } from 'react';
import Page from '../components/Page';
// import { GalleryPostCard } from '../components/_dashboard/gallery';
import publicFetch from '../utils/fetch';
import AddGalleryModal from '../components/_dashboard/gallery/AddGalleryModal';
import { AppContext } from '../context/AppContext';
import GalleryCard from '../components/_dashboard/gallery/GalleryCard';
// ----------------------------------------------------------------------

export default function Gallery() {
  const appContext = useContext(AppContext);
  const [allGalleries, setAllGalleries] = useState(null);
  const [openEditGalleryModal, setOpenEditGalleryModal] = useState(false);
  useEffect(() => {
    publicFetch
      .get('gallery?limit=100')
      .then((res) => {
        setAllGalleries(res.data.data);
      })
      .catch(() => {
        appContext.handleAlert();
      });
  }, [appContext, openEditGalleryModal]);
  return (
    <Page title="Dashboard: Gallery">
      <AddGalleryModal
        open={openEditGalleryModal}
        handleOpen={() => setOpenEditGalleryModal(true)}
        handleClose={() => setOpenEditGalleryModal(false)}
      />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Gallery
          </Typography>
          <Button
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => setOpenEditGalleryModal(true)}
          >
            New Gallery
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          {/* <GalleryPostsSearch posts={POSTS} /> */}
          {/* <GalleryPostsSort options={SORT_OPTIONS} /> */}
        </Stack>

        <Grid container spacing={3}>
          {!allGalleries ? (
            <h1>Loading...</h1>
          ) : (
            allGalleries.map((post, index) => (
              <GalleryCard key={post._id} post={post} index={index} />
            ))
          )}
        </Grid>
      </Container>
    </Page>
  );
}
