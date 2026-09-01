import { Principle } from '../types';
import { PART1_PRINCIPLES } from './part1';
import { PART2_PRINCIPLES } from './part2';
import { PART3_PRINCIPLES } from './part3';
import { PART4_PRINCIPLES } from './part4';

export const ALL_PRINCIPLES: Principle[] = [
  ...PART1_PRINCIPLES,
  ...PART2_PRINCIPLES,
  ...PART3_PRINCIPLES,
  ...PART4_PRINCIPLES,
];

export const getPrincipleById = (id: number): Principle | undefined => {
  return ALL_PRINCIPLES.find((p) => p.id === id);
};

export const getPrinciplesByPart = (partId: 1 | 2 | 3 | 4): Principle[] => {
  return ALL_PRINCIPLES.filter((p) => p.partId === partId);
};
