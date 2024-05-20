import { useOutletContext } from "react-router-dom";
import { UseGenericContextType } from "../types";

export default function useOutletContextData<T>() {
  return useOutletContext<UseGenericContextType<T>>();
}
