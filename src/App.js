import { useEffect, useState } from 'react';
import './App.scss';
import Board from './components/board/board.component';
import {
	emptyCells,
	playerOne,
	playerTwo,
	formulas,
	resultMessages,
} from './constants/constants';

function App() {
	const [cells, setCells] = useState(emptyCells);
	const [counter, setCounter] = useState(0);
	const [player, setPlayer] = useState(playerOne);
	const [winner, setWinner] = useState('');
	const [tie, setTie] = useState(false);

	const reset = () => {
		setCounter(0);
		setCells(emptyCells);
		setPlayer(playerOne);
		setWinner('');
		setTie(false);
	};

	const onClickHandler = (e) => {
		const currentCell = e.currentTarget;
		const indx = currentCell.id;
		if (cells[indx]) return;
		setCells((cellArray) => {
			let newArray = [...cellArray];
			newArray[indx] = player;
			return newArray;
		});
		setPlayer((prev) => {
			if (prev === playerOne) {
				return playerTwo;
			} else {
				return playerOne;
			}
		});
		setCounter((prev) => prev + 1);
	};

	useEffect(() => {
		if (counter < 3) return;
		let check = false;
		formulas.forEach((formula) => {
			if (cells[formula[0]]) {
				check =
					cells[formula[0]] === cells[formula[1]] &&
					cells[formula[0]] === cells[formula[2]];
			}
			if (check) {
				setWinner(cells[formula[0]]);
				return;
			}
		});
		if (counter === 9) setTie(true);
	}, [cells]);

	useEffect(() => {
		if (tie && !winner) {
			alert(resultMessages['T']);
		}
		reset();
	}, [tie]);

	useEffect(() => {
		if (winner === playerOne) {
			alert(resultMessages[playerOne]);
		} else if (winner === playerTwo) {
			alert(resultMessages[playerTwo]);
		}
		reset();
	}, [winner]);

	return (
		<div className='App'>
			<Board
				cells={cells}
				onClickHandler={onClickHandler}
			/>
		</div>
	);
}

export default App;
