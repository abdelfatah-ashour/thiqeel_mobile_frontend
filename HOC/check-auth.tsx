import { useEffect } from "react";
import { getToken, getUser } from "../utils/storage";
import { setToken, setUser } from "../store/slices/auth";
import { useReduxDispatch } from "../store";

export function CheckAuth({ children }: { children: React.ReactNode }) {
  const dispatch = useReduxDispatch();

  async function getTokenStored() {
    let user = await getUser();
    let token = await getToken();

    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }

    if (token) {
      dispatch(setToken(token));
    }
  }

  useEffect(() => {
    getTokenStored();
  }, [getTokenStored]);

  return <>{children}</>;
}
