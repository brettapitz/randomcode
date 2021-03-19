function LightsOutButton(props) {
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

class LightsOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lights: Array(
                Array(5).fill(false),
                Array(5).fill(false),
                Array(5).fill(false),
                Array(5).fill(false),
                Array(5).fill(false),
            ),
            win: false,
        }
    }

    renderButton(i, j) {
        return (
            <LightsOutButton
              on={this.state.lights[i][j]}
              onClick = {() => this.handleClick(i, j)}
            />
        );
    }

    handleClick(i, j) {
        const lights = this.state.lights.slice();
        let win = false;
        let len = lights.length - 1;
        let sum = 0;

        lights[i][j] = !lights[i][j];
        if (i < len) {
            lights[i+1][j] = !lights[i+1][j]
        }
        if (j < len) {
            lights[i][j+1] = !lights[i][j+1]
        }
        if (i > 0) {
            lights[i-1][j] = !lights[i-1][j]
        }
        if (j > 0) {
            lights[i][j-1] = !lights[i][j-1]
        }

        for (let x = 0; x < len; x++) {
            sum += lights[x].filter(Boolean).length;
        }
        if (sum == 0) {
            win = true;
        }

        this.setState({
            lights: lights,
            win: win,
        })
    }

    render() {
        return (
            <div>
              <div>
                {this.renderButton(0, 0)}
                {this.renderButton(0, 1)}
                {this.renderButton(0, 2)}
                {this.renderButton(0, 3)}
                {this.renderButton(0, 4)}
              </div>
              <div>
                {this.renderButton(1, 0)}
                {this.renderButton(1, 1)}
                {this.renderButton(1, 2)}
                {this.renderButton(1, 3)}
                {this.renderButton(1, 4)}
              </div>
              <div>
                {this.renderButton(2, 0)}
                {this.renderButton(2, 1)}
                {this.renderButton(2, 2)}
                {this.renderButton(2, 3)}
                {this.renderButton(2, 4)}
              </div>
              <div>
                {this.renderButton(3, 0)}
                {this.renderButton(3, 1)}
                {this.renderButton(3, 2)}
                {this.renderButton(3, 3)}
                {this.renderButton(3, 4)}
              </div>
              <div>
                {this.renderButton(4, 0)}
                {this.renderButton(4, 1)}
                {this.renderButton(4, 2)}
                {this.renderButton(4, 3)}
                {this.renderButton(4, 4)}
              </div>
            </div>
        )
    }
}

const domContainer = document.querySelector('#lightsout_container');
domContainer.ondragstart = function() {return false};
ReactDOM.render(<LightsOut />, domContainer);
