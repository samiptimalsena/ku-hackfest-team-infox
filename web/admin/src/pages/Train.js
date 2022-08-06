/* eslint-disable jsx-a11y/media-has-caption */
import { useState, useRef, useEffect } from 'react';

import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import SwipeableViews from 'react-swipeable-views';
import { ReactMediaRecorder } from 'react-media-recorder';
import axios from 'axios';
// material
import { Stack, Container, Typography, Paper, Button, Grid, Backdrop, Card } from '@mui/material';
import micFill from '@iconify/icons-eva/mic-fill';
// components
import Page from '../components/Page';
import Waveform from '../components/Waveform';
import { convertBlobUrlToFile } from '../utils/converters';
import ModelCard from '../components/ModelCard';
//
const later = (delay, value) => new Promise((resolve) => setTimeout(resolve, delay, value));
export default function Train() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const audioRef = useRef(null);
  const [open, setOpen] = useState(false);
  // const [openEditNewsModal, setOpenEditNewsModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showTrainedModel, setShowTrainedModel] = useState(false);

  const [sentencesAudios, setSentencesAudios] = useState({
    0: null,
    1: null
    // 2: null,
    // 3: null,
    // 4: null
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

  const TOTAL_STEP = 2;
  const content = [
    'This is train data 1',
    'This is train data 2'
    // 'This is train data 3',
    // 'This is train data 4',
    // 'This is train data 5'
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
        {showTrainedModel ? (
          <ModelCard />
        ) : (
          <>
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
            <Grid
              container
              sx={{ width: '100%', mt: 5 }}
              justifyContent="center"
              alignItems="center"
            >
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
                              {activeStep !== 1 ? (
                                <Button
                                  variant="contained"
                                  onClick={async () => {
                                    // eslint-disable-next-line consistent-return
                                    setActiveStep((prev) => {
                                      if (prev <= 4) {
                                        return prev + 1;
                                      }
                                    });
                                    const audioFile = await convertBlobUrlToFile(
                                      mediaBlobUrl,
                                      activeStep
                                    );
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
                                    const audioFile = await convertBlobUrlToFile(
                                      mediaBlobUrl,
                                      activeStep
                                    );
                                    // setSentencesAudios((prev) => ({
                                    //   ...prev,
                                    //   [activeStep]: audioFile
                                    // }));
                                    // eslint-disable-next-line no-restricted-syntax
                                    const formData = new FormData();

                                    formData.append('0', sentencesAudios['0']);
                                    // formData.append('1', sentencesAudios['1']);
                                    // formData.append('2', sentencesAudios['2']);
                                    // formData.append('3', sentencesAudios['3']);
                                    formData.append('1', audioFile);

                                    // eslint-disable-next-line no-restricted-syntax
                                    for (const pair of formData.entries()) {
                                      console.log(`${pair[0]}, ${pair[1]}`);
                                    }

                                    // setTimeout(() => {}, []);
                                    toast.promise(
                                      (async () => {
                                        try {
                                          // await later(3000, 'sendaudio');
                                          // setTimeout(() => {
                                          //   console.log('done!!');
                                          // }, [3000]);
                                          // appContext.handleAlert({
                                          //   severity: 'success',
                                          //   message: 'Sending Audio...'
                                          // });
                                          // toast.success('Recording Stopped');
                                          // const res = await publicFetch.post(`app/${title}/`, formData);
                                          // appContext.handleAlert({
                                          //   severity: 'success',
                                          //   message: 'Audio sent'
                                          // });
                                          // console.log(res);
                                          // const { data } = res;
                                          // setOutput(data.output);
                                          // console.log('data from res', data.output);
                                          await axios.post(
                                            'http://127.0.0.1:4000/upload',
                                            formData
                                          );

                                          setShowTrainedModel(true);
                                        } catch (error) {
                                          throw console.log(error);
                                          // appContext.handleAlert({
                                          //   severity: 'error',
                                          //   message: 'Could not send audio.'
                                          // });
                                        }
                                      })(),
                                      {
                                        loading: <h3>Sending Audio...</h3>,
                                        success: <h3>Audio sent</h3>,
                                        error: <h3>Could not send audio.</h3>
                                      }
                                    );
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
                              {mediaBlobUrl && status === 'stopped' && (
                                <Waveform url={mediaBlobUrl} />
                              )}
                            </Grid>
                          </Grid>
                        </>
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Page>
  );
}
