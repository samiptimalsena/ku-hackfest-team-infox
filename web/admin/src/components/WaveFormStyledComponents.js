import { styled } from '@mui/system';

export const WaveformContianer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  // height: '100px',
  width: '100%',
  background: 'transparent'
});

export const Wave = styled('div')({
  width: '100%',
  height: '90px'
});

export const PlayButton = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '60px',
  height: '60px',
  background: '#EFEFEF',
  borderRadius: '50%',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  paddingBottom: '3px',
  '&:hover': {
    background: '#DDD'
  }
});
