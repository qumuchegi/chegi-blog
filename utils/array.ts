export const joinAnyToArr = (arr: Array<any>, insert: any) => {
  return arr
    .reduce((pre, item) => {
      return [...pre, item, insert];
    }, [])
    .slice(0, -1);
};
export const groupArr = (
  arr: Array<any>,
  groupSize: number
): Array<Array<any>> => {
  return arr.reduce(
    (pre, i) => {
      if (pre.slice(-1)[0].length < groupSize) {
        return [...pre.slice(0, -1), [...pre.slice(-1)[0], i]];
      }
      return [...pre, [i]];
    },
    [[]]
  );
};
