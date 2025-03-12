import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Dashboard = () => {
  // Updated data array
  const initialData = [
    { id: 1,  name: "iPhone 14",                  category: "Electronics" },
    { id: 2,  name: "MacBook Pro",                category: "Electronics" },
    { id: 3,  name: "Graphic T-Shirt",            category: "Clothing" },
    { id: 4,  name: "Blue Jeans",                 category: "Clothing" },
    { id: 5,  name: "Bananas",                    category: "Groceries" },
    { id: 6,  name: "Almond Milk",                category: "Groceries" },
    { id: 7,  name: "Headphones",                 category: "Accessories" },
    { id: 8,  name: "Sunglasses",                 category: "Accessories" },
    { id: 9,  name: "The Great Gatsby",           category: "Books" },
    { id: 10, name: "JavaScript: The Good Parts", category: "Books" },
    { id: 11, name: "Air Jordan Sneakers",        category: "Clothing" },
    { id: 12, name: "Samsung Galaxy S22",         category: "Electronics" },
  ];

  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Modal states
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter & Search
  const filteredData = data.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All"
      ? true
      : item.category.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // Sort items
  const sortedData = [...filteredData].sort((a, b) => {
    return sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Modal handlers
  const openModal = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Filter */}
      <div className="mb-3">
        <select
          className="form-select"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Groceries">Groceries</option>
          <option value="Accessories">Accessories</option>
          <option value="Books">Books</option>
        </select>
      </div>

      {/* Sort */}
      <div className="mb-3">
        <button
          className="btn btn-secondary"
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        >
          Sort ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>

      {/* Item List */}
      <ul className="list-group mb-3">
        {currentItems.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
            onClick={() => openModal(item)}
            style={{ cursor: "pointer" }}
          >
            {item.name}
            <span className="badge bg-primary rounded-pill">
              {item.category}
            </span>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <li
              key={pageNum}
              className={`page-item ${pageNum === currentPage ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => setCurrentPage(pageNum)}>
                {pageNum}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Item Details"
        style={{
          content: {
            maxWidth: "500px",
            margin: "auto",
          },
        }}
      >
        {selectedItem && (
          <div>
            <h3>{selectedItem.name}</h3>
            <p>Category: {selectedItem.category}</p>
          </div>
        )}
        <button className="btn btn-danger" onClick={closeModal}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Dashboard;
