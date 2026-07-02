const API_URL = "http://localhost:8000/books";

export async function getBooks() {
  const response = await fetch(API_URL);

  return await response.json();
}

export async function addBook(book) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error("Failed to add book");
  }

  return response.json();
}


export async function updateBook(book) {
  const response = await fetch(`${API_URL}/${book.id}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book.title, book.content, book.collectionId),
  });

  if (!response.ok) {
    throw new Error("Failed to update book");
  }

  return response.json();
}


export async function moveBookToTrash(bookId){
  const response = await fetch(`${API_URL}/${bookId}./trash`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Failed to move book to trash");
  }

  return response.ok
}


export async function restoreBook(bookId){
  const response = await fetch(`${API_URL}/${bookId}/restore`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Failed to restore book");
  }

  return response.ok
}


export async function deleteBookForever(bookId){
  const response = await fetch(`${API_URL}/${bookId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete book");
  }

  return response.ok
}


export async function updateBookProgress(bookId, inputProgress){
  const response = await fetch(`${API_URL}/${bookId}/progress`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({currentProgress: inputProgress}),
  });

  if (!response.ok) {
    throw new Error("Failed to update book progress");
  }

  return response.ok
}