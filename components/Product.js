import React from 'react'
import styled from 'styled-components'
import {Animated,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  BVLinearGradient
} from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons"
// import LinearGradient from 'react-native-linear-gradient';
import {LinearGradient} from 'expo-linear-gradient';
import {connect} from 'react-redux'

function mapStateToProps(state){
   return {action:state.action}
}

function mapDispatchToProps(dispatch){
  return {
    openProduct:()=>
      dispatch({
        type:'OPEN_PRODUCT'
      }),
    closeProduct:()=>
      dispatch({
        type:'CLOSE_PRODUCT'
      })
  }
}


const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const topHight = 43

class Product extends React.Component {

    state={
      cardWidth:new Animated.Value(315),
      cardHeight:new Animated.Value(460),
      titleTop:new Animated.Value(20),
      opacity: new Animated.Value(0),
      textHeigt: new Animated.Value(100)
    } 

    openProduct = ()=>{

      if(!this.props.canOpen) return;

      Animated.spring(this.state.cardWidth,{
        toValue:screenWidth
      }).start()
      Animated.spring(this.state.cardHeight,{
        toValue:screenHeight-topHight
      }).start()
      Animated.spring(this.state.titleTop,{
        toValue:40
      }).start()
      Animated.timing(this.state.opacity,{
        toValue:1
      }).start()
      Animated.timing(this.state.textHeigt,{
        toValue:1000
      }).start()
      //隐藏状态栏
      StatusBar.setHidden(true)

      this.props.openProduct()
    }

    closeProduct=()=>{
      Animated.spring(this.state.cardWidth,{
        toValue:315
      }).start()
      Animated.spring(this.state.cardHeight,{
        toValue:460
      }).start()
      Animated.spring(this.state.titleTop,{
        toValue:20
      }).start()
      Animated.timing(this.state.opacity,{
        toValue:0
      }).start()
      Animated.timing(this.state.textHeigt,{
        toValue:100
      }).start()

      //隐藏状态栏
      StatusBar.setHidden(false)
      this.props.closeProduct()
    }

    render(){
        return (
          <TouchableWithoutFeedback
            onPress={this.openProduct}
          >
            <AnimatedContainer 
            style={{
              elevation:10,
              width:this.state.cardWidth,
              height:this.state.cardHeight
              }}>
               <Cover>
                    <Image source={this.props.image}/>
                    <AnimatedTitle
                      style={{top:this.state.titleTop}}
                    >
                      {this.props.title}
                    </AnimatedTitle>
                    <Author>{this.props.author}</Author>
               </Cover>
                     <AnimatedText
                        style={{height:this.state.textHeigt}}
                     >
                       {this.props.text}
                     </AnimatedText>
                     <AnimatedLinearGradient
                      colors={['rgba(255,255,255,0)','rgba(255,255,255,1)']}
                      style={{
                        position: 'absolute',
                        height:this.state.textHeigt,
                        top:330,
                        width:'100%'
                      }}
                     >
                     </AnimatedLinearGradient>
                     <TouchableOpacity
                       style={{
                        position:'absolute',
                        right:20,
                        top:20
                       }}
                       onPress={this.closeProduct}
                     >
                     <AnimatedCloseView
                       style={{opacity:this.state.opacity}}
                     >
                       <Ionicons name='ios-close' size={32} color='#546bfb'/>
                     </AnimatedCloseView>
                     </TouchableOpacity>
            </AnimatedContainer>
            </TouchableWithoutFeedback>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Product)

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

const Container = styled.View`
 width: 315px;
 height:460px;
 background-color:white;
 border-radius:14px;
 box-shadow:0 10px 20px rgba(0,0,0,.15)
`

const AnimatedContainer = Animated.createAnimatedComponent(Container)


const Cover = styled.View`
  height:290px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
`
const Image = styled.Image`
  width:100%;
  height: 100%;
`
const CloseView = styled.View`
   width: 32px;
   height:32px;
   background-color:white;
   border-radius: 16px;
   box-shadow:0 5px 10px rgba(0,0,0,.15);
   justify-content:center;
   align-items: center;
  
`
const AnimatedCloseView = Animated.createAnimatedComponent(CloseView)

const Title = styled.Text`
   position: absolute;
   top:20px;
   left:20px;
   font-size: 24px;
   color:white;
   font-weight: bold;
   width: 260px;
`
const AnimatedTitle = Animated.createAnimatedComponent(Title)

const Author = styled.Text`
 position:absolute;
 bottom:20px;
 left:20px;
 font-size: 15px;
 font-weight: 600;
 color:rgba(255,255,255,.8);
 text-transform: uppercase;
`
const Text = styled.Text`
 font-size: 17px;
 margin:20px;
 line-height:24px;
 color:#3c4560;
`

const AnimatedText = Animated.createAnimatedComponent(Text)