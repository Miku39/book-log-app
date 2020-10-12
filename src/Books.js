import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    margin: 16,
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
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        {bookListJson.map((bookItem) => (
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            key={bookItem.id}
            onClick={() => history.push("/books/" + bookItem.id)}
          >
            <Grid item xs={5}>
              <img src={bookItem.image_url} alt={bookItem.title}></img>
            </Grid>
            <Grid item xs={5}>
              <div>{bookItem.title}</div>
              <div>{bookItem.author}</div>
              <div>{bookItem.date}</div>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Books;
