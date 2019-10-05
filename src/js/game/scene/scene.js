// @flow

/** シーン */
export interface Scene {
  destructor(): void;
}

/** 空のシーン */
export function emptyScene(): Scene {
  return {
    destructor: () => {
      // NOP
    }
  };
}