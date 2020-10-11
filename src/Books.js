import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
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
    <div>
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
            <Grid item xs={2}>
              <img src={bookItem.image_url} alt={bookItem.title}></img>
            </Grid>
            <Grid item xs={6}>
              <div>{bookItem.title}</div>
              <div>{bookItem.author}</div>
            </Grid>
            <Grid item xs={2}>
              {bookItem.date}
            </Grid>
          </Grid>
        ))}
      </Grid>
      {/* <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableBody>
            {bookListJson.map((bookItem) => (
              <TableRow
                key={bookItem.id}
                onClick={() => history.push("/books/" + bookItem.id)}
              >
                <TableCell width="30%">
                  <img src={bookItem.image_url} alt={bookItem.title}></img>
                </TableCell>
                <TableCell width="40%">
                  <div>{bookItem.title}</div>
                  <div>{bookItem.author}</div>
                </TableCell>
                <TableCell width="20%">{bookItem.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  );
}

export default Books;
