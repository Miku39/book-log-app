import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const url = "https://book-log-api.herokuapp.com/books";

function Books() {
  const [bookListJson, setBookListJson] = useState(null);
  const history = useHistory();

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
      {bookListJson.map((bookItem) => {
        return (
          <div
            key={bookItem.id}
            onClick={() => history.push("/books/" + bookItem.id)}
          >
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
          </div>
        );
      })}
    </div>
  );
}

export default Books;
