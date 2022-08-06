import { Icon } from '@iconify/react';
import boltFill from '@iconify/icons-ic/round-bolt';
import { useState } from 'react';
import axios from 'axios';
// import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography, TextField } from '@mui/material';
// components
import Page from '../components/Page';
import Waveform from '../components/Waveform';

export default function Model() {
  const [sentences, setSentences] = useState('मेरो नाम सन्तोश सुबेदी हो ');
  const [showAudioWave, setShowAudioWave] = useState(false);
  const [isModelAvailable, setIsModelAvailable] = useState(false);
  const [isDemoModelActivated, setIsDemoModelActivated] = useState(false);
  const [file, setFile] = useState('');
  return (
    <Page title="Dashboard: Recent Activities">
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Model Section
          </Typography>
        </Stack>
        {isModelAvailable && (
          <Stack sx={{ width: '100%' }} spacing={2} justifyContent="center" alignItems="center">
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
              onClick={() => setShowAudioWave(true)}
            >
              Send
            </Button>
            {showAudioWave && <Waveform demo />}
          </Stack>
        )}
        {!isModelAvailable && !isDemoModelActivated && (
          <Stack justifyContent="center" alignItems="center" spacing={4}>
            <Typography variant="h6">You haven't built your model</Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ p: 5 }}
              startIcon={<Icon icon={boltFill} />}
              onClick={() => {
                setIsDemoModelActivated(true);
              }}
            >
              <Typography variant="h5">Try our free demo model</Typography>
            </Button>
          </Stack>
        )}
        {isDemoModelActivated && (
          <Stack sx={{ width: '100%' }} spacing={2} justifyContent="center" alignItems="center">
            <Typography variant="h5">Demo Model</Typography>
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
                const res = await axios.post('http://127.0.0.1:5000/check', {
                  text: sentences,
                  username: 'sanup'
                });
                const binaryData = [];
                binaryData.push(res.data);
                const file = window.URL.createObjectURL(
                  new Blob(binaryData, { type: 'audio/wav' })
                );

                setFile(file);
                // setFile(res.data);
              }}
            >
              Send
            </Button>
            {file && <Waveform url={file} />}
          </Stack>
        )}
      </Container>
    </Page>
  );
}
