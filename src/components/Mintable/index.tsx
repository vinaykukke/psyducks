import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEth } from "src/contexts/EthContext";
import Stepper from "components/Stepper/index";
import ErrorModal from "components/ErrorModal";
import styles from "../../../styles/Home.module.scss";

const Mintable = () => {
  const {
    connect,
    state: {
      account,
      contract,
      purchaseLimit,
      price: mintPrice,
      available,
      isOwner,
      accountBalance,
    },
  } = useEth();
  const [mintCount, setMintCount] = useState(0);
  const [error, setError] = useState(null);
  const HALT_MINT = available <= 0;
  const ALLOW_MINT = !HALT_MINT && account;
  const disableMint = mintCount === 0;
  const PARTIALLY_AVAILABLE = available > 0 && available < purchaseLimit;

  const mint = async () => {
    try {
      /** Fixing the JS floating point precision problem */
      const price = Number((mintCount * mintPrice).toFixed(3));
      const options = {
        value: ethers.utils.parseEther(price.toString()),
      };
      let mintTx;

      if (isOwner) mintTx = await contract.reserve(options);
      if (!isOwner) mintTx = await contract.mint(mintCount, options);

      const completedTx = await mintTx.wait();
      console.log("Your NFT's have been mined at: ", completedTx);
    } catch (error) {
      setError(error);
      console.error("Minting Error: ", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    setMintCount(value);
  };

  useEffect(() => {
    const limit = isOwner ? purchaseLimit : 0;
    setMintCount(limit);
  }, [isOwner]);

  return (
    <>
      {!account && (
        <Button className={styles.metamask__button} onClick={connect}>
          Connect Metamask
        </Button>
      )}
      {account && (
        <Box textAlign="center" marginBottom="2rem" id="buy">
          <h2>
            Connected with account:
            <Typography fontWeight="bold" fontStyle="italic">
              {account}
            </Typography>
          </h2>
          <h3>Each NFT will cost {mintPrice} ETH. There are no price tiers.</h3>
          <Typography fontStyle="italic" color="orange">
            Note: 30 ducks are being withheld from the sale. These will be used
            for giveaways.
          </Typography>
          <Typography fontStyle="italic" color="orange">
            ** There is a purchase limit of {purchaseLimit} per wallet. **
          </Typography>
        </Box>
      )}
      {ALLOW_MINT && (
        <div className={styles.mint__form}>
          <Stepper mintCount={mintCount} handleChange={handleInputChange} />
          <Button
            className={styles.mint__button}
            onClick={mint}
            disabled={disableMint}
          >
            Mint
          </Button>
        </div>
      )}
      {HALT_MINT && (
        <div className={`${styles.limit__reached} ${styles.gradient_text}`}>
          You have reached the maximum purchase limit for this NFT.
        </div>
      )}
      {!isOwner && PARTIALLY_AVAILABLE && (
        <>
          <Typography fontStyle="italic" color="turquoise">
            ** You have previously purchased {accountBalance} out of your
            available 20 NFT's. **
          </Typography>
          <Typography color="green">
            Available: {available}/{purchaseLimit}
          </Typography>
        </>
      )}
      {error && <ErrorModal error={error} />}
    </>
  );
};

export default Mintable;
