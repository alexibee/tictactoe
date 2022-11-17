import './board.styles.scss';

const Board = ({ cells, onClickHandler }) => {
	return (
		<div className='board-container'>
			<div className='board-grid'>
				{cells.map((cell, indx) => (
					<div
						onClick={onClickHandler}
						key={indx}
						id={indx}
						className='cell'
					>
						{cell}
					</div>
				))}
			</div>
		</div>
	);
};

export default Board;
