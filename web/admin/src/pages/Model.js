import { Icon } from '@iconify/react';
import boltFill from '@iconify/icons-ic/round-bolt';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
// import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, Container, Stack, Typography, TextField, Drawer } from '@mui/material';
import toast from 'react-hot-toast';
// components
import Page from '../components/Page';
import Waveform from '../components/Waveform';
import ModelCard from '../components/ModelCard';
import { AppContext } from '../context/AppContext';
import keys from '../keys';

export default function Model() {
  const [sentences, setSentences] = useState('');
  const [showAudioWave, setShowAudioWave] = useState(false);
  const { name } = useContext(AppContext);
  const [isModelAvailable, setIsModelAvailable] = useState(false);
  const [isDemoModelActivated, setIsDemoModelActivated] = useState(false);
  const [file, setFile] = useState('');
  const [launced, setLaunced] = useState(localStorage.getItem('launced') || false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showDemoDrawer, setShowDemoDrawer] = useState(false);

  useEffect(() => {
    if (!openDrawer) {
      setFile('');
    }
  }, [openDrawer]);

  return (
    <Page title="Dashboard: Recent Activities">
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Model Section
          </Typography>

          <Stack justifyContent="center" alignItems="center" spacing={4}>
            {/* <Typography variant="h6">You haven't built your model</Typography> */}
            <Button
              variant="contained"
              size="large"
              // sx={{ p: 1 }}
              startIcon={<Icon icon={boltFill} />}
              onClick={() => {
                setIsDemoModelActivated(true);
                setShowDemoDrawer(true);
              }}
            >
              <Typography variant="h5">Try our free demo model</Typography>
            </Button>
          </Stack>
        </Stack>
        {launced && (
          <>
            <Drawer
              anchor="right"
              open={openDrawer}
              onClose={() => {
                setOpenDrawer(false);
              }}
            >
              <Stack
                sx={{ width: 1000, p: 4 }}
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h4">Try Model</Typography>
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
                  placeholder="मेरो नाम सन्तोश सुबेदी हो "
                  label="Sentences"
                  autoFocus
                />
                <Button
                  variant="contained"
                  sx={{ fontSize: 20 }}
                  onClick={async () => {
                    setFile('');
                    toast.promise(
                      (async () => {
                        try {
                          const res = await axios.post(
                            // 'http://127.0.0.1:5000/api/inference/our_models',
                            keys.inferenceUrl,
                            {
                              text: sentences,
                              username: name
                            },
                            {
                              responseType: 'blob'
                            }
                          );
                          const binaryData = [];
                          binaryData.push(res.data);
                          const file = window.URL.createObjectURL(
                            new Blob(binaryData, { type: 'audio/wav' })
                          );

                          setFile(file);
                        } catch (error) {
                          console.log(error);
                        }
                      })(),
                      {
                        loading: <h3>Getting Response</h3>,
                        success: <h3>Success</h3>,
                        error: <h3>Could not get response.</h3>
                      }
                    );
                    // setFile(res.data);
                  }}
                >
                  Send
                </Button>
                {file && <Waveform url={file} />}
              </Stack>
            </Drawer>
            <ModelCard try setOpenDrawer={setOpenDrawer} />
          </>
        )}

        {isDemoModelActivated && (
          <Drawer
            anchor="right"
            open={showDemoDrawer}
            onClose={() => {
              setShowDemoDrawer(false);
            }}
          >
            <Stack
              sx={{ width: 1000, p: 4 }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
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
                  setFile('');
                  toast.promise(
                    (async () => {
                      try {
                        const res = await axios.post(
                          // 'http://127.0.0.1:5000/api/inference/our_models',
                          keys.inferenceUrl,
                          {
                            text: sentences,
                            username: name
                          },
                          {
                            responseType: 'blob'
                          }
                        );
                        const binaryData = [];
                        binaryData.push(res.data);
                        const file = window.URL.createObjectURL(
                          new Blob(binaryData, { type: 'audio/wav' })
                        );

                        setFile(file);
                      } catch (error) {
                        console.log(error);
                      }
                    })(),
                    {
                      loading: <h3>Getting Response</h3>,
                      success: <h3>Success</h3>,
                      error: <h3>Could not get response.</h3>
                    }
                  );
                }}
              >
                Send
              </Button>
              {file && <Waveform url={file} />}
            </Stack>
          </Drawer>
        )}
      </Container>
    </Page>
  );
}
