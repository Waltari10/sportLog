/* eslint-disable @typescript-eslint/no-explicit-any */
import Delta from "quill-delta";

const insertStringToStringAt = (a: string, b: string, position: number) => {
  return [a.slice(0, position), b, a.slice(position)].join("");
};

export const applyDelta = (delta: any, inputString: string | null) => {
  if (!inputString) {
    inputString = "";
  }

  let retainFromStart = 0;

  let tempString = inputString;

  delta.ops.forEach((op: any) => {
    if (op.retain) {
      retainFromStart = retainFromStart + op.retain;
    } else if (op.insert) {
      tempString = insertStringToStringAt(
        tempString,
        op.insert as string,
        retainFromStart
      );
      retainFromStart = retainFromStart + (op.insert as string).length;
    } else if (op.delete) {
      tempString =
        tempString.substring(0, retainFromStart) +
        tempString.substring(retainFromStart + op.delete, tempString.length);
      retainFromStart = retainFromStart + op.delete;
    }
  });

  return tempString;
};

export const parseDelta = (diffArr: any) => {
  const ops = diffArr.map((diff: any) => {
    const op: any = {};

    if (diff[0] === 0) {
      op.retain = diff[1].length;
    } else if (diff[0] === 1) {
      op.insert = diff[1];
    } else if (diff[0] === -1) {
      op.delete = diff[1].length;
    }

    return op;
  });

  return { ops };
};
