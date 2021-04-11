import UndoRedo from "./index";

describe("UndoRedo", () => {
	let ur;

	beforeEach(() => {
		ur = new UndoRedo();
	});

	it("general", () => {
		ur.push(1);
		ur.push(2);
		ur.push(3);
		expect(ur.getData()).toStrictEqual([1, 2, 3]);
		expect(ur.isUndoAvailable()).toBe(true);
		expect(ur.isRedoAvailable()).toBe(false);
		expect(ur.redo()).toBeUndefined();
		expect(ur.undo()).toBe(2);
		expect(ur.getData()).toStrictEqual([1, 2, 3]);
		expect(ur.isUndoAvailable()).toBe(true);
		expect(ur.isRedoAvailable()).toBe(true);
		expect(ur.undo()).toBe(1);
		expect(ur.getData()).toStrictEqual([1, 2, 3]);
		expect(ur.isUndoAvailable()).toBe(false);
		expect(ur.isRedoAvailable()).toBe(true);
		expect(ur.undo()).toBeUndefined();
		expect(ur.redo()).toBe(2);
		expect(ur.getData()).toStrictEqual([1, 2, 3]);
		expect(ur.isUndoAvailable()).toBe(true);
		expect(ur.isRedoAvailable()).toBe(true);
		expect(ur.redo()).toBe(3);
		expect(ur.getData()).toStrictEqual([1, 2, 3]);
		expect(ur.isUndoAvailable()).toBe(true);
		expect(ur.isRedoAvailable()).toBe(false);
		expect(ur.redo()).toBeUndefined();

		expect(ur.undo()).toBe(2);
		expect(ur.getData()).toStrictEqual([1, 2, 3]);
		ur.push(4);
		expect(ur.getData()).toStrictEqual([1, 2, 4]);
	});

	it("empty", () => {
		expect(ur.undo()).toBeUndefined();
		expect(ur.redo()).toBeUndefined();
		expect(ur.getData()).toStrictEqual([]);
	});

	it("one entry", () => {
		ur.push(1);
		expect(ur.isUndoAvailable()).toBe(false);
		expect(ur.isRedoAvailable()).toBe(false);
		expect(ur.undo()).toBeUndefined();
		expect(ur.redo()).toBeUndefined();
		expect(ur.getData()).toStrictEqual([1]);
	});

	it("length", () => {
		ur = new UndoRedo({ size: 5 });
		ur.push(1);
		expect(ur).toHaveLength(1);
		ur.push(2);
		expect(ur).toHaveLength(2);
		ur.push(3);
		expect(ur).toHaveLength(3);
		ur.push(4);
		expect(ur).toHaveLength(4);
		ur.push(5);
		expect(ur).toHaveLength(5);
		expect(ur.getData()).toStrictEqual([1, 2, 3, 4, 5]);

		ur.push(6);
		expect(ur).toHaveLength(5);
		expect(ur.TAIL).toHaveProperty("data", 2);
		expect(ur.getData()).toStrictEqual([2, 3, 4, 5, 6]);

		ur.push(7);
		expect(ur).toHaveLength(5);
		expect(ur.TAIL).toHaveProperty("data", 3);
		expect(ur.getData()).toStrictEqual([3, 4, 5, 6, 7]);
	});

	it("reset", () => {
		ur.push(1);
		ur.reset();
		expect(ur.TAIL).toBeUndefined();
		expect(ur.HEAD).toBeUndefined();
		expect(ur.CURR).toBeUndefined();
		expect(ur).toHaveLength(0);
	});
});
