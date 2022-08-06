import { useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';
import { openInNewWindow } from '../../../utils/helper';
import { MoreMenu } from '../user';

import EditVideoModal from './EditVideoModal';
import { FetchContext } from '../../../context/FetchContext';
import { AppContext } from '../../../context/AppContext';
// ----------------------------------------------------------------------

const VideoImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

export default function VideoCard({ video }) {
  const fetchContext = useContext(FetchContext);
  const appContext = useContext(AppContext);

  const { youtubeLink, title } = video;
  const youtubeVideoId = youtubeLink.split('v=')[1];
  const [openEditVideoModal, setOpenEditVideoModal] = useState(false);

  const handleDelete = async () => {
    try {
      await fetchContext.authAxios.delete(`videos/${video._id}`);
      appContext.handleAlert({
        severity: 'success',
        message: 'Video Deleted.'
      });
    } catch (error) {
      appContext.handleAlert();
    }
  };

  return (
    <Card>
      <EditVideoModal
        {...video}
        open={openEditVideoModal}
        handleOpen={() => setOpenEditVideoModal(true)}
        handleClose={() => setOpenEditVideoModal(false)}
      />
      <MoreMenu handleEdit={() => setOpenEditVideoModal(true)} handleDelete={handleDelete} />
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {/* {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Label>
        )} */}
        <VideoImgStyle
          alt="title"
          src={`https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`}
        />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Link
            to="#"
            color="inherit"
            underline="hover"
            component={RouterLink}
            onClick={() => openInNewWindow(youtubeLink)}
          >
            <Typography variant="subtitle1">{title}</Typography>
          </Link>
        </Stack>
      </Stack>
    </Card>
  );
}
