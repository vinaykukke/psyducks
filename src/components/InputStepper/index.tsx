import { useRef, useState } from "react";
import styles from "./inputStepper.module.scss";

const InputStepper = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const inputEl = inputRef.current;
    const id = e.currentTarget.id;
    const min = parseInt(inputEl.getAttribute("min"));
    const max = parseInt(inputEl.getAttribute("max"));
    const step = parseInt(inputEl.getAttribute("step"));
    const val = inputEl.getAttribute("value");
    const calcStep = id === "increment" ? step * 1 : step * -1;
    const newValue = parseInt(val) + calcStep;

    if (newValue >= min && newValue <= max) {
      setValue(newValue);
    }
  };

  return (
    <div className={styles.container}>
      <button id="decrement" className={styles.decrement} onClick={handleClick}>
        {" "}
        -{" "}
      </button>
      <input
        ref={inputRef}
        type="number"
        min="0"
        max="100"
        step="1"
        value={value}
        id="my-input"
      />
      <button id="increment" className={styles.increment} onClick={handleClick}>
        {" "}
        +{" "}
      </button>
    </div>
  );
};

export default InputStepper;
