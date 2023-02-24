import { useRef, useState } from "react";
import { actions, useEth } from "src/contexts/EthContext";
import styles from "./inputStepper.module.scss";

const InputStepper = () => {
  const {
    dispatch,
    state: { mintCount, purchaseLimit },
  } = useEth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);

    if (value > purchaseLimit) {
      e.preventDefault();
      setError(`There is a purchase limit of ${purchaseLimit}!`);
      return;
    }

    setError("");
    dispatch({ type: actions.mintCount, data: { count: value } });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const inputEl = inputRef.current;
    const id = e.currentTarget.id;
    const min = Number(inputEl.getAttribute("min"));
    const max = Number(inputEl.getAttribute("max"));
    const step = Number(inputEl.getAttribute("step"));
    const val = inputEl.getAttribute("value");
    const calcStep = id === "increment" ? step * 1 : step * -1;
    const newValue = Number(val) + calcStep;

    if (newValue >= min && newValue <= max) {
      setError("");
      dispatch({ type: actions.mintCount, data: { count: newValue } });
    }
  };

  return (
    <div className={styles.stepperWrapper}>
      <div className={styles.container}>
        <button
          id="decrement"
          className={styles.decrement}
          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width="30"
            height="30"
            fill="#3264fe"
          >
            <path d="M416 256c0 17.7-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
          </svg>
        </button>
        <input
          ref={inputRef}
          type="number"
          min={0}
          max={purchaseLimit}
          step="1"
          value={mintCount}
          id="my-input"
          onChange={handleChange}
        />
        <button
          id="increment"
          className={styles.increment}
          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width="30"
            height="30"
            fill="#3264fe"
          >
            <path d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z" />
          </svg>
        </button>
      </div>
      <p className={styles.stepperError}>{error}</p>
    </div>
  );
};

export default InputStepper;
