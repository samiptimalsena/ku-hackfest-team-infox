import { Icon } from "@iconify/react";
import boltFill from "@iconify/icons-ic/round-bolt";
import nutBoltFill from "@iconify/icons-eva/settings-2-fill";
import { useState } from "react";
// import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  TextField,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Modal,
  Box,
} from "@mui/material";
// components
import Page from "../components/Page";
import Waveform from "../components/Waveform";
import { styled } from "@mui/system";
import { LoadingButton } from "@mui/lab";

const StyledCard = styled(Card)({
  borderRadius: "10px",
  //   background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
  //   boxShadow: " 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;",
  "&:hover": {
    transform: "scale(1.02)",
    transition: "0.2s ease-out",
  },
});

// const SyledButton = styled("button")({
//   position: "relative",
//   display: "inline-block",
//   cursor: "pointer",
//   outline: "none",
//   border: "0",
//   verticalAlign: "middle",
//   textDecoration: "none",
//   fontSize: "inherit",
//   fontFamily: "inherit",
// });

export default function NFTCard(props) {
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "none",
          outline: "none",
        }}
      >
        <Card
          elevation={4}
          sx={{
            width: 500,
            height: "60%",
            border: "none",
            outline: "none",
            position: "relative",
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
              {props.item.user_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              #{props.item.model_name}
            </Typography>
            <Typography variant="h5" color="text.primary" mt={4}>
              Price: Sol {props.item.price}
            </Typography>
          </CardContent>

          <Grid
            container
            sx={{ width: "100%" }}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item sx={{ width: "100%", m: 3 }}>
              <LoadingButton
                startIcon={<Icon icon={nutBoltFill} height={25} />}
                // loading={true}
                variant="contained"
                onClick={() => {
                  window.open(
                    `https://shyalblockchain.netlify.app?id=${props.item.store_id}&user_name=${props.item.user_name}`,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
                size="lg"
                sx={{
                  // position: "absolute",
                  // bottom: 0,
                  width: "100%",
                  p: 2,
                  // margin: 3,

                  // marginLeft: "auto",
                  // marginRight: "auto",
                }}
              >
                <Typography variant="h3">Mint</Typography>
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>
      </Modal>
      <StyledCard
        sx={{ cursor: "pointer", width: 345 }}
        elevation={2}
        onClick={handleOpen}
      >
        <CardMedia
          component="img"
          height="240"
          image="http://assets.iotabots.io/175.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.item.user_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            #{props.item.model_name}
          </Typography>
        </CardContent>
      </StyledCard>
    </>
  );
}
