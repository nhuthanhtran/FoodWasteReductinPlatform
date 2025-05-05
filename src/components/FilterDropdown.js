import React, { useState } from "react";
import { Dropdown, Button, Form } from "react-bootstrap";

const FilterDropdown = ({ label, options, selected, setSelected }) => {
    const [show, setShow] = useState(false);

    const toggleOption = (option) => {
        setSelected((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };

    return (
        <Dropdown show={show} onToggle={() => setShow(!show)} className="me-2">
            <Dropdown.Toggle variant="light" className="border">
                {label} {selected.length > 0 && `(${selected.length})`}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ padding: "10px", minWidth: "250px" }}>
                {options.map((opt) => (
                    <Form.Check
                        key={opt}
                        type="checkbox"
                        label={opt}
                        checked={selected.includes(opt)}
                        onChange={() => toggleOption(opt)}
                    />
                ))}
                <div className="d-grid mt-2">
                    <Button size="sm" className="topbar-btn request-btn" onClick={() => setShow(false)}>
                        Done
                    </Button>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default FilterDropdown;
