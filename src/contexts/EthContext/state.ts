import { ethers } from "ethers";
import { Contract } from "ethers";

enum actions {
  init = "INIT",
  changePhase = "PHASE_CHANGE",
  purchased = "PURCHASED",
  balanceChange = "ACCOUNT_BALANCE_CHAHGED",
  soldOut = "SOLD_OUT",
}

/** Prices per NFT per phase */
enum PRICES {
  phase_one = 0.09,
  phase_two = 0.9,
}
enum PURCHASE_LIMIT {
  regular = 20,
  owner = 30,
}
export interface IInitialState {
  artifact: any;
  account: string;
  networkID: number;
  contract: Contract;
  accountBalance: number;
  price: number;
  purchaseLimit: number;
  available: number;
  phase: 1 | 2;
  owner: string;
  isOwner: boolean;
  soldOut: boolean;
  provider: ethers.providers.Web3Provider;
  ownersShareMinted: boolean;
}

const initialState: IInitialState = {
  artifact: null,
  account: null,
  networkID: null,
  contract: null,
  accountBalance: null,
  price: PRICES.phase_one,
  purchaseLimit: PURCHASE_LIMIT.regular,
  available: PURCHASE_LIMIT.regular,
  phase: 1,
  owner: null,
  isOwner: false,
  soldOut: false,
  provider: null,
  ownersShareMinted: false,
};

const reducer = (state: any, action: any) => {
  const { type, data } = action;
  let res: IInitialState;

  switch (type) {
    case actions.init:
      const currentPhase = data.phase === 1 ? "phase_one" : "phase_two";
      const price = data.isOwner ? 0 : PRICES[currentPhase];
      const purchaseLimit = data.isOwner
        ? PURCHASE_LIMIT.owner
        : PURCHASE_LIMIT.regular;

      res = { ...state, ...data, price, purchaseLimit };
      break;

    case actions.changePhase:
      res = { ...state, price: PRICES.phase_two, phase: 2 };
      break;

    case actions.purchased:
      res = {
        ...state,
        available: state.purchaseLimit - state.accountBalance,
      };
      break;

    case actions.balanceChange:
      res = {
        ...state,
        accountBalance: data.balance,
      };
      break;

    case actions.soldOut:
      res = {
        ...state,
        soldOut: true,
      };
      break;

    default:
      throw new Error("Undefined reducer action type");
  }

  return res;
};

export { actions, initialState, reducer };
