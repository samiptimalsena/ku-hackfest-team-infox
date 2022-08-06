import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import { useContext, useEffect, useState } from 'react';
import Page from '../components/Page';
import { BlogPostCard } from '../components/_dashboard/blog';
import publicFetch from '../utils/fetch';
import AddBlogModal from '../components/_dashboard/blog/AddBlogModal';
import { AppContext } from '../context/AppContext';
// ----------------------------------------------------------------------

export default function Blog() {
  const appContext = useContext(AppContext);
  const [allArticles, setAllArticles] = useState(null);
  const [openEditBlogModal, setOpenEditBlogModal] = useState(false);
  useEffect(() => {
    publicFetch
      .get('articles?limit=100')
      .then((res) => {
        setAllArticles(res.data.data);
      })
      .catch(() => {
        appContext.handleAlert();
      });
  }, [appContext, openEditBlogModal]);
  return (
    <Page title="Dashboard: Blog">
      <AddBlogModal
        open={openEditBlogModal}
        handleOpen={() => setOpenEditBlogModal(true)}
        handleClose={() => setOpenEditBlogModal(false)}
      />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Button
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => setOpenEditBlogModal(true)}
          >
            New Blog
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          {/* <BlogPostsSearch posts={POSTS} /> */}
          {/* <BlogPostsSort options={SORT_OPTIONS} /> */}
        </Stack>

        <Grid container spacing={3}>
          {!allArticles ? (
            <h1>Loading...</h1>
          ) : (
            allArticles.map((post, index) => (
              <BlogPostCard key={post._id} post={post} index={index} />
            ))
          )}
        </Grid>
      </Container>
    </Page>
  );
}
