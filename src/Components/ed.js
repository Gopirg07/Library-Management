import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { data } from "../Data/data";
import * as yup from "yup";
import { useFormik } from "formik";

const bookSchemaValidation = yup.object({
  id: yup.number().required("Please enter The Book Id"),
  name: yup.string().required("Please enter The Book name"),
  author: yup.string().required("Please enter The Book author's name"),
  ISBN: yup.string().required("Please enter The Book's ISBN"),
  publicationDate: yup
    .string()
    .required("Please enter The Book's publicationDate"),
  edition: yup.string().required("Please enter The Book's edition"),
  publisher: yup.string().required("Please enter The Book's publisher"),
  genre: yup.string().required("Please enter The Book's genre"),
});

export default function EditBook({ books, setBooks }) {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const Data = data;

  const [idx, setIdx] = useState("");
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [edition, setEdition] = useState("");
  const [publisher, setPublisher] = useState("");
  const [genre, setGenre] = useState("");

  const selectedId = books.find((val) => val.id == id);
  useEffect(() => {
    setIdx(selectedId.id);
    setName(selectedId.name);
    setAuthor(selectedId.author);
    setIsbn(selectedId.ISBN);
    setPublicationDate(selectedId.publicationDate);
    setEdition(selectedId.edition);
    setPublisher(selectedId.publisher);
    setGenre(selectedId.genre);
  }, []);

  async function Edit() {
    const editedIndex = books.findIndex((val) => val.id == id);
    console.log(editedIndex);

    const editedBook = {
      id: idx,
      name,
      author,
      ISBN: isbn,
      publicationDate,
      edition,
      publisher,
      genre,
    };

    try {
      const response = await fetch(`${Data}/${idx}`, {
        method: "PUT",
        body: JSON.stringify(editedBook),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data=await response.json()
      console.log(data);
      books[editedIndex] = data;
      setBooks(books);
      navigate("/books");
    } catch (error) {
      console.log(error);
    }

    console.log(editedBook);
    books[editedIndex] = editedBook;
    setBooks(books);
    navigate("/books");
  }

  return (
    <div className="outer-edit-book">
      <div className="edit-book">
        <h2>Update The Book's Details</h2>
        <TextField
          id="outlined-basic" 
          value={idx}
          variant="outlined"
          onChange={(e) => setIdx(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          value={name}
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          value={author}
          variant="outlined"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          value={isbn}
          variant="outlined"
          onChange={(e) => setIsbn(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          value={publicationDate}
          variant="outlined"
          onChange={(e) => setPublicationDate(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          value={edition}
          variant="outlined"
          onChange={(e) => setEdition(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          value={publisher}
          variant="outlined"
          onChange={(e) => setPublisher(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          value={genre}
          variant="outlined"
          onChange={(e) => setGenre(e.target.value)}
        />
        <Button
          style={{ backgroundColor: "#9c27b0", color: "white" }}
          onClick={() => Edit()}
        >
          Update
        </Button>
      </div>
    </div>
  );
}
