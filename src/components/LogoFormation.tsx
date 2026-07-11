'use client';

import { useEffect, useRef } from 'react';

const SRCS = ['/trna/blue.png', '/trna/red.png', '/trna/green.png', '/trna/purple.png', '/trna/yellow.png'];

type Point = { x: number; y: number; angle: number };
type RawPoint = { x: number; y: number };
type Node = {
  img: HTMLImageElement;
  size: number;
  fx: number;
  fy: number;
  phase: number;
  speed: number;