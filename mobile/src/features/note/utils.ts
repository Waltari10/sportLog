const insertStringToStringAt = (a: string, b: string, position: number) => {
  return [a.slice(0, position), b, a.slice(position)].join("");
};

type Delta = [number, string];

type Operations = {
  retain?: number;
  insert?: string;
  delete?: number;
};

export const applyOperations = (
  delta: { ops: Operations[] },
  inputString: string | null = ""
) => {
  let retainFromStart = 0;

  let tempString = inputString;

  delta.ops.forEach((op: Operations) => {
    if (op.retain) {
      retainFromStart = retainFromStart + op.retain;
    } else if (op.insert && typeof tempString === "string") {
      tempString = insertStringToStringAt(
        tempString,
        op.insert as string,
        retainFromStart
      );
      retainFromStart = retainFromStart + (op.insert as string).length;
    } else if (op.delete && typeof tempString === "string") {
      tempString =
        tempString.substring(0, retainFromStart) +
        tempString.substring(retainFromStart + op.delete, tempString.length);
      retainFromStart = retainFromStart + op.delete;
    }
  });

  return tempString;
};

export const parseDelta = (diffArr: Delta[]) => {
  const ops = diffArr.map((diff: Delta) => {
    const op: Operations = {};

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
