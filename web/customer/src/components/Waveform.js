/* eslint-disable jsx-a11y/media-has-caption */

import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Icon } from '@iconify/react';

import playFill from '@iconify/icons-eva/play-circle-fill';
import pauseFill from '@iconify/icons-eva/pause-circle-fill';
import { Button, Paper, Typography } from '@mui/material';
import { WaveformContianer, Wave } from './WaveFormStyledComponents';

class Waveform extends Component {
  constructor() {
    super();
    this.state = {
      playing: false
    };
  }

  componentDidMount() {
    const track = document.querySelector('#track');

    this.waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: '#waveform',
      backend: 'WebAudio',
      height: 80,
      progressColor: '#2D5BFF',
      responsive: true,
      waveColor: '#EFEFEF',
      cursorColor: 'transparent'
    });

    this.waveform.load(track);
  }

  handlePlay = () => {
    this.setState((prev) => ({ playing: !prev.playing }));
    this.waveform.playPause();
  };

  render() {
    console.log({ url: this.props.url });
    const url = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3';

    return (
      <Paper elevation={4} sx={{ mt: 10, p: 4 }}>
        <Typography variant="h3">Review your input</Typography>
        <WaveformContianer>
          <Wave id="waveform" style={{ height: '100%', width: '100%' }} />
          <Button onClick={this.handlePlay} sx={{ background: 'transparent' }} disableRipple>
            {!this.state.playing ? (
              <Icon icon={playFill} height={60} />
            ) : (
              <Icon icon={pauseFill} height={60} />
            )}
          </Button>
          <audio id="track" src={this.props?.demo ? url : this.props.url} />
        </WaveformContianer>
      </Paper>
    );
  }
}

export default Waveform;
