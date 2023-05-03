import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Home from "./Home";
import Books from "./Books";
import AddBook from "./AddBook";
import EditBook from "./EditBook";
import { data } from "../Data/data"; 


export function Nav() {
  
  const navigate = useNavigate();
  const [books,setBooks] = useState([]); 
  

  return (
    <div className="Nav">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#9c27b0" }}>
          <Toolbar>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1 }}
              onClick={() => navigate("/")}
            >
              Library Management
            </Typography>
            <Button
              color="inherit"
              style={{ fontSize: "16px", fontWeight: 600 }}
              onClick={() => navigate("/books")}
            >
              Books
            </Button>
            <Button
              color="inherit"
              style={{ fontSize: "16px", fontWeight: 600 }}
              onClick={() => navigate("/addbook")}
            >
              Add Book
            </Button>
          </Toolbar>
        </AppBar>
      </Box> 

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/books" element={<Books books={books}setBooks={setBooks}/>} />
        <Route path="/addBook" element={<AddBook books={books}setBooks={setBooks}/>} />
        <Route path="/edit/:id" element={<EditBook books={books}setBooks={setBooks}/>} /> 
      </Routes>

    </div>
  );
}
