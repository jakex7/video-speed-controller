export enum Messages {
  SET_SPEED = "SET_SPEED",
  TOGGLE_FORCE_CONTROLS = "TOGGLE_FORCE_CONTROLS",
  DETECT_VIDEO = "DETECT_VIDEO",
  NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
}

export type MessageRequest =
  | { type: Messages.SET_SPEED; payload: number }
  | { type: Messages.TOGGLE_FORCE_CONTROLS; payload?: boolean }
  | { type: Messages.DETECT_VIDEO }
  | { type: Messages.NOT_IMPLEMENTED };

export type MessageResponse<T extends MessageRequest> =
  T["type"] extends Messages.NOT_IMPLEMENTED
    ? never
    : T["type"] extends Messages.SET_SPEED
    ? number
    : T["type"] extends Messages.TOGGLE_FORCE_CONTROLS
    ? boolean
    : T["type"] extends Messages.DETECT_VIDEO
    ? boolean
    : never;
