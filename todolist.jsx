function TodoList() {
	const [inputVal, setInputVal] = React.useState('');
	const [content, setContent] = React.useState([]);
	
	const handleInput = event => {
		setInputVal(event.target.value);
	}
	const handleSubmit = event => {
		if (event.key == 'Enter' || event.target.id == 'submitButton'){
			if (inputVal.length > 0) {
				setContent(content.concat(inputVal));
				setInputVal('');
			}
		}
	}
	const handleDelete = event => {
		setContent(content.filter((_, i) => i != event.target.id))
	}
	
	return (
		<div class="flex-column terminal">
			<div class='row flex-between'>
				<input onChange={handleInput} value={inputVal} onKeyPress={handleSubmit}></input>
				<button onClick={handleSubmit} id='submitButton'>Submit</button>
			</div>
			{content.map((el, i) => 
						 <div class='row flex-between'>
							 <div>{el}</div>
							 <button onClick={handleDelete} id={i}>Delete</button>
						 </div>)}
		</div>
	)
}

ReactDOM.render(
	<TodoList />,
	document.getElementById('todolist')
)