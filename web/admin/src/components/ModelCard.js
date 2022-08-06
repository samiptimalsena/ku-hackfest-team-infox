import { Icon } from '@iconify/react';
import nutBoltFill from '@iconify/icons-eva/settings-2-fill';
import { useState } from 'react';
// material
import {
  Button,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Modal,
  Box,
  CardActions
} from '@mui/material';
// components
import { styled } from '@mui/system';
import { LoadingButton } from '@mui/lab';

const StyledCard = styled(Card)({
  borderRadius: '10px'
  // '&:hover': {
  //   transform: 'scale(1.02)',
  //   transition: '0.2s ease-out'
  // }
});

export default function ModelCard() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: 'none',
          outline: 'none'
        }}
      >
        <Card
          elevation={4}
          sx={{
            width: 500,
            height: '60%',
            border: 'none',
            outline: 'none',
            position: 'relative'
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            height="340"
            image="http://assets.iotabots.io/175.png"
            alt="green iguana"
            sx={
              {
                // backgroundSize: "cover",
                // p: 0,
                // m: 0,
              }
            }
          />
          <CardContent>
            <Typography gutterBottom variant="h3" component="div">
              New Bot
            </Typography>
            <Typography variant="body2" color="text.secondary">
              #175
            </Typography>
            <Typography variant="h5" color="text.secondary" mt={4}>
              Price: $400
            </Typography>
          </CardContent>

          <Grid container sx={{ width: '100%' }} justifyContent="center" alignItems="center">
            <Grid item sx={{ width: '100%', m: 3 }}>
              <LoadingButton
                startIcon={<Icon icon={nutBoltFill} height={25} />}
                // loading={true}
                variant="contained"
                size="lg"
                sx={{
                  width: '100%',
                  p: 2
                  // marginRight: "auto",
                }}
              >
                <Typography variant="h3">Mint</Typography>
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>
      </Modal>
      <StyledCard sx={{ cursor: 'pointer', width: '100%' }} elevation={2} onClick={handleOpen}>
        <CardMedia
          component="img"
          height="440"
          image="http://assets.iotabots.io/175.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            New Bot
          </Typography>
          <Typography variant="body2" color="text.secondary">
            #175
          </Typography>
        </CardContent>
        <Grid container sx={{ width: '100%', mb: 4 }} justifyContent="center" alignItems="center">
          <Grid item>
            <CardActions>
              <Grid container spacing={8}>
                <Grid item>
                  <Button size="large" variant="contained" sx={{ width: 300 }}>
                    Share
                  </Button>
                </Grid>
                <Grid item>
                  <Button size="large" variant="contained" sx={{ width: 300 }}>
                    Try It
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Grid>
        </Grid>
      </StyledCard>
    </>
  );
}
