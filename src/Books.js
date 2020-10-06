import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const url = "https://book-log-api.herokuapp.com/books";

function Books() {
  const [bookListJson, setBookListJson] = useState(null);

  // TODO: async awaitを使用する
  useEffect(() => {
    fetch(url)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setBookListJson(json);
      });
  }, []);

  if (!bookListJson) {
    return <div>Loading</div>;
  }

  return (
    <div>
      {bookListJson.map((bookItem) => {
        return (
          <div key={bookItem.id}>
            <div>{bookItem.title}</div>
            <div>{bookItem.author}</div>
            <div>
              <img
                src={bookItem.image_url}
                alt={bookItem.title}
                width="128"
                height="160"
              ></img>
            </div>
            <Link to={"/books/" + bookItem.id}>詳細</Link>
          </div>
        );
      })}
    </div>
  );
}

export default Books;
