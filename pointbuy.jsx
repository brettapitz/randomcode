const Stat = ({ability, total, adjustTotal}) => {
	const [statValue, setStatValue] = React.useState(8);
	
	const decrement = () => {
		let decCost = statValue > 13 ? 2 : 1;
		if (statValue > 1) {
			adjustTotal(decCost);
			setStatValue(statValue - 1);
		}
	}
	const increment = () => {
		let incCost = statValue >= 13 ? 2 : 1;
		if (total >= incCost && statValue < 15) {
			adjustTotal(-incCost);
			setStatValue(statValue + 1);
		}
	}
	const reset = () => {
		if (statValue <= 13) {
			adjustTotal(statValue - 8);
			setStatValue(8);
		} else {
			adjustTotal(2 * statValue - 21);
			setStatValue(8);
		}
	}
	
	return (
		<div className='stat flex-between'>
			<button className='decrement' onClick={decrement}>-</button>
			<div>{ability}</div>
			<div className='statValue'>{statValue}</div>
			<button className='increment' onClick={increment}>+</button>
			<button className='reset' onClick={reset}>{'\u27f3'}</button>
		</div>
	)
}

const Allocator = () => {
	const [total, setTotal] = React.useState(27);
	
	const adjustTotal = val => {
		setTotal(total + val);
	}
	const reset = () => {
		let resetButtons = document.getElementsByClassName('reset');
		for (let resetButton of resetButtons) {
			resetButton.click();
		}
		setTotal(27);
	}
	
	return(
		<div id='allocator'>
			<div className='flex-between' id='total'>
				<div>{"Total: " + total}</div>
				<button onClick={reset}>Reset</button>
			</div>
			<Stat ability='Strength' total={total} adjustTotal={adjustTotal}/>
			<Stat ability='Dexterity' total={total} adjustTotal={adjustTotal}/>
			<Stat ability='Constitution' total={total} adjustTotal={adjustTotal}/>
			<Stat ability='Intelligence' total={total} adjustTotal={adjustTotal}/>
			<Stat ability='Wisdom' total={total} adjustTotal={adjustTotal}/>
			<Stat ability='Charisma' total={total} adjustTotal={adjustTotal}/>
		</div>
	)
}

ReactDOM.render(
	<Allocator />,
	document.getElementById('pointbuy')
)