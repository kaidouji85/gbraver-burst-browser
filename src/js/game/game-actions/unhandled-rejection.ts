/** unhandledrejectionイベント */
export type UnhandledRejection = {
  type: "UnhandledRejection";
  /** イベント */
  event: PromiseRejectionEvent;
};
