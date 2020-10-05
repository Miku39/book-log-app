import React, { useState, useEffect } from "react";

const url = "https://book-log-api.herokuapp.com/books";

function BookDetail(props) {
  const [bookDetailJson, setBookDetailJson] = useState(null);
  const id = parseInt(props.match.params.id, 10);

  // TODO: async awaitを使用する
  useEffect(() => {
    fetch(`${url}/${id}`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setBookDetailJson(json);
      });
  }, []);

  if (!bookDetailJson) {
    return <div>Loading</div>;
  }

  return <div>aiueo</div>;
}

export default BookDetail;
