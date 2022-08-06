// material
import { styled } from "@mui/material/styles";
import { Container, Typography, Paper } from "@mui/material";
// layouts
// components
import Page from "../components/Page";
import { LoginForm } from "../components/authentication/login";
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle title="Login | Customer">
      <Container maxWidth="sm">
        <ContentStyle>
          <Paper sx={{ mb: 5, textAlign: "center", p: 6 }} elevation={2}>
            <Typography variant="h4" gutterBottom>
              Log in | Customer
            </Typography>
            {/* <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography> */}

            <LoginForm />
          </Paper>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
