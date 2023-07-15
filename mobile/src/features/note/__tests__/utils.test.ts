import Delta from "quill-delta";

import { applyOperations } from "../utils";

describe("applyOperations", () => {
  test("apply delta, retain", () => {
    const delta = new Delta().retain(3);
    const res = applyOperations(delta, "foo");
    expect(res).toEqual("foo");
  });

  test("apply delta, adding to end", () => {
    const delta = new Delta().retain(3).insert("faa");
    const res = applyOperations(delta, "foo");
    expect(res).toEqual("foofaa");
  });

  test("apply delta, removing from end", () => {
    const delta = new Delta().retain(2).delete(1);
    const res = applyOperations(delta, "foo");
    expect(res).toEqual("fo");
  });

  test("apply delta, removing from start", () => {
    const delta = new Delta().delete(1);
    const res = applyOperations(delta, "foo");
    expect(res).toEqual("oo");
  });

  test("apply delta, adding to start", () => {
    const delta = new Delta().insert("a");
    const res = applyOperations(delta, "foo");
    expect(res).toEqual("afoo");
  });

  test("apply delta, adding to middle", () => {
    const delta = new Delta().retain(2).insert("l");
    const res = applyOperations(delta, "yar");
    expect(res).toEqual("yalr");
  });

  test("apply delta, removing from middle", () => {
    const delta = new Delta().retain(1).delete(1);
    const res = applyOperations(delta, "for");
    expect(res).toEqual("fr");
  });
});
