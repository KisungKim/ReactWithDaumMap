/* global daum */

import React, { Component } from "react";

class ResizeMap extends Component {

    // 버튼을 누를 때 지도의 크기를 조절하기 위한 함수입니다
    resize() {
        // 지도의 크기가 작은 상태일 때
        if(!this.state.big) {
            let mapContainer = document.getElementById('map');
            mapContainer.style.width = '600px';
            mapContainer.style.height = '600px';
            document.getElementById('handleSize').innerHTML = "작게하기";
        }
        // 지도의 크기가 큰 상태일 때
        else {
            let mapContainer = document.getElementById('map');
            mapContainer.style.width = '500px';
            mapContainer.style.height = '500px';
            document.getElementById('handleSize').innerHTML = "크게하기";
        }
        this.setState({big:!this.state.big});
        
        // relayout()을 실행하여야 지도가 변경된 크기로 적용됩니다.
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
            // 부모 객체의 위치를 기준으로 dom의 레이아웃을 잡기 위한 코드입니다.
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
