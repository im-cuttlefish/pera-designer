export type Slot = "image" | "markdown" | "plaintext";

export type Editing = Slot | "style";

export interface Component {
  id?: number;
  tagName: string;
  name: string;
  description: string;
  html: string;
  css?: string;
  slot: {
    [name: string]: {
      type: Slot;
      role: string;
    };
  };
}

export interface Description {
  id?: number;
  tagName: string;
  name: string;
  description: string;
}

export type Descriptions = { [key: string]: Description[] };

export type UUID = string & { UUID: never };

export interface Style {
  color: string;
  background: string;
}

export interface Contents {
  [name: string]: {
    readonly type: Slot;
    content: string;
  };
}

export interface Node {
  readonly id: UUID;
  readonly component: Component;
  contents: Contents;
  style: Partial<Style>;
}
