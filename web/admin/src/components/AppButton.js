import { CircularProgress, Grid } from '@mui/material';
import Button from '@mui/material/Button';

export default function AppButton(props) {
  return (
    <Button {...props}>
      <Grid container>
        {props?.loading ? (
          <Grid item>
            <CircularProgress />
          </Grid>
        ) : null}
        <Grid item>{props.children}</Grid>
      </Grid>
    </Button>
  );
}
