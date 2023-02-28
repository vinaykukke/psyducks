import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";
import { Web3Button } from "@web3modal/react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEth } from "src/contexts/EthContext";
import DisplayModal from "components/Modal";
import InputStepper from "components/InputStepper";
import { actions } from "src/contexts/EthContext/state";
import styles from "styles/psyducks.module.scss";

const Mintable = () => {
  const {
    dispatch,
    loading,
    state: {
      contract,
      purchaseLimit,
      price: mintPrice,
      available,
      isOwner,
      accountBalance,
      mintCount,
    },
  } = useEth();
  const { isConnected } = useAccount();
  const { data: signer } = useSigner();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loadingButton, setLoading] = useState(false);
  const HALT_MINT = available <= 0;
  const ALLOW_MINT = isConnected && !HALT_MINT;
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

      if (isOwner) mintTx = await contract.connect(signer).reserve();
      if (!isOwner)
        mintTx = await contract.connect(signer).mint(mintCount, options);

      const completedTx = await mintTx.wait();
      setSuccess(completedTx.transactionHash);
      console.log("Your NFT's have been mined at: ", completedTx);
    } catch (error) {
      setError(error);
      console.error("Minting Error: ", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Web3Button icon="show" label="Connect Wallet" balance="show" />
      {isConnected && loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {isConnected && !loading && (
        <>
          {isConnected && (
            <Box textAlign="center" marginBottom="2rem" id="buy">
              {!isOwner && <h3>Price: {mintPrice} ETH.</h3>}
              {isOwner && <h3>Welcome Owner.</h3>}
              <Typography
                fontStyle="italic"
                color="orange"
                fontFamily="joystix"
                fontSize="0.75rem"
              >
                Note: 30 ducks are being witheld from the sale. These will be
                used for giveaways.
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
              <InputStepper />
              <LoadingButton
                className={styles.mint__button}
                onClick={mint}
                loading={loadingButton}
                disabled={disableMint || loadingButton}
              >
                Mint
              </LoadingButton>
            </div>
          )}
          {isConnected && HALT_MINT && (
            <div className={`${styles.limit__reached} ${styles.gradient_text}`}>
              You have reached the maximum purchase limit for this collection.
            </div>
          )}
          {PARTIALLY_AVAILABLE && (
            <>
              <Typography
                fontStyle="italic"
                color="turquoise"
                fontFamily="joystix"
                fontSize="0.75rem"
              >
                ** You have previously purchased {accountBalance} out of your
                available {purchaseLimit} NFT's. **
              </Typography>
              <Typography
                color="turquoise"
                fontFamily="joystix"
                fontSize="0.75rem"
              >
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
      )}
    </>
  );
};

export default Mintable;
