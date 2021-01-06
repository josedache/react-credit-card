import { useEffect, useRef, useState } from "react";
import type { IHandleChangeFunc } from "./types";

export function useReinitializer(
  initialValue: string = "",
  enableReinitialize: boolean = false,
  handleChange: IHandleChangeFunc
) {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current && enableReinitialize) {
      handleChange(initialValue);
    }
  }, [initialValue, enableReinitialize]);

  useEffect(() => {
    handleChange(initialValue);
    mounted.current = true;
  }, []);
}

export default useReinitializer;
