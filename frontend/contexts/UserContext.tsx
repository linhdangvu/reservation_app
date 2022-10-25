import React from 'react';

// Declaring the state object globally.
const initialUserState = {
  // token: "azertjgodifsq",//localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  refeshToken: localStorage.getItem("refeshToken"),
};

const userContextWrapper = (component?: React.Component) => ({
  ...initialUserState,
  setTokens: (token: string, refeshToken: string) => {
    initialUserState.token = token;
    initialUserState.refeshToken = refeshToken;
    localStorage.setItem("token", token)
    localStorage.setItem("refeshToken", refeshToken)
    component?.setState({ context: userContextWrapper(component) });
  },
  removeTokens: () => {
    initialUserState.token = "";
    initialUserState.refeshToken = "";
    component?.setState({ context: userContextWrapper(component) });
  },
});

type Context = ReturnType<typeof userContextWrapper>;

export const UserContext = React.createContext<Context>(userContextWrapper());

interface State {
  context: Context;
}

export class UserContextProvider extends React.Component<{ children?: React.ReactNode; }, {}> {
  state: State = {
    context: userContextWrapper(this),
  };

  render() {
    return (
      <UserContext.Provider value={this.state.context}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}