// "use client";

// import React, { createContext, useReducer } from "react";
// import { types } from "@/constant";

// const appContext = createContext<AppContextProps | null>(null);

// interface AppContextProps {
//   state: typeof initialState;
//   dispatch: React.Dispatch<ActionType>;
// }

// interface Props {
//   children: React.ReactNode;
// }

// interface LogoutAction {
//   type: string;
// }

// interface UserActions {
//   type: string;
//   payload: string;
//   name: string;
// }

// type ActionType = UserActions | LogoutAction;

// const initialState = {
//   user: "brasil",
// };

// const appReducer = (state: typeof initialState, action: ActionType) => {
//   switch (action.type) {
//     case types.SET_USER:
//       return { ...state, user: action.type };
//     case types.LOGOUT:
//       return { ...initialState };
//     default:
//       return state;
//   }
// };

// const AppContext = (props: Props) => {
//   const [state, dispatch] = useReducer(appReducer, initialState);

//   const contextValue = {
//     state,
//     dispatch,
//   };
//   return (
//     <appContext.Provider value={contextValue}>
//       {props.children}
//     </appContext.Provider>
//   );
// };

// export default AppContext;
