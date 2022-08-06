import { useEffect, useState, useContext } from "react";
// import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Grid,
  Container,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
// components
import Page from "../components/Page";
import UserNftCard from "../components/UserNftCard";

import { getAllNftsFromWallet } from "../utils/getAllNftsFromWallet";
import { AppContext } from "../context/AppContext";

export default function MyNfts() {
  const { walletKey } = useContext(AppContext);
  const [nfts, setNfts] = useState(null);

  useEffect(() => {
    getAllNftsFromWallet(walletKey).then((res) => {
      setNfts(res);
    });
  }, [walletKey]);

  return (
    <Page title="My NFTs">
      <Container sx={{ p: 4, width: "100%" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          mt={10}
        >
          <Typography variant="h4" gutterBottom>
            My NFTs
          </Typography>
        </Stack>
        <Grid container spacing={4} justifyContent="center">
          {!nfts ? (
            <Grid item>
              <CircularProgress />
            </Grid>
          ) : (
            nfts.map((item) => (
              <Grid item>
                <UserNftCard item={item} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Page>
  );
}
