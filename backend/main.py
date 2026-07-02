from fastapi import FastAPI
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

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


# api to get books
@app.get("/books")
def get_books():

    db = SessionLocal()
    books = db.query(Book).all()
    db.close()

    return books


# api to add book
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
def update_book(book_id:int, new_book: BookBase):

    db = SessionLocal()

    book = db.query(Book).filter(Book.id == book_id).first()
    book.title = new_book.title
    book.content = new_book.content
    book.collectionId = new_book.collectionId

    db.commit()
    db.refresh(new_book)
    db.close()

    return new_book


@app.put("/books/trash")
def update_book(book: BookBase):
    db=SessionLocal()
    db.close()

@app.put("/books/restore")
def update_book(book: BookBase):
    db=SessionLocal()
    db.close()

@app.delete("/books")
def add_book(book: BookBase):
    db = SessionLocal()
    db.close()

@app.put("/books/{book_id}/progress")
def add_book(book: BookBase):
    db = SessionLocal()
    db.close()