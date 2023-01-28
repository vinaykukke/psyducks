import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BigNumber } from "ethers";
import styles from "./modal.module.scss";

interface IProps {
  setError: (value: any) => void;
  setSuccess: (value: any) => void;
  success?: string;
  error?: {
    reason: string;
    code?: string;
    action?: string;
    transaction?: {
      data: string;
      to: string;
      from: string;
      value: BigNumber;
      type: BigNumber;
    };
  };
}

const DisplayModal = (props: IProps) => {
  const modalState = props.error || props.success;
  const [open, setOpen] = useState(Boolean(modalState));
  const errorReason =
    (props.error && props.error.reason) ||
    "Something went wrong. Please try again!";

  const handleClose = () => {
    setOpen(false);
    props.setError(null);
    props.setSuccess(null);
  };

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
          color={props.success ? "green" : "red"}
          textAlign="center"
          textTransform="uppercase"
          fontFamily="joystix"
        >
          {props.success ? "Congratulations!" : "uh-oh!"}
        </Typography>
        {props.success && (
          <Typography
            variant="h6"
            sx={{ mt: 2 }}
            textTransform="capitalize"
            textAlign="center"
            fontFamily="joystix"
          >
            Transaction hash:
          </Typography>
        )}
        <Typography
          id="modal-description"
          sx={{ mt: 2 }}
          textTransform="capitalize"
          textAlign="center"
          fontFamily="joystix"
        >
          {props.success ? props.success : errorReason}
        </Typography>
        {props.success && (
          <Link
            href={`https://etherscan.io/tx/${props.success}`}
            target="_blank"
          >
            <span>Follow the transaction on Etherscan:</span>
            <Image
              src="/etherscan-logo.webp"
              alt="Follow on Etherscan"
              width={30}
              height={30}
            />
          </Link>
        )}
      </Box>
    </Modal>
  );
};

export default DisplayModal;
