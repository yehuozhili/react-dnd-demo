import React, { useMemo } from "react";
import Square from "./square";
import Knight from "./knight";
import { moveKnight, canMoveKnight } from "../game";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BoardSquare from "./boardSquare";

function renderSquare(
	i: number,
	[knightX, knightY]: BoardProps["knightPosition"],
	handleSquareClick: Function
) {
	const x = i % 8;
	const y = Math.floor(i / 8);
	const isKnightHere = x === knightX && y === knightY;
	const black = (x + y) % 2 === 1;
	const piece = isKnightHere ? <Knight /> : null;
	return (
		<div
			onClick={() => handleSquareClick(x, y)}
			key={i}
			style={{ width: "12.5%", height: "12.5%" }}
		>
			<BoardSquare x={x} y={y}>
				<Square black={black}>{piece}</Square>
			</BoardSquare>
		</div>
	);
}
export interface BoardProps {
	knightPosition: [number, number];
}

export default function Board(props: BoardProps) {
	const { knightPosition } = props;
	function handleSquareClick(toX: number, toY: number) {
		if (canMoveKnight(toX, toY)) {
			moveKnight(toX, toY);
		}
	}
	const squares = useMemo(() => {
		let a = [];
		for (let i = 0; i < 64; i++) {
			a.push(renderSquare(i, knightPosition, handleSquareClick));
		}
		return a;
	}, [knightPosition]);

	return (
		<DndProvider backend={HTML5Backend}>
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexWrap: "wrap",
				}}
			>
				{squares}
			</div>
		</DndProvider>
	);
}
