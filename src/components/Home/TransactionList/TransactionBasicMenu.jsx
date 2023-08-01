import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function TransactionBasicMenu({ onOrderChange }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOrder, setSelectedOrder] = React.useState("desc"); // Estado para el orden seleccionado

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    onOrderChange(order);
    handleClose();
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={anchorEl ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl)}
        onClick={handleClick}
      >
        <ArrowDropDownIcon />
        Ordenar
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => handleOrderClick("desc")}
          selected={selectedOrder === "desc"}
        >
          Mas Reciente
        </MenuItem>
        <MenuItem
          onClick={() => handleOrderClick("asc")}
          selected={selectedOrder === "asc"}
        >
          Mas Antigua
        </MenuItem>
      </Menu>
    </div>
  );
}
