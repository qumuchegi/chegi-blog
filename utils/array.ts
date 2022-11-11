export const joinAnyToArr = (arr: Array<any>, insert: any) => {
  return arr
    .reduce((pre, item) => {
      return [...pre, item, insert];
    }, [])
    .slice(0, -1);
};
