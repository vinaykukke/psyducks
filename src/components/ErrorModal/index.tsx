import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BigNumber } from "ethers";
import styles from "./errorModal.module.scss";

interface IProps {
  error: {
    reason: string;
    code: string;
    action: string;
    transaction: {
      data: string;
      to: string;
      from: string;
      value: BigNumber;
      type: BigNumber;
    };
  };
}

const ErrorModal = (props: IProps) => {
  const [open, setOpen] = useState(Boolean(props.error));
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className={styles.modal}>
        <Typography
          id="modal-title"
          variant="h4"
          component="h2"
          color="red"
          textAlign="center"
          textTransform="uppercase"
        >
          uh-oh!
        </Typography>
        <Typography
          id="modal-description"
          variant="h6"
          sx={{ mt: 2 }}
          textTransform="capitalize"
          textAlign="center"
        >
          {props.error.reason}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ErrorModal;
