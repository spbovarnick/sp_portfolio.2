import { PortfolioQueryResult } from "@/sanity/types";

export const shuffle = (array: PortfolioQueryResult) => {
  const len = array.length;
  const shuffle = array.slice();
  for (let i = len - 1; i > 0; i -= 1){
    const rando = Math.floor(Math.random() * (i + 1));
    const current = shuffle[i];
    shuffle[i] = shuffle[rando];
    shuffle[rando] = current
  };
  return shuffle;
}