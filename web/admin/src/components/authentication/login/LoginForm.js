import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import googleFill from '@iconify/icons-eva/google-fill';
import walletFill from '@iconify/icons-ic/account-balance-wallet';
// material
import { Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AppContext } from '../../../context/AppContext';
import publicFetch from '../../../utils/fetch';
import { AuthContext } from '../../../context/AuthContext';
import { signInWithGoogle } from '../../../service/firebase';

// ----------------------------------------------------------------------

export default function LoginForm() {
  return (
    <Stack spacing={2}>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="primary"
        variant="contained"
        onClick={signInWithGoogle}
        loading={false}
      >
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          <Icon icon={googleFill} color="#ffffff" height={24} />

          <Typography variant="button" sx={{ fontSize: 16 }}>
            Login With Google
          </Typography>
        </Stack>
      </LoadingButton>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="primary"
        variant="contained"
        loading={false}
      >
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          <Icon icon={walletFill} color="#ffffff" height={24} />
          <Typography variant="button" sx={{ fontSize: 16 }}>
            Login With Wallet
          </Typography>
        </Stack>
      </LoadingButton>
    </Stack>
  );
}
