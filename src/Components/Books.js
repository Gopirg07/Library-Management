import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { data } from "../Data/data";

export default function Books({ books, setBooks }) {
  const Data = data;

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetch(Data, {
          method: "GET",
        });
        const data = await response.json();
        console.log(data);
        setBooks(data);
        if (!data) {
          console.log("unable to fetch data");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  }, []);

  const navigate = useNavigate();

  async function deleteBook(id) {
    try {
      const response = await fetch(`${Data}/${id}`, {
        method: "Delete",
      });
      const data = await response.json();
      console.log("deleted data", data)

      const alteredBooks = books.filter((book) => book.id !== id);
      setBooks(alteredBooks);

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="Books">
      <h1 className="titles">Available Books In Library</h1>
      <div className="book-list">
        {books.map((val, index) => (
          <div className="singlecard" key={index}>
            <Card style={{ width: "18rem", textAlign: "center" }}>
              <Card.Header
                as="h5"
                style={{ backgroundColor: "#9c27b0", color: "white" }}
              >
                {val.name}
              </Card.Header>

              <Card.Body>
                <p>Author : {val.author}</p>
                <p>ISBN : {val.ISBN}</p>
                <p>Publication Date : {val.publicationDate}</p>
                <p>Edition : {val.edition}</p>
                <p>Publisher : {val.publisher}</p>
                <p>Genre : {val.genre}</p>

                <div className="editDelete">
                  <IconButton onClick={() => navigate(`/edit/${val.id}`)}>
                    <EditIcon style={{ color: "#9c27b0" }} />
                  </IconButton>
                  <IconButton onClick={() => deleteBook(val.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
