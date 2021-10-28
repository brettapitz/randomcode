const Dice = ({diceVal}) => {
	const [display, setDisplay] = React.useState('\u2680');
	
	React.useEffect(() => {
		switch (diceVal) {
			case 2: setDisplay('\u2681'); break;
			case 3: setDisplay('\u2682'); break;
			case 4: setDisplay('\u2683'); break;
			case 5: setDisplay('\u2684'); break;
			case 6: setDisplay('\u2685'); break;
			default: setDisplay('\u2680');
		}
	}, [diceVal]);
	
	return (
		<div className='dice'>{display}</div>
	)
}

const Stat = ({statName}) => {
	const [vals, setVals] = React.useState([0, 0, 0, 0]);
	const [sum, setSum] = React.useState(0);
	const [sumTrigger, setSumTrigger] = React.useState(false);
	
	React.useEffect(() => {
		if (sumTrigger) {
			setSum(
				vals.reduce((acc, val) => acc + val) - Math.min(...vals)
			);
			setSumTrigger(false);
		}
	}, [sumTrigger]);
	
	const handleClick = () => {
		let i = startRandomizer(100);
		setTimeout(() => {
			clearInterval(i);
			setSumTrigger(true);
		}, 500);
	}
	const startRandomizer = interval => {
		 return setInterval(() => {
			setVals(
				vals.map(el => Math.floor(Math.random()*6+1))
			)}, interval);
	}
	
	return(
		<div className='row flex-between'>
			<div className='statDisplay'>{statName}: {sum}</div>
			{vals.map((val, i) => <Dice diceVal={val} key={i}/>)}
			<button onClick={handleClick} className='rollButton'>{'\u27f3'}</button>
		</div>
	)
}

const RandGen = () => {
	const handleClick = () => {
		let buttons = document.getElementsByClassName('rollButton');
		for (const button of buttons) {
			button.click();
		}
	}
	return (
		<div>
			<Stat statName={'Strength'} key={0}/>
			<Stat statName={'Dexterity'} key={1}/>
			<Stat statName={'Constitution'} key={2}/>
			<Stat statName={'Intelligence'} key={3}/>
			<Stat statName={'Wisdom'} key={4}/>
			<Stat statName={'Charisma'} key={5}/>
			<button onClick={handleClick}>Roll All</button>
		</div>
	)
}

ReactDOM.render(
	<RandGen />,
	document.getElementById('dicestats')
)