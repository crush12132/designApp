import React from 'react'
import styled from 'styled-components'

export default class CoursesScreen extends React.Component {
   
   static navigationOptions = {
    //    title:'Section'
        header:null
   }
   
    render() {
        return (
            <Container>
                <Text>CoursesScreen</Text>
               
            </Container>
        )
    }
}

const Container = styled.View`
 flex:1;
 justify-content:center;
 align-items:center;

`
const Text = styled.Text``