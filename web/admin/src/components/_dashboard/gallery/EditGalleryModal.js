import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Container,
  Drawer,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { useContext, useState } from 'react';
import { Icon } from '@iconify/react';
import gallery from '@iconify/icons-eva/image-2-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import { AppContext } from '../../../context/AppContext';
import { FetchContext } from '../../../context/FetchContext';
import { getErrorMessage } from '../../../utils/helper';
import AppButton from '../../AppButton';

export default function EditGalleryModal(props) {
  const fetchContext = useContext(FetchContext);
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(props.title);

  const [file, setFile] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    setLoading(true);
    fetchContext.authAxios
      .post('gallery', formData)
      .then(() => {
        appContext.handleAlert({
          severity: 'success',
          message: 'Gallery Added'
        });
        setTitle('');
        setFile('');
        setImage(null);
        setLoading(false);
        setTimeout(() => {
          props.handleClose();
        }, 700);
      })
      .catch((err) => {
        appContext.handleAlert({
          type: 'error',
          message: getErrorMessage(err)
        });
      });
  };

  const handleChange = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setImage(e.target.files[0]);
    setFile(url);
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
            <Icon icon={gallery} width={43} height={43} />
            Add Gallery
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
                  id="outlined-full-width"
                  label="Image Upload"
                  style={{ margin: 8 }}
                  name="upload-photo"
                  type="file"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                  onChange={handleChange}
                />
                {file.length > 0 && (
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        // height="140"
                        image={file}
                        title="Contemplative Reptile"
                      />
                    </CardActionArea>
                  </Card>
                )}
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
              Add Gallery
            </AppButton>
          </Box>
        </Box>
      </Container>
    </Drawer>
  );
}
