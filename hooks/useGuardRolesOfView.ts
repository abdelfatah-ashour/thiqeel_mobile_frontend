import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useReducer } from "react";
import {
  IS_BUYER,
  IS_MEMBER,
  IS_OWNER,
  IS_PERSONAL,
  IS_SELLER,
} from "../utils/constant";
import { DispatchAction } from "../Types/shared";
import { useReduxSelector } from "../store";

type guardRoleStateType = {
  access: boolean;
  bidder: boolean;
  seller: boolean;
};

// CONSTANT
const HAS_ACCESS = "HAS_ACCESS";
const BIDDER = "BIDDER";
const SELLER = "SELLER";

const guardRolesState: guardRoleStateType = {
  access: false,
  bidder: false,
  seller: false,
};

export const useGuardRolesOfView = () => {
  const { user } = useReduxSelector(s => s.auth);

  const [roles, dispatch] = useReducer(guardRolesReducer, guardRolesState);

  function guardRolesReducer(
    state: guardRoleStateType,
    { type, payload }: DispatchAction,
  ) {
    switch (type) {
      case HAS_ACCESS:
        return {
          ...state,
          access: payload,
        };

      case BIDDER:
        return {
          ...state,
          bidder: payload,
        };

      case SELLER:
        return {
          ...state,
          seller: payload,
        };

      default:
        return state;
    }
  }

  useEffect(() => {
    switch (user?.account_type) {
      case IS_PERSONAL:
      case IS_OWNER:
        dispatch({
          type: HAS_ACCESS,
          payload: true,
        });
        break;

      case IS_MEMBER:
        if (user?.roles?.includes(IS_BUYER)) {
          dispatch({
            type: BIDDER,
            payload: true,
          });
        } else if (user?.roles?.includes(IS_SELLER)) {
          dispatch({
            type: SELLER,
            payload: true,
          });
        }
        break;

      default:
        return;
    }
  }, [user?.account_type, user?.roles]);

  return {
    access: roles.access,
    bidder: roles.bidder,
    seller: roles.seller,
  };
};
