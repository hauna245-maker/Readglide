from fastapi import FastAPI
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker


app = FastAPI()

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
    collection_id = Column(Integer, nullable=False)
    wordCount = Column(Integer, default=0)
    createdAt = Column(Integer)
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
    collection_id: int

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
        collection_id=book.collection_id,
        wordCount = len(book.content.split()),
    )

    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    db.close()

    return new_book