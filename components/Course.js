import React from 'react'
import styled from 'styled-components'
import {Dimensions} from 'react-native'

const screenWidth = Dimensions.get('window').width


 function getcardWidth(screenWidth){
  var cardWidth = screenWidth-40
  if(screenWidth>=768){
    cardWidth=(screenWidth-60)/2
  }
  if(screenWidth>=1024){
    cardWidth=(screenWidth-80)/3
  }
  return cardWidth
 }

class Course extends React.Component {
  state={
    cardWidth:getcardWidth(screenWidth)
  }

  componentDidMount(){
    //监听屏幕宽度改变course宽度
    Dimensions.addEventListener('change',this.adaptLayout)
  }

  adaptLayout=(dimensions)=>{
     this.setState({
      cardWidth:getcardWidth(dimensions.window.width)
     })
  }

  render(){
     return (
      <Container style={{width: this.state.cardWidth}}>
      <Cover>
          <Image source={this.props.image}/>
          <Logo resizeMode='contain' source={this.props.logo} />
          <Subtitle>{this.props.subtitle}</Subtitle>
          <Title>{this.props.title}</Title>
      </Cover>
      <Content>
              <Avatar source={this.props.avatar}/>
              <Caption resizeMode='contain'>{this.props.caption}</Caption>
              <Name>Taught by{this.props.name}</Name>
      </Content>
    
  </Container>
     )
  }
}

export default Course

const Container = styled.View`
  width: 335px;
  height:335px;
  background-color:white;
  margin:10px 10px;
  border-radius: 14px;
  box-shadow:0 10px 20px rgba(0,0,0,.13)
`

const Cover = styled.View`
    height:260px;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    overflow: hidden;   
    justify-content:flex-end; 
`
  

const Image = styled.Image`
  width:100%;
  height:100%;
  position: absolute;
`

const Logo = styled.Image`
  width:48px;
  height:48px;
  position: absolute;
  left:50%;
  top: 90px;
  margin-left:-24px;

`
const Title = styled.Text`
   font-size: 24px;
   color:white;
   font-weight: 600;
   margin-bottom:5px;
   margin-left: 10px;
`

const Subtitle = styled.Text`
   font-size: 18px;
   color:rgba(255,255,255,.86);
   font-weight: 500;
   margin-bottom:2px;
   margin-left: 15px;
`

const Content = styled.View`
   height: 78px;
   padding-left:68px;
   justify-content: center;
`


const Avatar = styled.Image`
  width: 36px;
  height: 36px;
  position: absolute;
  top:20px;
  left:20px;
  border-radius: 50px;
`

const Caption = styled.Text`
   font-size: 15px;
   font-weight: 500;
   color: #3c4560;
`


const Name = styled.Text`
  font-size: 14px;
   font-weight: 500;
   color: #b8bece;
   margin-top:4px;
`

