/* global daum */

import React, { Component } from "react";
import SearchBar from "./SearchBar";
import Coord2Address from "./DaumMapComponent_coord2Address.js";
import ResizeMap from "./DaumMapComponent_resize.js";
import MapDrag from "./DaumMapComponent_mapDragEnd.js";
import StaticMap from "./DaumMapComponent_staticMap.js";

class DaumMapComponent_createMap extends Component {

    handleRemap(lat, lng) {
        this.setState({ centerLat: lat, centerLng: lng });
    }

    handleAddressChange(newAddress) {
        this.setState({centerAddress: newAddress});

        // ***** 주소로 장소를 검색하면 해당하는 위도, 경도를 리턴하는 코드를 활용한 예시입니다 *****
        let geocoder = new daum.maps.services.Geocoder();
        geocoder.addressSearch(newAddress, (function(result, status) {
            if (status === daum.maps.services.Status.OK) {
                this.setState({centerLat: result[0].y, centerLng: result[0].x});
            }
        }).bind(this));
        // ***** end
    }

    constructor(props) {
        super(props);
        this.state = {
            centerAddress : '',
            centerLat : '',
            centerLng : ''
        };

        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleRemap = this.handleRemap.bind(this);
    }

    render() {
        const { centerAddress, centerLat, centerLng, mapTypes } = this.state;
        let mapContainer, mapOption, map;

        if(centerLat && centerLng) {
            mapContainer = document.getElementById("map"),
            mapOption = {
                center: new daum.maps.LatLng(centerLat, centerLng),
                level: 5
            };
            map = new daum.maps.Map(mapContainer, mapOption);
        }
        return(
            <section>
                <SearchBar
                    handleAddressChange={this.handleAddressChange}
                />
                <Coord2Address map={map} />
                <MapDrag map={map} lat={centerLat} lng={centerLng} handleRemap={this.handleRemap} />
                <ResizeMap map={map} />
                <StaticMap map={map} lat={centerLat} lng={centerLng} />
            </section>
        );
    }
}

export default DaumMapComponent_createMap;