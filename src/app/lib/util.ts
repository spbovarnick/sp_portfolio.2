import { PortfolioQueryResult } from "@/sanity/types";


export const imageShuffler = <T,>(array: T[]) => {
  const len = array.length;
  const shuffledImgs = array.slice();
  for (let i = len - 1; i > 0; i -= 1) {
    const rando = Math.floor(Math.random() * (i + 1));
    const current = shuffledImgs[i];
    shuffledImgs[i] = shuffledImgs[rando];
    shuffledImgs[rando] = current
  };
  return shuffledImgs;
}

export const shuffle = (array: PortfolioQueryResult) => {
  const len = array.length;
  const shuffled = array.slice();
  for (let i = len - 1; i > 0; i -= 1){
    const rando = Math.floor(Math.random() * (i + 1));
    const current = shuffled[i];
    shuffled[i] = shuffled[rando];
    shuffled[rando] = current
  };
  return shuffled.map(proj => ({
    ...proj,
    photos: imageShuffler(proj.photos ?? [])
  }));
}