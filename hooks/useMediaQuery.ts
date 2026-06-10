"use client";

import { useMediaQuery } from "react-responsive";
import { useMemo, useSyncExternalStore } from "react";

/**
 * Reusable responsiveness hook.
 * Handle hydration issues by ensuring values are only accurate on the client.
 */
export const useResponsive = () => {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isMobileQuery = useMediaQuery({ maxWidth: 480 });
  const isTabletQuery = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const isSmallerDeviceQuery = useMediaQuery({ maxWidth: 1024 });

  // Return false during SSR to avoid hydration mismatch, then return actual values
  return useMemo(
    () => ({
      isMobile: isClient ? isMobileQuery : false,
      isTablet: isClient ? isTabletQuery : false,
      isSmallerDevice: isClient ? isSmallerDeviceQuery : false,
    }),
    [isClient, isMobileQuery, isTabletQuery, isSmallerDeviceQuery],
  );
};
