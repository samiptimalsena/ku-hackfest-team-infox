import { Button, Icon, Stack, Typography } from '@mui/material';
import googleFill from '@iconify/icons-eva/google-fill';
import { signInWithGoogle } from '../service/firebase';
// import { signInWithGoogle } from '../service/firebase';

export default function LoginWith() {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          onClick={signInWithGoogle}
        >
          <Icon icon={googleFill} color="#DF3E30" height={24} />
          <Typography>Login with Google</Typography>
        </Button>
      </Stack>
    </>
  );
}
