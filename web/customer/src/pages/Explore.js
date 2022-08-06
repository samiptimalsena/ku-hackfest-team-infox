import { Icon } from "@iconify/react";
import boltFill from "@iconify/icons-ic/round-bolt";
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
} from "@mui/material";
// components
import Page from "../components/Page";
import Waveform from "../components/Waveform";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  borderRadius: "50px",
  background: "linear-gradient(145deg, #f0f0f0, #cacaca)",
  boxShadow: "20px 20px 60px #bebebe,-20px -20px 60px #ffffff",
});

export default function Explore() {
  const [sentences, setSentences] = useState("");
  const [showAudioWave, setShowAudioWave] = useState(false);
  return (
    <Page title="Explore NFTs">
      <Container maxWidth="lg" sx={{ p: 4 }}>
        <Grid container>
          <Grid item>
            <StyledCard></StyledCard>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
