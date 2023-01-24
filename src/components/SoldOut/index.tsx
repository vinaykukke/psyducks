import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import styles from "./soldout.module.scss";

const SoldOut = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
  >
    This NFT collection is sold out.
    <br />
    <Button
      href="https://opensea.io/collection/psy-ducks"
      target="_blank"
      className={styles.visit_opensea__button}
    >
      Buy on opensea
    </Button>
  </Box>
);

export default SoldOut;
