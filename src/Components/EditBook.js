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
  
  const selectedId = books.find((val) => val.id == id);
  
  //formik validations
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        id:selectedId. id,
        name:selectedId.name,
        author:selectedId.author,
        ISBN:selectedId.ISBN,
        publicationDate:selectedId.publicationDate,
        edition:selectedId.edition,
        publisher:selectedId.publisher,
        genre:selectedId.genre,
      },
      validationSchema: bookSchemaValidation,

      onSubmit: (val) => {
        console.log("OnSubmit Called", val);
        Edit(val);
      },
    });    
  async function Edit(val) {
    const editedIndex = books.findIndex((vall) => vall.id == id);
    console.log(editedIndex); 

    try {
      const response = await fetch(`${Data}/${values.id}`, {
        method: "PUT",
        body: JSON.stringify(val),
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

    console.log(val);
    books[editedIndex] = val;
    setBooks(books);
    navigate("/books");
  }

  return (
    <div className="outer-edit-book">
      <form className="edit-book" onSubmit={handleSubmit}>
        <h2>Add A New Book</h2>
        <TextField
          id="outlined-basic"
          label="ID"
          variant="outlined"
          onBlur={handleBlur}
          name="id"
          type="text"
          value={values.id}
          onChange={handleChange}
        />
       {touched.id && errors.id ?<p style={{ color: "red" }}>{errors.id}</p> : ""}

        <TextField
          id="outlined-basic"
          label="enter The Book's name "
          variant="outlined"
          onBlur={handleBlur}
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
        />
        {touched.name && errors.name ?<p style={{ color: "red" }}>{errors.name}</p> : ""}

        <TextField
          id="outlined-basic"
          label="enter The Book author's"
          variant="outlined"
          onBlur={handleBlur}
          name="author"
          type="text"
          value={values.author}
          onChange={handleChange}
        />
       {touched.author && errors.author ? <p style={{ color: "red" }}>{errors.author}</p> : ""}

        <TextField
          id="outlined-basic"
          label="enter The Book's ISBN"
          variant="outlined"
          onBlur={handleBlur}
          name="ISBN"
          value={values.ISBN}
          onChange={handleChange}
        />
        {touched.ISBN && errors.ISBN ? <p style={{ color: "red" }}>{errors.ISBN}</p> : ""}

        <TextField
          id="outlined-basic"
          label="enter The Book's publicationDate"
          variant="outlined"
          onBlur={handleBlur}
          name="publicationDate"
          value={values.publicationDate}
          onChange={handleChange}
        />
        {touched.publicationDate && errors.publicationDate ? <p style={{ color: "red" }}>{errors.publicationDate}</p> : ""}

        <TextField
          id="outlined-basic"
          label="enter The Book's edition"
          variant="outlined"
          onBlur={handleBlur}
          name="edition"
          value={values.edition}
          onChange={handleChange}
        />
        {touched.edition && errors.edition ? <p style={{ color: "red" }}>{errors.edition}</p> : ""}

        <TextField
          id="outlined-basic"
          label="  enter The Book's publisher"
          variant="outlined"
          onBlur={handleBlur}
          name="publisher"
          value={values.publisher}
          onChange={handleChange}
        />
        {touched.publisher && errors.publisher ? <p style={{ color: "red" }}>{errors.publisher}</p> : ""}

        <TextField
          id="outlined-basic"
          label="enter The Book's genre"
          variant="outlined"
          onBlur={handleBlur}
          name="genre"
          value={values.genre}
          onChange={handleChange}
        />
        {touched.genre && errors.genre ?<p style={{ color: "red" }}>{errors.genre}</p> : ""}

        <Button
          style={{ backgroundColor: "#9c27b0", color: "white" }}
          type="submit"
          // onClick={() =>console.log("Hi")}
        >
          Edit
        </Button>
      </form>
    </div>
  );
}
