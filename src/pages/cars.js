import { useState } from "react";
import { useRouter } from "next/router";
import Grid from "@material-ui/core/Grid";
import deepEqual from "fast-deep-equal";
import { stringify } from "querystring";
import useSWR from "swr";
import { mongodb_connect } from "../../utils";
import { getMakes, getModels, getCars } from "../database";
import CarPagination from "../components/CarPagination";
import CaraCard from "../components/carCard";
import Search from ".";
import { swrFetcher } from "../../utils";

const carsList = ({ makes, models, filteredCars }) => {
  const { query } = useRouter();
  const [serverQuery] = useState(query);

  const { data } = useSWR("/api/getCars?" + stringify(query), swrFetcher, {
    dedupingInterval: 15000,
    initialData: deepEqual(query, serverQuery)
      ? { cars: filteredCars.cars, totalPages: filteredCars.totalPages }
      : undefined,
  });

  if (data?.cars?.length === 0 || filteredCars?.cars?.length === 0) {
    return (
      <Grid container justify="center" spacing={3}>
        <Grid item xs={12} sm={5} md={3} lg={2}>
          <Search makes={makes} models={models} singleColumn />
        </Grid>
        <Grid container item xs={12} sm={7} md={9} lg={10} spacing={3}>
          <h1>Sorry car not found 🤭</h1>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container justify="center" spacing={3}>
      <Grid item xs={12} sm={5} md={3} lg={2}>
        <Search makes={makes} models={models} singleColumn />
      </Grid>
      <Grid container item xs={12} sm={7} md={9} lg={10} spacing={3}>
        <Grid item xs={12}>
          <CarPagination totalPages={data?.totalPages ? data?.totalPages : 1} />
        </Grid>
        {(data?.cars || []).map((car) => {
          return (
            <Grid key={car._id} item xs={12} sm={6}>
              <CaraCard car={car} />
            </Grid>
          );
        })}
        <Grid item xs={12}>
          <CarPagination totalPages={data?.totalPages ? data?.totalPages : 1} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export const getServerSideProps = async (ctx) => {
  mongodb_connect();
  const { make, model, minPrice, maxPrice, page, limit } = ctx.query;

  const cars = await getMakes();
  const models = await getModels(make);

  const query = {
    make: make,
    model: model,
    price: {
      minPrice,
      maxPrice,
    },
  };

  const filteredCars = await getCars(query, page, limit);

  return {
    props: {
      makes: JSON.parse(JSON.stringify(cars)),
      models: JSON.parse(JSON.stringify(models)),
      filteredCars: JSON.parse(JSON.stringify(filteredCars)),
    },
  };
};

export default carsList;
