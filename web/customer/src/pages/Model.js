import { Icon } from "@iconify/react";
import boltFill from "@iconify/icons-ic/round-bolt";
import { useState } from "react";
// import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, Container, Stack, Typography, TextField } from "@mui/material";
// components
import Page from "../components/Page";
import Waveform from "../components/Waveform";

export default function Model() {
  const [sentences, setSentences] = useState("");
  const [showAudioWave, setShowAudioWave] = useState(false);
  return (
    <Page title="Dashboard: Recent Activities">
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Model Section
          </Typography>
          <Button variant="contained" startIcon={<Icon icon={boltFill} />}>
            Try our demo model
          </Button>
        </Stack>
        <Stack
          sx={{ width: "100%" }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            value={sentences}
            onChange={(e) => setSentences(e.target.value)}
            autoComplete="sentences"
            name="sentences"
            required
            fullWidth
            multiline
            // sx={{ height: '400px' }}
            rows={10}
            id="sentences"
            label="Sentences"
            // inputProps={{ step: 1000 }}
            autoFocus
          />
          <Button
            variant="contained"
            sx={{ fontSize: 20 }}
            onClick={() => setShowAudioWave(true)}
          >
            Send
          </Button>
          {showAudioWave && <Waveform demo />}
        </Stack>
      </Container>
    </Page>
  );
}
