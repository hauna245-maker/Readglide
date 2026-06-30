import { useState } from "react";
import "./UploadModal.css";

function UploadModal({ closeUploadModal, addBook, collections, addCollection }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [keepTitle, setKeepTitle] = useState(false);
  const [keepOpen, setKeepOpen] = useState(false);
  const [collectionId, setCollectionId] = useState(collections[0]?.id);
  const [isCreating, setIsCreating] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  const handleSubmit = () => {
    if (!title || !content) return;

    addBook({ title, content, collectionId: collectionId });

    if (keepOpen) {
      if (!keepTitle) {
        setTitle("");
      }
      setContent("");
    } else {
      closeUploadModal();
    }
  };

  const handleCheckboxChange = (e, type) => {
    if (type === "title") {
      setKeepTitle(e.target.checked);
    } else if (type === "upload") {
      setKeepOpen(e.target.checked);
    }
  };

  return (
    <div className="UploadModal">
      <h2>Upload Book</h2>

      <input
        className="input"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={keepTitle}
          onChange={(e) => handleCheckboxChange(e, "title")}
        />
        <span>Keep title</span>
      </label>

      <textarea
        className="input"
        id="content-input"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div style={{ marginTop: "8px" }}>
        <label>Select Collection: </label>

        {isCreating ? (
          <>
            <input
              type="text"
              placeholder="Collection name"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              autoFocus
            />
            <button
              onClick={() => {
                if (!newCollectionName.trim()) return;
                const newCollection = addCollection(newCollectionName.trim());
                setCollectionId(newCollection.id);
                setIsCreating(false);
                setNewCollectionName("");
              }}
            >
              Enter
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setNewCollectionName("");
              }}
            >
              ×
            </button>
          </>
        ) : (
          <select
            value={collectionId}
            onChange={(e) => {
              if (e.target.value === "__new__") {
                setIsCreating(true);
              } else {
                setCollectionId(e.target.value);
              }
            }}
          >
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))}
            <option value="__new__">+ New Collection...</option>
          </select>
        )}
      </div>

      <br />
      <br />

      <button onClick={handleSubmit}>Upload</button>

      <button onClick={closeUploadModal}>Cancel</button>

      <label>
        <input
          type="checkbox"
          checked={keepOpen}
          onChange={(e) => handleCheckboxChange(e, "upload")}
        />
        <span>Continue uploading</span>
      </label>

      <br />
      <br />
    </div>
  );
}

export default UploadModal;
