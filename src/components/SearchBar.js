import React from "react";
import { Form } from "react-bootstrap";

const SearchBar = ({ searchTerm, setSearchTerm, placeholder = "Search..." }) => {
    return (
        <Form.Control
            type="text"
            placeholder={placeholder}
            className="mb-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    );
};

export default SearchBar;
