declare module 'split-type' {
  export interface SplitTypeOptions {
    split?: string;
    types?: string;
    tagName?: string;
    lineClass?: string;
    wordClass?: string;
    charClass?: string;
    splitClass?: string;
    absolute?: boolean;
  }

  export default class SplitType {
    constructor(target: string | Element | Element[] | NodeList, options?: SplitTypeOptions);
    lines: HTMLElement[] | null;
    words: HTMLElement[] | null;
    chars: HTMLElement[] | null;
    split(options?: SplitTypeOptions): void;
    revert(): void;
  }
}
