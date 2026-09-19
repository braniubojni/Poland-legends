export type MapLoadState = "loading" | "ready";
export type MapLoadEvent = "mount" | "load" | "restyle" | "style-load";

export const nextMapLoadState = (event: MapLoadEvent): MapLoadState =>
  event === "mount" || event === "restyle" ? "loading" : "ready";

export const shouldShowSkeleton = (isPending: boolean, isError: boolean): boolean =>
  isPending && !isError;
