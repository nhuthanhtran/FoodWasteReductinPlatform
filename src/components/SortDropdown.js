import React from "react";
import { Form } from "react-bootstrap";

const SortDropdown = ({ sortOption, setSortOption, options }) => (
    <Form.Select
        className="mb-2"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
    >
        <option value="">Expiration Sort</option>
        {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
                {opt.label}
            </option>
        ))}
    </Form.Select>
);

export default SortDropdown;
