import { useLocation } from "react-router";
import { useEffect } from "react";

export function useResetScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}
