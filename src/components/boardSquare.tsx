import React, { PropsWithChildren } from "react";
import { ItemTypes } from "./knight";
import { useDrop } from "react-dnd";
import { moveKnight, canMoveKnight } from "../game";

const Overlay = ({ color }: { color: string }) => {
	return (
		<div
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				height: "100%",
				width: "100%",
				zIndex: 1,
				opacity: 0.5,
				backgroundColor: color,
			}}
		/>
	);
};

export default function BoardSquare({
	x,
	y,
	children,
}: PropsWithChildren<{ x: number; y: number }>) {
	const [{ isOver, canDrop }, drop] = useDrop({
		accept: ItemTypes.KNIGHT,
		canDrop: () => canMoveKnight(x, y),
		drop: () => moveKnight(x, y),
		collect: (mon) => ({
			isOver: !!mon.isOver(),
			canDrop: !!mon.canDrop(),
		}),
	});
	return (
		<div
			ref={drop}
			style={{
				position: "relative",
				width: "100%",
				height: "100%",
			}}
		>
			{children}
			{isOver && !canDrop && <Overlay color="red" />}
			{!isOver && canDrop && <Overlay color="yellow" />}
			{isOver && canDrop && <Overlay color="green" />}
		</div>
	);
}
