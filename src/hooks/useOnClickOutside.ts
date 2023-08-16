import { SetterFunction } from "@/interfaces";
import { useEffect, RefObject, useRef } from "react";

export const useOnClickOutside = <T extends HTMLElement>(
  setOpen: SetterFunction<boolean>,
  open: boolean,
  ref: RefObject<T>
) => {
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current && !open) {
      ref.current!.focus();
    }

    prevOpen.current = open;
  }, [open, ref]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [ref, setOpen]);
};
