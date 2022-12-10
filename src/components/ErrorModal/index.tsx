import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ErrorModal = (props: any) => {
  const [open, setOpen] = useState(Boolean(props.message));
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          color="red"
        >
          Error
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.message}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ErrorModal;
