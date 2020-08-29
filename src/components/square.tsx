import React, { PropsWithChildren } from "react";

interface SquareProps {
	black: boolean;
}

export default function Square(props: PropsWithChildren<SquareProps>) {
	const { black, children } = props;
	const fill = black ? "black" : "white";
	return (
		<div
			style={{
				backgroundColor: fill,
				width: "100%",
				height: "100%",
				textAlign: "center",
				lineHeight: "62.5px",
			}}
		>
			{children}
		</div>
	);
}
