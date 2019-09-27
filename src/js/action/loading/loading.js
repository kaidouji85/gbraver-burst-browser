// @flow

export type LoadingAction = LoadingProgress | LoadingComplete;

export type LoadingProgress = {
  type: 'LoadingProgress',
  completedRate: number
};

export type LoadingComplete = {
  type : 'LoadingComplete',
};