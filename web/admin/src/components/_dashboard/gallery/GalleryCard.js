import { useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { Grid, Typography, Link, Card, CardContent } from '@mui/material';
import getImageLink from '../../../utils/getImageLink';
import { MoreMenu } from '../user';
import { FetchContext } from '../../../context/FetchContext';
import { AppContext } from '../../../context/AppContext';
import EditGalleryModal from './EditGalleryModal';

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});
const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});
const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

export default function GalleryCard({ post, index }) {
  console.log({ post });
  const appContext = useContext(AppContext);
  const fetchContext = useContext(FetchContext);
  const { title, imagePath } = post;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;
  const [showEditGalleryModal, setShowEditGalleryModal] = useState(false);

  const handleDelete = async () => {
    try {
      await fetchContext.authAxios.delete(`gallery/${post._id}`);
      appContext.handleAlert({
        severity: 'success',
        message: 'Blog Deleted.'
      });
    } catch (error) {
      appContext.handleAlert();
    }
  };

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <EditGalleryModal
        {...post}
        open={showEditGalleryModal}
        handleOpen={() => setShowEditGalleryModal(true)}
        handleClose={() => setShowEditGalleryModal(false)}
      />
      <Card sx={{ position: 'relative' }}>
        <MoreMenu handleEdit={() => setShowEditGalleryModal(true)} handleDelete={handleDelete} />
        <CardMediaStyle
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
              }
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)'
              }
            })
          }}
        >
          <CoverImgStyle alt={title} src={getImageLink(imagePath)} />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute'
            })
          }}
        >
          <TitleStyle
            to="#"
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white'
              })
            }}
          >
            {title}
          </TitleStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
