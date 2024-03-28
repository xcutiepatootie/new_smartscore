import { Margarine, Poppins } from "next/font/google";

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

export const margarine = margarine_init;
export const poppins = poppins_init;
