import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'

function mapStateToProps(state){
    return {name:state.name}
}

function mapDispatchToProps(dispatch){
    return {
        updateName:name=>
            dispatch({
                type:'UPDATE_NAME',
                name:name
            })
    }
}


 class Avatar extends React.Component {

    state = {
        photo:"https://i.loli.net/2021/06/19/Fc4WEOUyr8G3imB.jpg"
    }

    componentDidMount() {
        fetch('https://uifaces.co/api',{
            headers: new Headers({
                'X-API-KEY':'62F98310-6D0740F0-B1F286E0-C31E27FD'
            })
        })
         .then(response => response.json())
         .then(response => {
            console.log("--->",response);

            this.setState({
                photo:response[0].photo
            })

            this.props.updateName(response[0].name)
         })
        //  .catch((error) => {
        //     console.error(error);
        //   });

    }

    render() {
        return (
            <Image source = {{uri:this.state.photo}}/>
        )
    }
}

export default connect(
     mapStateToProps,
     mapDispatchToProps)
    (Avatar)

const Image = styled.Image`
     width:44px;
     height:44px;
     background: black;
     border-radius: 22px;
     margin-left: 20px;
`