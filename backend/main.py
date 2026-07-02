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
def add_book(book: BookBase):

    db = SessionLocal()

    new_book = Book(
        title = book.title,
        content = book.content,
        collectionId=book.collectionId,
        wordCount = len(book.content.split()),
    )

    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    db.close()

    return new_book


@app.put("/books/{book_id}")
def update_book(book_id:int, book: BookBase):

    db = SessionLocal()

    prev_book = db.query(Book).filter(Book.id == book_id).first()
    prev_book.title = book.title
    prev_book.content = book.content
    prev_book.collectionId = book.collectionId
    prev_book.wordCount = len(book.content.split())

    db.commit()
    db.refresh(book)
    db.close()

    return book


@app.put("/books/trash")
def move_book_to_trash(book: BookBase):
    db=SessionLocal()
    db.close()

@app.put("/books/restore")
def restore_book(book: BookBase):
    db=SessionLocal()
    db.close()

@app.delete("/books")
def delete_book(book: BookBase):
    db = SessionLocal()
    db.close()

@app.put("/books/{book_id}/progress")
def update_book_progress(book: BookBase):
    db = SessionLocal()
    db.close()