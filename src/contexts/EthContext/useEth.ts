import { Dispatch, useContext } from "react";
import EthContext from "./EthContext";
import { IInitialState } from "./state";

interface IEth {
  state: IInitialState;
  dispatch: Dispatch<any>;
  connect: () => Promise<void>;
}

const useEth = (): IEth => useContext(EthContext);

export default useEth;
