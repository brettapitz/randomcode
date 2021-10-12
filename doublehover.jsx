const Pic = ({im}) => {
	return (
		<img className='boxart' src={im} width='250px' height='250px'></img>
	)
}

const Button = ({price}) => {
	const [hovering, setHovering] = React.useState(false);
	const toggle = () => setHovering(!hovering);
	return (
		<button className='buyButton' onMouseEnter={toggle} onMouseLeave={toggle}>
      {hovering ? 'Buy!' : '$' + price}
    </button>
	)
}

const Box = ({game}) => {	
	return (
		<card className='box'>
			<Pic im={game.cover} />
			<div className='box_row'>
				<Button price={game.price}/>
			</div>
		</card>
	)
}

var content = games.map((el, i) => <Box game={el} key={i}/>);

ReactDOM.render(
	content,
	document.getElementById('game_store')
);