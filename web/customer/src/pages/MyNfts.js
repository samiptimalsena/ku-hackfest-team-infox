import { Icon } from "@iconify/react";
import boltFill from "@iconify/icons-ic/round-bolt";
import { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
// components
import Page from "../components/Page";
import Waveform from "../components/Waveform";
import { styled } from "@mui/system";

import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import NFTCard from "../components/NFTCard";
import { db } from "../service/firebase";

export default function MyNfts() {
  const [sentences, setSentences] = useState("");
  const [showAudioWave, setShowAudioWave] = useState(false);
  const [models, setModels] = useState(null);

  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) =>
      setModels(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);

  console.log({ models });

  return (
    <Page title="Explore NFTs">
      <Container maxWidth="lg" sx={{ p: 4 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          mt={10}
        >
          <Typography variant="h4" gutterBottom>
            My NFTs
          </Typography>
        </Stack>
        <Grid container spacing={4} justifyContent="center">
          {!models ? (
            <Grid item>
              <CircularProgress />
            </Grid>
          ) : (
            models.map((item) => (
              <Grid item>
                <NFTCard item={item} />
              </Grid>
            ))
          )}
          {/* <Grid item>
            <NFTCard />
          </Grid>
          <Grid item>
            <NFTCard />
          </Grid>
          <Grid item>
            <NFTCard />
          </Grid>
          <Grid item>
            <NFTCard />
          </Grid>
          <Grid item>
            <NFTCard />
          </Grid>
          <Grid item>
            <NFTCard />
          </Grid>
          <Grid item>
            <NFTCard />
          </Grid>
          <Grid item>
            <NFTCard />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
