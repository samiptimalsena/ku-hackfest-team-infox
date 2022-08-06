import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink } from 'react-router-dom';
import shareFill from '@iconify/icons-eva/share-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
// utils
//
import getImageLink from '../../../utils/getImageLink';
import { MoreMenu } from '../user';
import EditBlogModal from './EditBlogModal';
import { FetchContext } from '../../../context/FetchContext';
import { AppContext } from '../../../context/AppContext';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

export default function BlogPostCard({ post, index }) {
  const fetchContext = useContext(FetchContext);
  const appContext = useContext(AppContext);
  const { title, body, imagePath, slug } = post;
  const [showEditBlogModal, setShowEditBlogModal] = useState(false);
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const handleDelete = async () => {
    try {
      await fetchContext.authAxios.delete(`articles/${post._id}`);
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
      <EditBlogModal
        {...post}
        open={showEditBlogModal}
        handleOpen={() => setShowEditBlogModal(true)}
        handleClose={() => setShowEditBlogModal(false)}
      />
      <Card sx={{ position: 'relative' }}>
        <MoreMenu handleEdit={() => setShowEditBlogModal(true)} handleDelete={handleDelete} />
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
