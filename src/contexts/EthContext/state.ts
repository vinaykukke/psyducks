import { ethers } from "ethers";
import { Contract } from "ethers";

enum actions {
  init = "INIT",
  purchased = "PURCHASED",
  balanceChange = "ACCOUNT_BALANCE_CHAHGED",
  soldOut = "SOLD_OUT",
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
  price: 0.09,
  purchaseLimit: PURCHASE_LIMIT.regular,
  available: PURCHASE_LIMIT.regular,
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
      const price = data.isOwner ? 0 : 0.09;
      const purchaseLimit = data.isOwner
        ? PURCHASE_LIMIT.owner
        : PURCHASE_LIMIT.regular;

      res = { ...state, ...data, price, purchaseLimit };
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
