/* global daum */

import React, { Component } from "react";
import SearchBar from "./SearchBar";
import Coord2Address from "./DaumMapComponent_coord2Address.js";
import ResizeMap from "./DaumMapComponent_resize.js";
import MapDrag from "./DaumMapComponent_mapDragEnd.js";
import StaticMap from "./DaumMapComponent_staticMap.js";

class DaumMapComponent_createMap extends Component {
    
    // MapDrag컴포넌트에서 OnClick 이벤트 시 드래그된 중심좌표를 중심으로 다시 지도를 그리기 위한 함수입니다
    handleRemap(lat, lng) {
        this.setState({ centerLat: lat, centerLng: lng });
    }

    handleAddressChange(newAddress) {
        this.setState({centerAddress: newAddress});

        // 주소로 장소를 검색하면 해당하는 위도, 경도를 리턴하는 코드를 활용한 예시입니다
        let geocoder = new daum.maps.services.Geocoder();
        geocoder.addressSearch(newAddress, (function(result, status) {
            if (status === daum.maps.services.Status.OK) {
                this.setState({centerLat: result[0].y, centerLng: result[0].x});
            }
        }).bind(this));
    }

    constructor(props) {
        super(props);
        this.state = {
            centerAddress : '',
            centerLat : '',
            centerLng : ''
        };
        // React식 문법이 아닌, 일반 js문법을 기준으로 소스코드를 작성했기 때문에 bind메소드를 추가했습니다
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleRemap = this.handleRemap.bind(this);
    }

    render() {
        const { centerAddress, centerLat, centerLng, mapTypes } = this.state;
        let mapContainer, mapOption, map;
        
        // SearchBar을 통해 정보가 입력되어야 지도가 그려지게끔 조건을 걸었습니다
        if(centerLat && centerLng) {
            mapContainer = document.getElementById("map"),
            mapOption = {
                center: new daum.maps.LatLng(centerLat, centerLng),
                level: 5
            };
            map = new daum.maps.Map(mapContainer, mapOption);
        }
        /* 
        ** 각 컴포넌트의 역할은 다음과 같습니다 **
           SearchBar : 검색창 관련 컴포넌트
           Coord2Address : 현재 중심 좌표를 기준으로 정보를 표시하는 것과 관련된 컴포넌트
           MapDrag : 드래그 이벤트가 발생했을 때
           ResizeMap : 지도의 크기를 조절할 때
           StaticMap : 현재 지도의 이미지 버젼을 화면에 띄울 때
       ** ==============================  **
       */
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
