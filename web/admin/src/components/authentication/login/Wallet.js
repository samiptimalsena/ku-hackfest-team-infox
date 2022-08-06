import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import walletFill from '@iconify/icons-ic/account-balance-wallet';
// import { PublicKey, Transaction } from "@solana/web3.js";
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';

const Wallet = () => {
  const appContext = useContext(AppContext);
  const [provider, setProvider] = useState(undefined);
  //   const [walletKey, setWalletKey] = useState(undefined);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  /**
   * @description gets Phantom provider, if it exists
   */
  const getProvider = () => {
    if ('solana' in window) {
      // @ts-ignore
      const provider = window.solana;
      if (provider.isPhantom) return provider;
    }
  };

  const buf2hex = (buffer) =>
    [...new Uint8Array(buffer)].map((x) => x.toString(16).padStart(2, '0')).join('');

  const askForSinging = async () => {
    const message = `TTS API ACCESS`;
    const encodedMessage = new TextEncoder().encode(message);
    const { signature } = await provider.signMessage(encodedMessage, 'utf8');
    console.log(signature);
    const sigHex = console.log(buf2hex(signature));
    return sigHex;
  };

  /**
   * @description prompts user to connect wallet if it exists
   */
  const connectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    if (solana) {
      try {
        const response = await solana.connect();
        console.log('wallet account ', response.publicKey.toString());
        appContext.setWalletKey(response.publicKey.toString());
        navigate('/explore');
      } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
      }
    }
  };

  /**
   * @description disconnect Phantom wallet
   */
  const disconnectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    if (appContext.walletKey && solana) {
      await solana.disconnect();
      appContext.setWalletKey(undefined);
    }
  };

  // detect phantom provider exists
  useEffect(() => {
    const provider = getProvider();

    if (provider) setProvider(provider);
    else setProvider(undefined);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {provider && !appContext.walletKey && (
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            color="primary"
            variant="contained"
            loading={isClicked && appContext.walletKey}
            onClick={() => {
              setIsClicked(true);
              connectWallet();
            }}
          >
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
              <Icon icon={walletFill} color="#ffffff" height={24} />
              <Typography variant="button" sx={{ fontSize: 16 }}>
                Connect to Phantom Wallet
              </Typography>
            </Stack>
          </LoadingButton>
          //   <button
          //     style={{
          //       fontSize: "16px",
          //       padding: "15px",
          //       fontWeight: "bold",
          //       borderRadius: "5px",
          //     }}
          //     onClick={connectWallet}
          //   >
          //     Connect to Phantom Wallet
          //   </button>
        )}

        {provider && appContext.walletKey && (
          <div>
            <p>Connected account {appContext.walletKey}</p>
            <button
              style={{
                fontSize: '16px',
                padding: '15px',
                fontWeight: 'bold',
                borderRadius: '5px',
                margin: '15px auto'
              }}
              onClick={disconnectWallet}
            >
              Disconnect
            </button>
          </div>
        )}

        {!provider && (
          <p>
            No provider found. Install <a href="https://phantom.app/">Phantom Browser extension</a>
          </p>
        )}
      </header>
      {/* <button onClick={askForSinging}>
        <h1>Give me TTS</h1>
      </button> */}
    </div>
  );
};

export { Wallet };
