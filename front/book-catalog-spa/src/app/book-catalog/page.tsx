"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Card, CardContent } from "@mui/material";
import { ChangeEvent } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
  publication_year: number;
};

export default function BookCatalog() {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState<number | "">("");

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:8000/api/books/");
    setBooks(response.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async () => {
    try {
      await axios.post("http://localhost:8000/api/books/", {
        title,
        author,
        publication_year: publicationYear,
      });
      fetchBooks();
    } catch (error) {
      console.error("Falha ao adicionar livro:", error);
      alert("Falha ao adicionar livro. Cheque o console para mais detalhes.");
    }
  };

  const deleteBook = async (id: number) => {
    await axios.delete(`http://localhost:8000/api/books/${id}/`);
    fetchBooks();
  };

  return (
    <div className="bg-stone-50 min-h-screen p-4">
      <TextField
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Author"
        variant="outlined"
        value={author}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAuthor(e.target.value)
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Year"
        type="number"
        variant="outlined"
        value={publicationYear}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPublicationYear(Number(e.target.value))
        }
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={addBook}>
        Add Book
      </Button>

      <h1 className="text-black mt-10">Book Catalog</h1>

      {books.map((book) => (
        <Card key={book.id} className="mt-4" style={{ marginTop: "16px" }}>
          <CardContent>
            <p>ID: {book.id}</p>
            <h3>Título: {book.title}</h3>
            <p>
              Autor(a): {book.author} - {book.publication_year}
            </p>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteBook(book.id)}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
