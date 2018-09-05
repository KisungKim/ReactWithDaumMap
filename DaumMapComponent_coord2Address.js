/* global daum */

import React, { Component } from "react";

class Coord2Address extends Component {

    render() {
        let map = this.props.map;
        if(map) {
            let center = map.getCenter();
            let lng = center.getLng(),
                lat = center.getLat();
            let messageCoord = "<div>중심좌표를 기준으로 " + lat + " " + lng + "</div>";
            let domObjCoord = document.getElementById("centerCoordFromMapObj");
            domObjCoord.innerHTML = messageCoord;

            (new daum.maps.services.Geocoder()).coord2Address(lng, lat, function(result, status) {
                if(status === daum.maps.services.Status.OK) {
                    let messageAddress = "<div>그래서 현재 위치는 " +
                        result[0].address.address_name + ", 현재 구는 " +
                        result[0].address.region_2depth_name + " 입니다.</div>";
                    let domObjAddr = document.getElementById("centerAddressFromMapObj");
                    domObjAddr.innerHTML = messageAddress;
                }
                else {
                    console.log(status);
                }
            });
        }
        return(
            <section>
                <div id="centerCoordFromMapObj"></div>
                <div id="centerAddressFromMapObj"></div>
            </section>
        );
    }
}

export default Coord2Address;