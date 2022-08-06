import { Icon } from '@iconify/react';
import nutBoltFill from '@iconify/icons-eva/settings-2-fill';
import { useContext, useState } from 'react';
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
  CardActions,
  Stack,
  Backdrop,
  Drawer,
  TextField
} from '@mui/material';
// components
import axios from 'axios';
import { styled } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { doc, setDoc } from 'firebase/firestore';

import TLoader from './TLoader';
import { db } from '../service/firebase';

import { AppContext } from '../context/AppContext';
import keys from '../keys';

const StyledCard = styled(Card)({
  borderRadius: '10px'
  // '&:hover': {
  //   transform: 'scale(1.02)',
  //   transition: '0.2s ease-out'
  // }
});

export default function ModelCard(props) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const { walletKey, name, email, loggedInWithGoogle, setWalletKey } = useContext(AppContext);

  const [openLaunchNft, setOpenLaunchNft] = useState(false);
  const [addressKey, setAddressKey] = useState(walletKey);
  const [price, setPrice] = useState(0);
  const [bcLink, setBcLink] = useState(localStorage.getItem('bcLink') || '');

  const [openDrawer, setOpenDrawer] = useState(false);
  const [launced, setLaunced] = useState(localStorage.getItem('launced') || false);

  return (
    <>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
      >
        <Stack spacing={4} sx={{ width: 1000, p: 4 }}>
          <Typography variant="h4">Launch Details</Typography>
          <TextField
            value={addressKey}
            onChange={(e) => setAddressKey(e.target.value)}
            autoComplete="addressKey"
            name="addressKey"
            required
            fullWidth
            id="addressKey"
            label="Address Key"
            autoFocus
          />
          {loggedInWithGoogle && (
            <Button
              variant="contained"
              onClick={async () => {
                const { solana } = window;

                if (solana) {
                  try {
                    const response = await solana.connect();
                    console.log('wallet account ', response.publicKey.toString());
                    setWalletKey(response.publicKey.toString());
                    setAddressKey(response.publicKey.toString());
                  } catch (err) {
                    // { code: 4001, message: 'User rejected the request.' }
                  }
                }
              }}
            >
              Get Wallet Key
            </Button>
          )}
          <TextField
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            autoComplete="price"
            name="price"
            required
            placeholder="Sol. 2"
            fullWidth
            id="price"
            label="price"
            autoFocus
          />

          <Button
            variant="contained"
            size="large"
            onClick={async () => {
              setOpenLaunchNft(true);
              const res = await axios.post(keys.mintUrl, {
                address: addressKey,
                price
              });
              // console.log({ res });
              setBcLink(
                `https://explorer.solana.com/address/${res.data.candy_machine_id}/anchor-account?cluster=devnet`
              );
              localStorage.setItem(
                'bcLink',
                `https://explorer.solana.com/address/${res.data.candy_machine_id}/anchor-account?cluster=devnet`
              );

              // Add a new document in collection "cities"
              await setDoc(doc(db, 'users', res.data.candy_machine_id), {
                email,
                name,
                model_name: `${name}_model`,
                price,
                store_id: res.data.candy_machine_id,
                user_address: walletKey,
                user_name: name
              });
              setOpenLaunchNft(false);
              setOpenDrawer(false);
              setLaunced(true);
              localStorage.setItem('launced', 'true');
            }}
          >
            Launch
          </Button>
        </Stack>
      </Drawer>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLaunchNft}
        onClick={() => {
          setOpenLaunchNft(false);
        }}
      >
        {/* <CircularProgress color="inherit" /> */}
        {/* <Card sx={{ borderRadius: 'none', p: 4 }}> */}
        <Stack justifyContent="center" alignItems="center">
          <TLoader />
          <Typography
            variant="h3"
            sx={{
              fontStyle: 'italic'
            }}
          >
            Launching NFTs...
          </Typography>
        </Stack>
        {/* </Card> */}
      </Backdrop>
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
              {name} Model
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
      <StyledCard sx={{ cursor: 'pointer', width: 400 }} elevation={2}>
        <CardMedia
          component="img"
          height="440"
          image="http://assets.iotabots.io/175.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name} Model
          </Typography>
          <Typography variant="body2" color="text.secondary">
            #175
          </Typography>
        </CardContent>
        <Grid container sx={{ width: '100%', mb: 4 }} justifyContent="center" alignItems="center">
          <Grid item>
            <CardActions>
              <Grid container spacing={8} justifyContent="center" alignItems="center">
                <Grid item>
                  {!launced ? (
                    <Button
                      size="large"
                      variant="contained"
                      sx={{ width: 300 }}
                      onClick={() => {
                        setOpenDrawer(true);
                      }}
                    >
                      Launch NFT
                    </Button>
                  ) : (
                    <Button
                      size="large"
                      variant="contained"
                      sx={{ width: 300 }}
                      onClick={() => {
                        if (props.try) {
                          props.setOpenDrawer(true);
                        } else {
                          window.open(bcLink, '_blank');
                        }
                      }}
                    >
                      {props.try ? 'Try Model' : 'View on Blockchain'}
                    </Button>
                  )}
                </Grid>
                {/* <Grid item>
                  <Button size="large" variant="contained" sx={{ width: 300 }}>
                    Try It
                  </Button>
                </Grid> */}
              </Grid>
            </CardActions>
          </Grid>
        </Grid>
      </StyledCard>
    </>
  );
}
