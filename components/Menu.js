import React from 'react'
import styled from 'styled-components'
import {Animated,TouchableOpacity,Dimensions} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import {connect} from 'react-redux'
import MenuItem from './MenuItem'

const screenHeight = Dimensions.get('window').height;
var cardWidth = screenHeight
if(screenHeight>=500){
  cardWidth=500
}

function mapStateToProps(state){
   return {action:state.action}
}

function mapDispatchToProps(dispatch){
  return {
    closeMenu:()=>
       dispatch({
         type:'CLOSE_MENU'
       })
  }
}

class Menu extends React.Component {
    state={
        top:new Animated.Value(screenHeight)
    }

    //componentDidMount只执行一次
    // componentDidMount(){
    //  this.toggleMenu();
    // }

    componentDidUpdate(){
      this.toggleMenu();
    }


    toggleMenu=()=>{
      if(this.props.action==='openMenu'){
        Animated.spring(this.state.top,{
          toValue:54
        }).start()
      }

      if(this.props.action==='closeMenu'){
        Animated.spring(this.state.top,{
          toValue:screenHeight
       }).start()
      }

    }

    render() {
        return (
            <AnimatedContainer style={{top:this.state.top}}>
               <Cover>
                 <Image source={require('../assets/background14.jpg')}/>
                 <Title>Jiang to</Title>
                 <Subtitle>Design at Design+Code</Subtitle>
               </Cover>
               <TouchableOpacity 
                  onPress={this.props.closeMenu}
                  style={{
                    position: 'absolute', 
                    top:120,
                    left:'50%',
                    marginLeft:-22,
                    zIndex:1
                  }}
                  >
               <CloseView>
                <Icon name='ios-close' size={44} color="#546bfb"/>
               </CloseView>
               </TouchableOpacity>
               <Content>
                 {
                   items.map((item,index)=>(
                        <MenuItem
                           key={index}
                           icon={item.icon}
                           title={item.title}
                           text={item.text}
                        />
                   ))
                 }
                 
               </Content>
            </AnimatedContainer>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Menu);

const Container = styled.View`
  position: absolute;
  background:white;
  width: ${cardWidth};
  align-self:center;
  height: 100%;
  z-index:100;
  border-radius: 10px;
  overflow: hidden;
`
const AnimatedContainer = Animated.createAnimatedComponent(Container)

const Cover = styled.View`
  height: 142px;
  background: black;
  align-items:center;
  justify-content:center;
`
const Image = styled.Image`
   position: absolute;
   width: 100%;
   height: 100%;
`
const Title = styled.Text`
   color:white;
   font-size:24px;
   font-weight: 600;
`
const Subtitle = styled.Text`
   color:rgba(255,255,255,.85);
   font-size:20px;
   font-weight: 300;
   margin-top:5px;
`

const CloseView = styled.View`
   justify-content:center;
   align-items:center;
   width: 44px;
   height:44px;
   border-radius: 22px;
   background-color:white;
   box-shadow: 0 5px 10px rgba(0,0,0,.25);
`

const Content = styled.View`
  height:${screenHeight};
  background:#f0f3f5; 
  padding:50px;
`

const items = [
  {
    icon:'ios-settings',
    title:'Account',
    text:'settings'
  },
  {
    icon:'ios-card',
    title:'Billing',
    text:'payments'
  },
  {
    icon:'ios-compass',
    title:'Learn React',
    text:'start courses'
  },
  {
    icon:'ios-exit',
    title:'Log out',
    text:'see you soon!'
  },
]
