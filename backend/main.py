from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime

# setting for fastAPI
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type"],
)

# setting for database
DATABASE_URL = "sqlite:///./books.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    bind=engine
)

Base = declarative_base()


# data structure for book
class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    collectionId = Column(Integer, nullable=True)
    wordCount = Column(Integer, default=0)
    createdAt = Column(DateTime, default=datetime.now)
    lastReadAt = Column(Integer, nullable=True)
    maxProgress = Column(Integer, default=0)
    currentProgress = Column(Integer, default=0)
    isTrashed = Column(Boolean, default=False)

# make database
Base.metadata.create_all(bind=engine)

# data structure from react
class BookBase(BaseModel):
    title: str
    content: str
    collectionId: int

class BookProgress(BaseModel):
    currentProgress: int


# API to get books
@app.get("/books")
def get_books():

    db = SessionLocal()
    books = db.query(Book).all()
    db.close()

    return books


# API to add book
@app.post("/books")
def add_book(book_input: BookBase):

    db = SessionLocal()

    new_book = Book(
        title = book_input.title,
        content = book_input.content,
        collectionId=book_input.collectionId,
        wordCount = len(book_input.content.split()),
    )

    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    db.close()

    return new_book


# API to update book
@app.put("/books/{book_id}")
def update_book(book_id:int, book_input: BookBase):

    db = SessionLocal()
    book = db.query(Book).filter(Book.id == book_id).first()

    book.title = book_input.title
    book.content = book_input.content
    book.collectionId = book_input.collectionId
    book.wordCount = len(book_input.content.split())

    db.commit()
    db.refresh(book)
    db.close()

    return book


# API to move book to trash
@app.put("/books/{book_id}/trash")
def move_book_to_trash(book_id):

    db = SessionLocal()
    book = db.query(Book).filter(Book.id == book_id).first()

    book.isTrashed=True

    db.commit()
    db.refresh(book)
    db.close()

    return book


# API to restore book
@app.put("/books/{book_id}/restore")
def restore_book(book_id):

    db = SessionLocal()
    book = db.query(Book).filter(Book.id == book_id).first()

    book.isTrashed=False
    
    db.commit()
    db.refresh(book)
    db.close()

    return book


# API to delete book
@app.delete("/books/{book_id}")
def delete_book(book_id):

    db = SessionLocal()
    book = db.query(Book).filter(Book.id == book_id).first()

    if book is None:
        return
    elif book.isTrashed is False:
        return     

    db.delete(book)
    db.commit()
    db.close()


# API to update book progress
@app.put("/books/{book_id}/progress")
def update_book_progress(book_id: int, input: BookProgress):

    db = SessionLocal()
    book = db.query(Book).filter(Book.id == book_id).first()
    
    book.currentProgress=input.currentProgress
    if book.maxProgress<input.currentProgress:
        book.maxProgress=input.currentProgress

    db.commit()
    db.refresh(book)
    db.close()

    return book