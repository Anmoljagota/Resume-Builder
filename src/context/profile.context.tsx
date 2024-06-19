"use client";

import React, { Dispatch, createContext, useReducer } from "react";
import { UserProfile } from "@/utils/interfaces";

type StateType = {
  currentProfileData: UserProfile | null;
  currentProfileDataErrors: { [key: string]: string };
  fontSize: "small" | "medium" | "large";
};

type ActionType = {
  type: string;
  payload: UserProfile | null | { [key: string]: string } | string;
};

const initialState: StateType = {
  currentProfileData: null,
  currentProfileDataErrors: {},
  fontSize: "medium",
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "SET_CURRENT_PROFILE_DATA":
      return { ...state, currentProfileData: action.payload };
    case "SET_CURRENT_PROFILE_DATA_ERRORS":
      return { ...state, currentProfileDataErrors: action.payload };
    case "SET_FONT_SIZE":
      return { ...state, fontSize: action.payload };
    default:
      return state;
  }
};

export const ProfileContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const ProfileContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <ProfileContext.Provider value={{ state, dispatch }}>{children}</ProfileContext.Provider>;
};
