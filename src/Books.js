import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    margin: 16,
  },
  grid: {
    margin: 8,
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
      <h1>Book List</h1>
      {bookListJson.map((bookItem) => (
        <Grid
          container
          justify="center"
          key={bookItem.id}
          onClick={() => history.push("/books/" + bookItem.id)}
          className={classes.grid}
        >
          <Grid item xs={5} md={2}>
            <img
              src={bookItem.image_url}
              alt={bookItem.title}
              // width={"100%"}
            ></img>
          </Grid>
          <Grid item xs={7} md={10}>
            <Grid container justify="center">
              <Grid item xs={12} md={7}>
                {bookItem.title}
              </Grid>
              <Grid item xs={12} md={3}>
                {bookItem.author}
              </Grid>
              <Grid item xs={12} md={2}>
                {bookItem.date}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </div>
  );
}

export default Books;
