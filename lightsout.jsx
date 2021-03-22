function LightsOutButton(props) {
    // Button gets it's on/off value from the LightsOut parent
    if (props.on) {
        return (
            <img
            className="lights_out_button"
            src="Button_On.png"
            onClick={props.onClick}
            ></img>
        )
    } else {
        return (
            <img
            className="lights_out_button"
            src="Button_Off.png"
            onClick={props.onClick}
            ></img>
        )
    }
}

function LightsOut() {
    // Create a deep copy of level array, so the original still
    // exists for reset
    let level = JSON.parse(JSON.stringify(game_data.levels[0]));

    // State
    const [current, setCurrent] = React.useState(0);
    const [lights, setLights] = React.useState(level);
    const [win, setWin] = React.useState(false);

    // Create buttons
    const renderButton = (i, j) => {
        return (
            <LightsOutButton
              on={lights[i][j]}
              onClick = {() => handleClick(i, j)}
            />
        );
    };

    // Button press
    const handleClick = (i, j) => {
        const newLights = lights.slice();
        let len = newLights.length - 1;
        let sum = 0;

        newLights[i][j] = !newLights[i][j];
        if (i < len) {
            newLights[i+1][j] = !newLights[i+1][j]
        }
        if (j < len) {
            newLights[i][j+1] = !newLights[i][j+1]
        }
        if (i > 0) {
            newLights[i-1][j] = !newLights[i-1][j]
        }
        if (j > 0) {
            newLights[i][j-1] = !newLights[i][j-1]
        }

        for (let x = 0; x < len; x++) {
            sum += newLights[x].filter(Boolean).length;
        }
        if (sum == 0) {
            setWin(true)
        }

        setLights(newLights);
    }

    // Level select
    const handleChange = (event) => {
        let val = event.target.value
        setCurrent(val);
        reset(val);
    }

    // Reset button
    // Note: Cannot reset using "current" state - need to pass a parameter.
    // States update asynchronously, so one should never depend upon another.
    const reset = (l) => {
        level = JSON.parse(JSON.stringify(game_data.levels[l]));
        setLights(level);
    }

    return (
        <div>
            <div>
            {renderButton(0, 0)}
            {renderButton(0, 1)}
            {renderButton(0, 2)}
            {renderButton(0, 3)}
            {renderButton(0, 4)}
            </div>
            <div>
            {renderButton(1, 0)}
            {renderButton(1, 1)}
            {renderButton(1, 2)}
            {renderButton(1, 3)}
            {renderButton(1, 4)}
            </div>
            <div>
            {renderButton(2, 0)}
            {renderButton(2, 1)}
            {renderButton(2, 2)}
            {renderButton(2, 3)}
            {renderButton(2, 4)}
            </div>
            <div>
            {renderButton(3, 0)}
            {renderButton(3, 1)}
            {renderButton(3, 2)}
            {renderButton(3, 3)}
            {renderButton(3, 4)}
            </div>
            <div>
            {renderButton(4, 0)}
            {renderButton(4, 1)}
            {renderButton(4, 2)}
            {renderButton(4, 3)}
            {renderButton(4, 4)}
            </div>
            <div className="lightsout_controls">
              <select value={current} onChange={handleChange}>
                <option value="0">Level 1</option>
                <option value="1">Level 2</option>
                <option value="2">Level 3</option>
                <option value="3">Level 4</option>
                <option value="4">Level 5</option>
                <option value="5">Level 6</option>
                <option value="6">Level 7</option>
                <option value="7">Empty Board</option>
              </select>
              <button onClick={() => reset(current)}>Reset</button>
            </div>
        </div>
    )
}

const domContainer = document.querySelector('#lightsout_container');
domContainer.ondragstart = function() {return false};
ReactDOM.render(<LightsOut />, domContainer);
