import React, { Component } from "react";

class SearchBar extends Component {

    handleValueChange(e) {
        this.setState({ address : e.target.value});
        console.log(e.target.value);
    }

    constructor(props) {
        super(props);
        this.state = {
            address : ''
        };
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    render() {
        return(
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    this.props.handleAddressChange(this.state.address);
                }}
            >
                <input
                    onChange={(e) => {
                        this.handleValueChange(e);
                    }}
                    value={this.state.value}
                    placeholder="지역을 입력하세요"
                />
                <input type="submit" />
            </form>
        );
    }
}

export default SearchBar;