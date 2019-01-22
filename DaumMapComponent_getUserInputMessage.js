/* global daum */

import React, { Component } from "react";
// import axios from "axios";

// DB에 넣기 위해 필요한 모듈(backend)
// import DjangoCSRFToken from 'django-react-csrftoken'

class GetUserInputMessage extends Component {

    state = {
        userInput: '',
        sampleDatabase: []
    }

    // 데이터베이스 미리보기, 실제 앱에서는 없어도 상관없음
    showCreatedMessage = () => {
        let message = "<div>==========데이터 베이스 미리보기==========</div>";
        for(let lineNum=0;lineNum<this.state.sampleDatabase.length;lineNum++) {
            message += "<div>"+lineNum + " " + 
            this.state.sampleDatabase[lineNum].lat + " " + 
            this.state.sampleDatabase[lineNum].lng + " " + 
            this.state.sampleDatabase[lineNum].userInput + "</div>";
        }
        message += "<div>===================================</div>"
        document.getElementById("showResult").innerHTML = message;
    }

    onChange = (e) => {
        console.log(e.target.value);
        this.setState({userInput : e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();

        const userInput = this.state.userInput;
        let targetObj = document.getElementById('inputMessageForm');
        let lat = targetObj.getAttribute('lat');
        let lng = targetObj.getAttribute('lng');

        console.log("최종결과는", lat, lng, userInput);

        document.getElementById('stopAddMode').hidden = true;
        document.getElementById('inputMessageForm').hidden = true;
        document.getElementById('confirmAddress').hidden = true;

        // 데이터베이스 미리보기 위한 코드, 실제 앱에는 없음
        this.state.sampleDatabase.push({'userInput':userInput, 'lat':lat, 'lng':lng});
        this.showCreatedMessage();

        // DaumMapComponent_getUserInputAddress.js 의 함수 호출(인포윈도우 내용 : userInput)
        this.props.confirmMarker(userInput);

        // DB에 넣는 과정(backend)
        // const csrf = e.target.csrfmiddlewaretoken.value;
        // axios.post('/app01/usersended', 
        // { 'userInput': userInput, 'lat':lat, 'lng':lng },
        // { headers: {
        //     'X-CSRFToken':csrf
        //     }
        // })
        //     .then((result) => {
        //         console.log(result);
        //     });
    }


    render() {
        const inputRegion = this.state.userInput;
        return (
            <form onSubmit={this.onSubmit}>
                {/* <DjangoCSRFToken /> */}
                <input
                    type="text"
                    name="inputRegion"
                    value={inputRegion}
                    onChange={this.onChange} />
                <button type="submit">제출</button>
            </form>
        );
    }
}

export default GetUserInputMessage;
