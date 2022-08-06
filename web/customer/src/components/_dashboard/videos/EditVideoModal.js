import { Box, Button, Container, Drawer, Grid, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import ytVideo from '@iconify/icons-ant-design/youtube';
import { AppContext } from '../../../context/AppContext';
import { FetchContext } from '../../../context/FetchContext';
import { getErrorMessage } from '../../../utils/helper';
import AppButton from '../../AppButton';

export default function EditVideoModal(props) {
  const [isChanged, setIsChanged] = useState(false);
  const fetchContext = useContext(FetchContext);
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(props.title);

  const [link, setLink] = useState(props.youtubeLink);

  useEffect(() => {
    if (title !== props.title) {
      setIsChanged(true);
    }
    if (link !== props.link) {
      setIsChanged(true);
    }
  }, [title, link]);

  const handleSubmit = () => {
    // e.preventDefault();
    if (!isChanged) return;
    setLoading(true);
    fetchContext.authAxios
      .put(`videos/${props._id}`, {
        title,
        youtubeLink: link
      })
      .then(() => {
        appContext.handleAlert({ severity: 'success', message: 'Video Updated.' });
        setTitle('');
        setLink('');
        setLoading(false);
        setTimeout(() => {
          props.handleClose();
        }, 700);
      })
      .catch((err) => {
        appContext.handleAlert({ severity: 'error', message: getErrorMessage(err) });
        setLoading(false);
      });
  };
  return (
    <Drawer anchor="right" open={props.open} onClose={props.handleClose}>
      <Container style={{ width: '1000px' }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          <Typography
            gutterBottom
            variant="h2"
            sx={{
              marginTop: '20px',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Icon icon={ytVideo} width={43} height={43} />
            Add Video
          </Typography>
          <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoComplete="title"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  id="link"
                  label="Youtube Link"
                  type="url"
                  name="link"
                  autoComplete="link"
                />
              </Grid>
            </Grid>
            <AppButton
              loading={loading}
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: 'black',
                color: '#ffffff'
              }}
            >
              Update video
            </AppButton>
          </Box>
        </Box>
      </Container>
    </Drawer>
  );
}
