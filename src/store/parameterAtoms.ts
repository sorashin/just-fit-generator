

import { atom } from "jotai";

export type SplitParameter = {
  x: number;
  y: number;
  z: number;
};
export type SizeParameter = {
  width: number;
  depth: number;
  height: number;
};



export const splitAtom = atom<SplitParameter>({ x: 3, y: 3, z:3 });
export const sizeAtom = atom<SizeParameter>({width: 335, depth: 245, height: 60});

export const radiusAtom = atom<number>(10);
export const thicknessAtom = atom<number>(2);
export const offsetAtom = atom<number>(.2);
export const gridGapAtom = atom<number>(1);
