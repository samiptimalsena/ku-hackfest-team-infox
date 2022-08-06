import { useContext, useEffect, useState } from "react";
import {
  Button,
  Stack,
  Typography,
  TextField,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Drawer,
} from "@mui/material";
// components
import Waveform from "../components/Waveform";
import { styled } from "@mui/system";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import keys from "../keys";

const StyledCard = styled(Card)({
  borderRadius: "10px",
  "&:hover": {
    transform: "scale(1.02)",
    transition: "0.2s ease-out",
  },
});

export default function UserNFTCard(props) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const { walletKey } = useContext(AppContext);
  const [file, setFile] = useState(null);
  const [provider, setProvider] = useState(undefined);
  const [sentences, setSentences] = useState("मेरो नाम सन्तोश सुबेदी हो ");
  const getProvider = () => {
    if ("solana" in window) {
      const provider = window.solana;
      if (provider.isPhantom) return provider;
    }
  };

  const buf2hex = (buffer) => {
    return [...new Uint8Array(buffer)]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");
  };
  const askForSinging = async () => {
    const message = `TTS API ACCESS`;
    const encodedMessage = new TextEncoder().encode(message);
    const { signature } = await provider.signMessage(encodedMessage, "utf8");
    console.log(signature);
    const sigHex = buf2hex(signature);
    return sigHex;
  };
  useEffect(() => {
    const provider = getProvider();

    if (provider) setProvider(provider);
    else setProvider(undefined);
  }, []);
  return (
    <>
      <Drawer anchor={"right"} open={open} onClose={handleClose}>
        <Card sx={{ width: 1000, p: 6, m: 6 }}>
          <Stack
            sx={{ width: "100%" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5">{props.item.name}</Typography>
            <TextField
              value={sentences}
              onChange={(e) => setSentences(e.target.value)}
              autoComplete="sentences"
              name="sentences"
              required
              fullWidth
              multiline
              rows={10}
              id="sentences"
              label="Sentences"
              autoFocus
            />
            <Button
              variant="contained"
              sx={{ fontSize: 20 }}
              onClick={async () => {
                setFile("");
                toast.promise(
                  (async () => {
                    try {
                      const sig = await askForSinging();
                      console.log({ sig });
                      const res_from_min = await axios.post(
                        // "http://192.168.1.144:5000/api/solana/validate_nft_access",
                        keys.validateUrl,
                        {
                          address: walletKey,
                          sig,
                          data: "TTS API ACCESS",
                          nft_mint_address: props.item.mint_address,
                        }
                      );
                      // console.log({ res });
                      const data = res_from_min.data;
                      // model name received
                      const res = await axios.post(
                        // "http://127.0.0.1:5000/api/inference/our_models",
                        keys.inferenceUrl,
                        {
                          text: sentences,
                          username: "sanup",
                        },
                        {
                          responseType: "blob",
                        }
                      );
                      const binaryData = [];
                      binaryData.push(res.data);
                      const file = window.URL.createObjectURL(
                        new Blob(binaryData, { type: "audio/wav" })
                      );

                      setFile(file);
                    } catch (error) {
                      console.log(error);
                    }
                  })(),
                  {
                    loading: <h3>Getting Response</h3>,
                    success: <h3>Success</h3>,
                    error: <h3>Could not get response.</h3>,
                  }
                );
              }}
            >
              Send
            </Button>
            {file && <Waveform url={file} />}
          </Stack>
        </Card>
      </Drawer>
      <StyledCard sx={{ cursor: "pointer", width: 340 }} elevation={2}>
        <CardMedia
          component="img"
          height="240"
          image={props.item.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.item.name}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            #{props.item.model_name}
          </Typography> */}
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            size="large"
            variant="contained"
            // sx={{ width: 300 }}
            onClick={() =>
              window.open(
                `https://explorer.solana.com/address/${props.item.mint_address}?cluster=devnet`,
                "_blank"
              )
            }
          >
            View on Blockchain
          </Button>
          <Button
            size="large"
            variant="contained"
            // sx={{ width: 300 }}
            onClick={handleOpen}
          >
            Try It
          </Button>
        </CardActions>
      </StyledCard>
    </>
  );
}
