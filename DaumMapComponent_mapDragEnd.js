/* global daum */

import React, { Component } from "react";

class MapDrag extends Component {

    hideElement () {
        document.getElementById("whenDragged").hidden=true;
        this.props.handleRemap(
            this.props.map.getCenter().getLat(),
            this.props.map.getCenter().getLng()
        );
    }

    constructor(props) {
        super(props);
        this.hideElement = this.hideElement.bind(this);
    }


    render() {
        let map = this.props.map;
        let lng = this.props.lng;
        let lat = this.props.lat;

        if(map) {
            let mapObj = document.getElementById('map');
            let dragObj = document.getElementById('whenDragged');
            mapObj.appendChild(dragObj);
            daum.maps.event.addListener(map, 'dragend', function() {
                let domObj = document.getElementById("whenDragged");
                domObj.hidden = false;
            });
        }

        const dragend_style = {
            "position":"absolute",
            "backgroundColor":"#FE9A2E",
            "top":"80%",
            "left":"30%",
            "zIndex":"2",
            "MozBorderRadius":"10px",
            "WebkitBorderRadius":"10px",
            "fontSize":"20px"
        };

        return(
        <section>
            <button
                id="whenDragged"
                hidden="true"
                style={dragend_style}
                onClick={this.hideElement}
            >
            바뀐 위치로 이동합니다
            </button>
        </section>
        );
    }
}

export default MapDrag;