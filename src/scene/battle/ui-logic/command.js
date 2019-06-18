// @flow

import type {Command} from "gbraver-burst-core/lib/command/command";

export function shouldSkipInputCommand(playerCommand: Command[]): boolean {
  return playerCommand.length === 1;
}

export function getAutoProgressCommand(playerCommand: Command[]): ?Command {
  if (playerCommand.length === 1) {
    return playerCommand[0]
  } else {
    return null;
  }
}
