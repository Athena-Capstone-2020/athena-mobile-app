import React, { useState, useReducer, createContext, useEffect } from "react";
import { withHouseholdService } from "../../services";
import { reducer as userContextReducer } from "./state/reducer";
import { UserContextActionHandler } from "./state/actions";
import { initialUserContextState } from "./state/state";
import firebase from "../../firebase/config";

export const UserContext = createContext(null);

export function UserContextProvider({
  children,
  initState = initialUserContextState,
}) {
  const TEST_HOUSEHOLD_ID = "VP4wYWjm0IzzDdzf5RVr";

  const { householdService } = withHouseholdService();
  const [state, dispatch] = useReducer(userContextReducer, initState);

  const userContextActionHandler = new UserContextActionHandler(
    householdService,
    state,
    dispatch
  );

  const googleAuth = GoogleAuth();

  useEffect(() => {
    userContextActionHandler.setHousehold(TEST_HOUSEHOLD_ID);
  }, [householdService]);

  return (
    <UserContext.Provider
      value={{ actions: userContextActionHandler, state, googleAuth }}
    >
      {children}
    </UserContext.Provider>
  );
}

function GoogleAuth() {
  const SignInWithGoogle = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return {
    SignInWithGoogle,
  };
}
