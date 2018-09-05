/* global daum */

import React, { Component } from "react";

class ResizeMap extends Component {

    resize() {
        if(!this.state.big) {
            let mapContainer = document.getElementById('map');
            mapContainer.style.width = '600px';
            mapContainer.style.height = '600px';
            document.getElementById('handleSize').innerHTML = "작게하기";
        }
        else {
            let mapContainer = document.getElementById('map');
            mapContainer.style.width = '500px';
            mapContainer.style.height = '500px';
            document.getElementById('handleSize').innerHTML = "크게하기";
        }
        this.setState({big:!this.state.big});
        this.props.map.relayout();
    }

    constructor(props) {
        super(props);
        this.state = {
            big:false
        }
        this.resize = this.resize.bind(this);
    }

    render() {
        let map = this.props.map;
        if(map) {
            let mapObj = document.getElementById('map');
            let dragObj = document.getElementById('handleSize');
            dragObj.hidden = false;
            mapObj.appendChild(dragObj);
        }

        const handlesize_style = {
            "position":"absolute",
            "backgroundColor":"white",
            "top":"5%",
            "left":"2%",
            "zIndex":"2",
            "MozBorderRadius":"10px",
            "WebkitBorderRadius":"10px",
            "fontSize":"20px"
        };
        return(
        <button
            id="handleSize"
            hidden="true"
            style={handlesize_style}
            onClick={this.resize}
        >
        크게하기
        </button>);
    }

}

export default ResizeMap;