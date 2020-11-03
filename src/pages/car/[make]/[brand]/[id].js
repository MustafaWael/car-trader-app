import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { mongodb_connect } from "../../../../../utils";
import { Car } from "../../../../../models/models";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  image: {
    width: "100%",
    height: "100%",
    margin: 0,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const CarPage = ({ car }) => {
  const classes = useStyles();

  if (!car) {
    return <h1>Sorry car not found 🤭</h1>;
  }

  return (
    <>
      <Head>
        <title>{`${car.make} ${car.model}`}</title>
      </Head>
      <div>
        <Paper className={classes.paper}>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12} sm={6} md={5}>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={car.photoUrl} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm={6} md={7} container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {`${car.make} ${car.model}`}
                  </Typography>
                  <Typography variant="subtitle1">$19.00</Typography>
                  <Typography variant="subtitle1">Year: {car.year}</Typography>
                  <Typography variant="subtitle1">
                    KMs: {car.kilometers}
                  </Typography>
                  <Typography variant="subtitle1">
                    Fuel type : {car.fuelType}
                  </Typography>

                  <Typography variant="subtitle1" color="textSecondary">
                    Details : {car.details}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const { make, id } = ctx.query;
  mongodb_connect();
  try {
    const car = await Car.findById({ _id: id });

    return {
      props: { car: car ? JSON.parse(JSON.stringify(car)) : null },
    };
  } catch (err) {
    return { props: { car: null } };
  }
};

export default CarPage;
