import { useRouter } from "next/router";
import { Head } from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useForm, Controller } from "react-hook-form";
import { mongodb_connect, getAsString } from "../../utils";
import { getMakes, getModels } from "../database";
import ModelSelect from "../components/ModelSelect";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "auto",
    maxWidth: 500,
    padding: theme.spacing(3),
  },
}));

const prices = [1000, 10000, 50000, 100000, 250000, 500000, 1000000, 2000000];

const Search = ({ makes, models, singleColumn }) => {
  const classes = useStyles();
  const { handleSubmit, control, setValue, getValues, watch } = useForm();
  const router = useRouter();
  const {
    query: { make, model, minPrice, maxPrice },
  } = router;

  const query = {
    make: getAsString(make) || "all",
    model: getAsString(model) || "all",
    minPrice: getAsString(minPrice) || "all",
    maxPrice: getAsString(maxPrice) || "all",
  };
  const smValue = singleColumn ? 12 : 6;

  const onSubmit = ({
    "make-select": make,
    "model-select": model,
    "min-price-select": minPrice,
    "max-price-select": maxPrice,
  }) => {
    router.push(
      {
        pathname: "/cars",
        query: { make, model, minPrice, maxPrice, page: 1 },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
    <Head>
      <meta name="google-site-verification" content="LXQPnPe6B7rtQCd_ac1V5ztCtck7Xe-_KzG8OaTO7Dk" />
    </Head>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={5} className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={smValue}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="make-select">Make</InputLabel>
                <Controller
                  control={control}
                  name="make-select"
                  defaultValue={query.make ? query.make : "all"}
                  value={query.make ? query.make : "all"}
                  label="Make"
                  labelId="make-select"
                  render={({ onChange, ref }) => (
                    <Select
                      inputRef={ref}
                      defaultValue={query.make ? query.make : "all"}
                      label="Make"
                      labelId="make-select"
                      onChange={(e) => {
                        setValue("model-select", "all");
                        return onChange(e.target.value);
                      }}
                    >
                      <MenuItem value="all">
                        <em>All makes</em>
                      </MenuItem>
                      {makes.map((make) => (
                        <MenuItem
                          key={make.make}
                          value={make.make}
                        >{`${make.make} (${make.count})`}</MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={smValue}>
              <ModelSelect
                models={models}
                defaultValue={query.model ? query.model : "all"}
                value={query.model ? query.model : "all"}
                control={control}
                name="model-select"
                watch={watch}
              />
            </Grid>

            <Grid item xs={12} sm={smValue}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="min-price-select">Min price</InputLabel>
                <Controller
                  as={
                    <Select>
                      <MenuItem value="all">
                        <em>All prices</em>
                      </MenuItem>
                      {prices.map((price) => (
                        <MenuItem key={price} value={price}>
                          {price}
                        </MenuItem>
                      ))}
                    </Select>
                  }
                  control={control}
                  name="min-price-select"
                  defaultValue={query.minPrice ? query.minPrice : "all"}
                  value={query.minPrice ? query.minPrice : "all"}
                  labelId="min-price-select"
                  label="Min price"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={smValue}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="max-price-select">Max price</InputLabel>
                <Controller
                  as={
                    <Select>
                      <MenuItem value="all">
                        <em>All prices</em>
                      </MenuItem>
                      {prices.map((price) => (
                        <MenuItem key={price} value={price}>
                          {price}
                        </MenuItem>
                      ))}
                    </Select>
                  }
                  control={control}
                  name="max-price-select"
                  defaultValue={query.maxPrice ? query.maxPrice : "all"}
                  value={query.maxPrice ? query.maxPrice : "all"}
                  labelId="max-price-select"
                  label="Max price"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  mongodb_connect();
  const { make } = ctx.query;

  const [makes, models] = await Promise.all([
    getMakes(),
    getModels(getAsString(make)),
  ]);

  return {
    props: {
      makes: JSON.parse(JSON.stringify(makes)),
      models: JSON.parse(JSON.stringify(models)),
    },
  };
};

export default Search;
