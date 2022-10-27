import React, { Component } from "react";

class RescueForm extends Component {
    constructor() {
        super();
        this.state = {
            name: "React"
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    onValueChange(event) {
        this.setState({
            selectedOption: event.target.value
        });
    }

    formSubmit(event) {
        event.preventDefault();
        console.log(this.state.selectedOption)
    }


    render() {
        return (
            <form onSubmit={this.formSubmit}>
                <div className="radio">
                    <label>
                        <input
                            type="radio"
                            value="Rescue1"
                            checked={this.state.selectedOption === "Rescue1"}
                            onChange={this.onValueChange}
                        />
                        Rescue1
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input
                            type="radio"
                            value="Rescue2"
                            checked={this.state.selectedOption === "Rescue2"}
                            onChange={this.onValueChange}
                        />
                        Rescue2
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input
                            type="radio"
                            value="Rescue3"
                            checked={this.state.selectedOption === "Rescue3"}
                            onChange={this.onValueChange}
                        />
                        Rescue3
                    </label>
                </div>
                <div>
                    Selected option is : {this.state.selectedOption}
                </div>
                {/* upon button click, run function that takes you to the checkout */}
                <button className="btn btn-default" type="submit">
                    Proceed To Checkout
                </button>
            </form>
        );
    }
}

export default RescueForm;
