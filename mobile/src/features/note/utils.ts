import diff from "fast-diff";

/**
 * Insert string into string at position.
 * E.q. insertStringToStringAt("Hello", " world", 5) => "Hello world"
 */
const insertStringToStringAt = (a: string, b: string, position: number) => {
  return [a.slice(0, position), b, a.slice(position)].join("");
};

/**
 * Copied from quill-delta package
 */
export type Operations = {
  insert?: string | object;
  delete?: number;
  retain?: number;
};

/**
 * TODO: Add comment explaining function
 */
export const applyOperations = (
  delta: { ops: Operations[] },
  inputString = ""
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

/**
 * Takes in an old string and current string and calculates the operations necessary to transform the old string into the current string.
 */
export const parseOperations = (oldString: string, currentString: string) => {
  const deltaArr = diff(oldString, currentString);

  const ops = deltaArr.map(delta => {
    const op: Operations = {};

    if (delta[0] === 0) {
      op.retain = delta[1].length;
    } else if (delta[0] === 1) {
      op.insert = delta[1];
    } else if (delta[0] === -1) {
      op.delete = delta[1].length;
    }

    return op;
  });

  return { ops };
};
