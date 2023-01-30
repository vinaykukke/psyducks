import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import { useEth } from "src/contexts/EthContext";
import Stepper from "components/Stepper/index";
import DisplayModal from "components/Modal";
import { actions } from "src/contexts/EthContext/state";
import styles from "../../../styles/Home.module.scss";

const Mintable = () => {
  const {
    connect,
    dispatch,
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
  const [metamaskStatus, setMetamaskstatus] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const HALT_MINT = available <= 0;
  const ALLOW_MINT = !HALT_MINT && account;
  const disableMint = mintCount === 0;
  const PARTIALLY_AVAILABLE = available > 0 && available < purchaseLimit;
  const showModal = Boolean(error) || Boolean(success);

  const handlePurchase = (
    _purchasedBy: string,
    _forAmount: BigNumber,
    numberPurchased: BigNumber,
    _at: BigNumber
  ) => {
    const balance = accountBalance + numberPurchased.toNumber();
    dispatch({ type: actions.balanceChange, data: { balance } });
    dispatch({ type: actions.purchased });
  };

  useEffect(() => {
    if (window.ethereum) setMetamaskstatus(true);
  }, []);

  useEffect(() => {
    if (contract) {
      contract.on("Purchased", handlePurchase);

      return () => {
        contract.off("Purchased", handlePurchase);
      };
    }
  }, [contract, accountBalance]);

  const mint = async () => {
    setLoading(true);
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
      setSuccess(completedTx.transactionHash);
      console.log("Your NFT's have been mined at: ", completedTx);
    } catch (error) {
      setError(error);
      console.error("Minting Error: ", error);
    }
    setLoading(false);
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
      {metamaskStatus && !account && (
        <Button id="buy" className={styles.metamask__button} onClick={connect}>
          Connect Metamask
        </Button>
      )}
      {!metamaskStatus && (
        <Box textAlign="center" marginBottom="2rem" id="buy">
          <Typography
            fontWeight="bold"
            fontStyle="italic"
            color="orange"
            fontFamily="joystix"
          >
            Please install Metamask
          </Typography>
          <p>OR</p>
          <Typography
            fontWeight="bold"
            fontStyle="italic"
            color="orange"
            fontFamily="joystix"
          >
            If you are viewing this from your mobile, please switch to a desktop
            browser for the best experience.
          </Typography>
        </Box>
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
          <Typography
            fontStyle="italic"
            color="orange"
            fontFamily="joystix"
            fontSize="0.75rem"
          >
            Note: 30 ducks are being withheld from the sale. These will be used
            for giveaways.
          </Typography>
          <Typography
            fontStyle="italic"
            color="orange"
            fontFamily="joystix"
            fontSize="0.75rem"
          >
            ** There is a purchase limit of {purchaseLimit} per wallet. **
          </Typography>
        </Box>
      )}
      {ALLOW_MINT && (
        <div className={styles.mint__form}>
          <Stepper mintCount={mintCount} handleChange={handleInputChange} />
          <LoadingButton
            className={styles.mint__button}
            onClick={mint}
            loading={loading}
            disabled={disableMint || loading}
          >
            Mint
          </LoadingButton>
        </div>
      )}
      {HALT_MINT && (
        <div className={`${styles.limit__reached} ${styles.gradient_text}`}>
          You have reached the maximum purchase limit for this NFT.
        </div>
      )}
      {!isOwner && PARTIALLY_AVAILABLE && (
        <>
          <Typography
            fontStyle="italic"
            color="turquoise"
            fontFamily="joystix"
            fontSize="0.75rem"
          >
            ** You have previously purchased {accountBalance} out of your
            available 20 NFT's. **
          </Typography>
          <Typography color="green" fontFamily="joystix" fontSize="0.75rem">
            Available: {available}/{purchaseLimit}
          </Typography>
        </>
      )}
      {showModal && (
        <DisplayModal
          error={error}
          success={success}
          setError={setError}
          setSuccess={setSuccess}
        />
      )}
    </>
  );
};

export default Mintable;
