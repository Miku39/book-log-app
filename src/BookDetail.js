import React, { useState, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    margin: 16,
  },
  item: {
    padding: 8,
  },
  image: {
    width: "100%",
  },
});

const theme = createMuiTheme({
  typography: {
    h3: {
      lineHeight: 1,
    },
    subtitle1: {
      fontSize: "1.25rem",
    },
    subtitle2: {
      fontSize: "0.875rem",
      marginTop: 8,
    },
    body1: {
      color: "gray",
    },
  },
});

const url = "https://book-log-api.herokuapp.com/books";

function BookDetail(props) {
  const [bookDetailJson, setBookDetailJson] = useState(null);
  const id = parseInt(props.match.params.id, 10);
  const classes = useStyles();

  useEffect(() => {
    setBookDetailJson(null);
    const getBookDetail = async () => {
      const response = await fetch(`${url}/${id}`);
      const jsonData = await response.json();
      setBookDetailJson(jsonData);
    };

    getBookDetail();
  }, [id]);

  if (!bookDetailJson) {
    return <div>Loading</div>;
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div key={bookDetailJson.id} className={classes.root}>
        <Typography variant="h3">{bookDetailJson.title}</Typography>
        <Grid container justify="center">
          <Grid item xs={4} className={classes.item}>
            <img
              src={bookDetailJson.image_url}
              alt={bookDetailJson.title}
              width="128"
              height="160"
              className={classes.image}
            ></img>
          </Grid>
          <Grid item xs={8} className={classes.item}>
            <Typography variant="subtitle1">{bookDetailJson.author}</Typography>
            <Typography variant="body1">{bookDetailJson.date}</Typography>
            <Typography variant="subtitle2">{bookDetailJson.note}</Typography>
          </Grid>
        </Grid>
      </div>
    </MuiThemeProvider>
  );
}

export default BookDetail;
