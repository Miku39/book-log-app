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

  return (
    <div>
      <div key={bookDetailJson.id}>
        <div>{bookDetailJson.title}</div>
        <div>{bookDetailJson.author}</div>
        <div>{bookDetailJson.date}</div>
        <div>{bookDetailJson.note}</div>
        <div>
          <img
            src={bookDetailJson.image_url}
            alt={bookDetailJson.title}
            width="128"
            height="160"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
