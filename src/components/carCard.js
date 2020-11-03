import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  anchorTag: {
    textDecoration: "none",
  },
}));

export default function RecipeReviewCard({ car }) {
  const classes = useStyles();

  return (
    <Link
      href={"/car/[make]/[brand]/[id]"}
      as={`/car/${car.make}/${car.model}/${car._id}`}
    >
      <a className={classes.anchorTag}>
        <Card elevation={5}>
          <CardHeader
            title={`${car.make} ${car.model}`}
            subheader={`$${car.price}`}
          />
          <CardMedia
            className={classes.media}
            image={`${car.photoUrl}`}
            title={`${car.make} ${car.model}`}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {car.details}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
