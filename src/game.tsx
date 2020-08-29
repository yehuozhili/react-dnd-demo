import { BoardProps } from "./components/board";

export let knightPosition: BoardProps["knightPosition"] = [0, 0];
let observer: null | Function = null;

function emitChange() {
	if (observer) {
		console.log(knightPosition);
		observer(knightPosition);
	}
}

export function observe(o: Function) {
	observer = o;
	emitChange();
}

export function moveKnight(toX: number, toY: number) {
	knightPosition = [toX, toY];
	emitChange();
}

export function canMoveKnight(toX: number, toY: number) {
	const [x, y] = knightPosition;
	const dx = toX - x;
	const dy = toY - y;

	return (
		(Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
		(Math.abs(dx) === 1 && Math.abs(dy) === 2)
	);
}
