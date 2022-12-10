import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Stepper = (props: any) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  const getMenuItems = () => {
    const menuItems = [];
    for (let i = 0; i < 20; i++) {
      menuItems.push(
        <MenuItem key={i} value={i + 1}>
          {i + 1}
        </MenuItem>
      );
    }

    return menuItems;
  };

  return (
    <FormControl>
      <InputLabel id="mint-count-select-label">Amount</InputLabel>
      <Select
        labelId="mint-count-select-label"
        id="mint-count-select"
        open={open}
        onClose={toggleOpen}
        onOpen={toggleOpen}
        value={props.mintCount ? props.mintCount : ""}
        label="Amount"
        onChange={props.handleChange}
        margin="dense"
        // color="neutral"
      >
        {getMenuItems()}
      </Select>
    </FormControl>
  );
};

export default Stepper;
