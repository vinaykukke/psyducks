import { providers } from "ethers";
import { Contract } from "ethers";

enum actions {
  init = "INIT",
  purchased = "PURCHASED",
  balanceChange = "ACCOUNT_BALANCE_CHAHGED",
  soldOut = "SOLD_OUT",
  mintCount = "MINT_COUNT",
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
  provider: providers.Web3Provider;
  ownersShareMinted: boolean;
  mintCount: number;
}

const initialState: IInitialState = {
  artifact: null,
  account: null,
  networkID: null,
  contract: null,
  accountBalance: null,
  price: 0,
  purchaseLimit: 0,
  available: 0,
  owner: null,
  isOwner: false,
  soldOut: false,
  provider: null,
  ownersShareMinted: false,
  mintCount: 0,
};

const reducer = (state: any, action: any) => {
  const { type, data } = action;
  let res: IInitialState;

  switch (type) {
    case actions.init:
      const price = data.isOwner ? 0 : data.price;
      res = { ...state, ...data, price };
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

    case actions.mintCount:
      res = {
        ...state,
        mintCount: data.count,
      };
      break;

    default:
      throw new Error("Undefined reducer action type");
  }

  return res;
};

export { actions, initialState, reducer };
