import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    margin: 16,
  },
  grid: {
    margin: 4,
  },
  item: {
    padding: 8,
  },
  image: {
    width: "100%",
  },
});

const url = "https://book-log-api.herokuapp.com/books";

function Books() {
  const [bookListJson, setBookListJson] = useState(null);
  const history = useHistory();
  const classes = useStyles();

  // call book list api
  useEffect(() => {
    const getBookList = async () => {
      const response = await fetch(url);
      const jsonData = await response.json();
      setBookListJson(jsonData);
    };
    getBookList();
  }, []);

  if (!bookListJson) {
    return <div>Loading</div>;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h1">Book List</Typography>
      {bookListJson.map((bookItem) => (
        <Grid
          container
          justify="center"
          key={bookItem.id}
          onClick={() => history.push("/books/" + bookItem.id)}
          className={classes.grid}
        >
          <Grid item xs={4} md={2} className={classes.item}>
            <img
              src={bookItem.image_url}
              alt={bookItem.title}
              className={classes.image}
            ></img>
          </Grid>
          <Grid item xs={8} md={10} className={classes.item}>
            <Grid container justify="center">
              <Grid item xs={12} md={7}>
                <Typography variant="subtitle1">{bookItem.title}</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="subtitle2">{bookItem.author}</Typography>
              </Grid>
              <Grid item xs={12} md={2}>
                <Typography variant="body2">{bookItem.date}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </div>
  );
}

export default Books;
