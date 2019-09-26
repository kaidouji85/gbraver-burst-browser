// @flow

export type LoadingModel = {
  isVisible: boolean,
  caption: {
    isVisible: boolean,
    value: string
  },
  completedRate: {
    isVisible: boolean,
    value: number
  }
};