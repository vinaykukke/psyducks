const actions = {
  init: "INIT",
  connect: "METAMASK_CONNECT",
  disconnect: "METAMASK_DISCONNECT",
};

const initialState = {
  artifact: null,
  metamaskConnected: false,
  account: null,
  networkID: null,
  signer: null,
  contract: null,
};

const reducer = (state: any, action: any) => {
  const { type, data } = action;
  let res;

  switch (type) {
    case actions.init:
      res = { ...state, ...data };
      break;

    case actions.connect:
      res = { ...state, metamaskConnected: true, account: data.account };
      break;

    case actions.disconnect:
      res = { ...state, metamaskConnected: false, account: null };
      break;

    default:
      throw new Error("Undefined reducer action type");
  }

  return res;
};

export { actions, initialState, reducer };
