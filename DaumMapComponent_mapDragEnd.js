/* global daum */

import React, { Component } from "react";

class MapDrag extends Component {
    
    // Drag하여 생성된 버튼을 눌렀을 때 작동하는 함수입니다
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
            
            // DOM객체에서 map div를 부모로 하여 버튼의 위치를 상대적으로 적용하기 위해 적은코드입니다.
            mapObj.appendChild(dragObj);
            
            // addListener함수에서 dragend의 속성을 넘겼을 때, 지도를 드래그하여 중심좌표에 변동이 생길 때 이벤트가 발생합니다.
            daum.maps.event.addListener(map, 'dragend', function() {
                let domObj = document.getElementById("whenDragged");
                domObj.hidden = false;
            });
        }
        
        // CSS예시를 위해 따로 파일을 만들지 않고 아래처럼 작성하였습니다
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
