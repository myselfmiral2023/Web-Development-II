import { useContext } from "react";
import ProvideAuth from "../contexts/ProvideAuth";

const useAuth = () => {
  return useContext(ProvideAuth);

}

export default useAuth;