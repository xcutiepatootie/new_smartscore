import { Lexend, Margarine, Poppins } from "next/font/google";

const margarine_init = Margarine({
  weight: "400",
  style: "normal",
  preload: false,
});

const poppins_init = Poppins({
  weight: "400",
  style: "normal",
  preload: false,
});

const lexend_init = Lexend({
  weight: "400",
  style: "normal",
  preload: false,
});

export const margarine = margarine_init;
export const poppins = poppins_init;
export const lexend = lexend_init;
