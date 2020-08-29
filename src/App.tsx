import React, { useState, useMemo } from "react";
import "./App.css";
import Board from "./components/board";
import { knightPosition, observe } from "./game";

function App() {
	const setState = useState(0)[1];
	useMemo(() => {
		observe(() => setState((st) => st + 1));
	}, [setState]);
	return <Board knightPosition={knightPosition} />;
}

export default App;
