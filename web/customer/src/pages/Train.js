/* eslint-disable jsx-a11y/media-has-caption */
import { useState, useRef, useEffect } from 'react';

import { Icon } from '@iconify/react';
import SwipeableViews from 'react-swipeable-views';
import { ReactMediaRecorder } from 'react-media-recorder';
// material
import { Stack, Container, Typography, Paper, Button, Grid, Backdrop } from '@mui/material';
import micFill from '@iconify/icons-eva/mic-fill';
// components
import Page from '../components/Page';
import Waveform from '../components/Waveform';
import { convertBlobUrlToFile } from '../utils/converters';

//

export default function Train() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const audioRef = useRef(null);
  const [open, setOpen] = useState(false);
  // const [openEditNewsModal, setOpenEditNewsModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const [sentencesAudios, setSentencesAudios] = useState({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null
  });

  useEffect(() => {
    if (document.getElementById('circular-id')) return;
    const script = document.createElement('script');
    script.id = 'circular-id';
    script.src = '/circular-audio-wave.min.js';
    // script.async = true;
    document.body.appendChild(script);
    script.onload = () => setScriptLoaded(true);
  }, []);

  useEffect(() => {
    if (scriptLoaded) {
      // const el = document.getElementById('chart-container');
      const el = audioRef.current;

      // eslint-disable-next-line no-undef
      if (el && window && CircularAudioWave) {
        // eslint-disable-next-line no-undef
        const wave = new CircularAudioWave(el, {
          loop: true
        });

        wave.loadAudio('/audio1.mp3');
      }
    }
  }, [scriptLoaded, open]);

  const TOTAL_STEP = 5;
  const content = [
    'This is train data 1',
    'This is train data 2',
    'This is train data 3',
    'This is train data 4',
    'This is train data 5'
  ];

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Training
          </Typography>
          {/* <Button
            variant="contained"
            onClick={() => setOpenEditNewsModal(true)}
            startIcon={<Icon icon={plusFill} />}
          >
            Training
          </Button> */}
        </Stack>
        <Paper
          component={SwipeableViews}
          index={activeStep}
          sx={{ margin: '2rem 0' }}
          elevation={4}
        >
          {Array.from(new Array(TOTAL_STEP)).map((_, idx) => (
            <Typography key={`traincontent${idx}`} sx={{ textAlign: 'center', p: 4 }}>
              {content[idx]}
            </Typography>
          ))}
        </Paper>
        <Grid container sx={{ width: '100%', mt: 5 }} justifyContent="center" alignItems="center">
          <Grid item>
            <Grid container component={Paper} spacing={4}>
              <Grid item>
                {/* <Button variant="contained" onClick={() => setOpen(true)}>
                  Speak
                </Button> */}
                <ReactMediaRecorder
                  audio
                  mediaRecorderOptions={{
                    mimeType: 'audio/wav',
                    audioBitsPerSecond: '16'
                  }}
                  // eslint-disable-next-line arrow-body-style
                  render={({
                    status,
                    startRecording,
                    stopRecording,
                    mediaBlobUrl,
                    clearBlobUrl
                  }) => (
                    <>
                      {/* <Typography variant="h4">{status}</Typography> */}

                      <Stack spacing={4} direction="row">
                        {/* <audio src={mediaBlobUrl} controls autoPlay loop /> */}
                        {status !== 'recording' && (
                          <Button
                            variant="contained"
                            onClick={() => {
                              clearBlobUrl();
                              startRecording();
                              setOpen(true);
                            }}
                          >
                            Start Recording
                          </Button>
                        )}
                        {status === 'recording' && (
                          <Button
                            variant="contained"
                            onClick={() => {
                              stopRecording();

                              // setSentencesAudios(prev => ({...prev, `${activeStep}`: mediaBlobUrl}))
                            }}
                          >
                            Stop Recording
                          </Button>
                        )}
                        <Grid item>
                          {activeStep !== 4 ? (
                            <Button
                              variant="contained"
                              onClick={async () => {
                                // eslint-disable-next-line consistent-return
                                setActiveStep((prev) => {
                                  if (prev <= 4) {
                                    return prev + 1;
                                  }
                                });
                                const audioFile = await convertBlobUrlToFile(mediaBlobUrl);
                                setSentencesAudios((prev) => ({
                                  ...prev,
                                  [activeStep]: audioFile
                                }));

                                // convert blob url to blob
                                // const audioBlob = await fetch(sentencesAudios[activeStep]).then(
                                //   (r) => r.blob()
                                // );

                                // get audio binary file from blon
                                // const audiofile = new File([audioBlob], `wav_file.wav`, {
                                //   type: 'audio/wav'
                                // });
                                // formData.append(activeStep, audiofile);
                                clearBlobUrl();
                              }}
                            >
                              Next
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              onClick={async () => {
                                // console.log(formData.forEach());
                                // formData.forEach((item) => {
                                //   console.log);
                                // });
                                const audioFile = await convertBlobUrlToFile(mediaBlobUrl);
                                // setSentencesAudios((prev) => ({
                                //   ...prev,
                                //   [activeStep]: audioFile
                                // }));
                                // eslint-disable-next-line no-restricted-syntax
                                const formData = new FormData();

                                formData.append('0', sentencesAudios['0']);
                                formData.append('1', sentencesAudios['1']);
                                formData.append('2', sentencesAudios['2']);
                                formData.append('3', sentencesAudios['3']);
                                formData.append('4', audioFile);

                                // eslint-disable-next-line no-restricted-syntax
                                for (const pair of formData.entries()) {
                                  console.log(`${pair[0]}, ${pair[1]}`);
                                }
                                // convert blob url to blob
                                // const audioBlob = await fetch(sentencesAudios[activeStep]).then(
                                //   (r) => r.blob()
                                // );

                                // // get audio binary file from blob
                                // const audiofile = new File([audioBlob], `wav_file${}.wav`, {
                                //   type: 'audio/wav'
                                // });
                                // formData.append(activeStep, audiofile);
                              }}
                            >
                              Submit
                            </Button>
                          )}
                        </Grid>
                      </Stack>
                      <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                        onClick={() => {
                          setOpen(false);
                          stopRecording();
                        }}
                      >
                        <div
                          ref={audioRef}
                          id="chart-container"
                          style={{
                            visibility: open ? 'visible' : 'hidden',
                            height: '100%',
                            width: '100%'
                          }}
                        />
                        <Icon
                          icon={micFill}
                          color="#ff0000"
                          height={82}
                          style={{
                            position: 'absolute'
                          }}
                        />
                      </Backdrop>

                      <Grid container sx={{ width: '100%' }}>
                        <Grid item sx={{ width: '100%' }}>
                          {mediaBlobUrl && status === 'stopped' && <Waveform url={mediaBlobUrl} />}
                        </Grid>
                      </Grid>
                    </>
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <Button
          onClick={() => {
            setActiveStep((prev) => prev + 1);
          }}
        >
          Next Step
        </Button> */}
      </Container>
    </Page>
  );
}
