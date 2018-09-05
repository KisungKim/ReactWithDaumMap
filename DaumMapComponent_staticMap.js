/* global daum */

import React, { Component } from "react";

class StaticMap extends Component {

    render() {
        const { map, lat, lng } = this.props;
        if(map) {
            let staticMapContainer = document.getElementById("staticMap");
            if(staticMapContainer.childNodes.length > 0) {
                staticMapContainer.removeChild(staticMapContainer.firstChild);
            }
            let markerPosition  = new daum.maps.LatLng(lat, lng);
            let marker = {
                position: markerPosition
            };
            let staticMapOption = {
                    center : new daum.maps.LatLng(lat, lng),
                    level : 5,
                    marker : marker
                };
            document.body.appendChild(staticMapContainer);
            staticMapContainer.hidden = false;
            let staticMap = new daum.maps.StaticMap(staticMapContainer, staticMapOption);
        }

        const mapStyle = {
            'margin': '2px',
            'width': '200px',
            'height': '200px',
            'border': '2px solid black'
        };
        return(<div hidden="true" id="staticMap" style={mapStyle}></div>);

    }

}

export default StaticMap;
