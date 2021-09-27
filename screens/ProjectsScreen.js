import React from 'react'
import styled from 'styled-components'
import Product from '../components/Product'
import {PanResponder,Animated} from 'react-native'
import {connect} from 'react-redux'

function getIndex(index){
   const nextIndex = index+1;
   if(nextIndex>projects.length-1){
       return 0
   }else{
       return nextIndex;
   }
}

function mapStateToProps(state){
    return {action:state.action}
}

class ProjectsScreen extends React.Component {
   
   state={
       pan:new Animated.ValueXY(),
      
       scale:new Animated.Value(0.9),
       translateY:new Animated.Value(44),
      
       thirdScale:new Animated.Value(0.8),
       thirdTranslateY:new Animated.Value(-50),

       index:0,

       opacity: new Animated.Value(1)
   } 

   UNSAFE_componentWillMount(){
       this._panResponder = PanResponder.create({

           onMoveShouldSetPanResponder:(event,gestureSate)=>{
               //禁用手势
               if(gestureSate.dx===0&&gestureSate.dy===0){
                   return false;
               }else{
                   //卡片没有打开时可以拽动
                   if(this.props.action==='openProduct'){
                       return false;
                   }else if(this.props.action==='closeProduct'){
                       return true;
                   }
               }
           },
          
           //开始手势操作
           onPanResponderGrant:()=>{
              Animated.spring(this.state.scale,{ toValue:1}).start(),
              Animated.spring(this.state.translateY,{toValue:0}).start()

              Animated.spring(this.state.thirdScale,{toValue:0.9}).start()
              Animated.spring(this.state.thirdTranslateY,{toValue:44}).start()

              Animated.timing(this.state.opacity,{toValue:0}).start()
           },
           
           //触碰到移动
           onPanResponderMove:Animated.event([
               null,
             {dx:this.state.pan.x,dy:this.state.pan.y}
           ],
           {useNativeDriver: false}
           ),

           //放开所有的触摸点，此时视图已经成为响应者
           onPanResponderRelease:()=>{
               const positionY = this.state.pan.y.__getValue();
               console.log(positionY)
               Animated.timing(this.state.opacity,{toValue:1}).start()
               if(positionY>200){
                    Animated.timing(this.state.pan,{toValue:{x:0,y:1000}})
                    .start(()=>{
                        this.state.pan.setValue({x:0,y:0})
                        this.state.scale.setValue(0.9)
                        this.state.translateY.setValue(44)
                        this.state.thirdScale.setValue(0.8)
                        this.state.thirdTranslateY.setValue(-50)
                        this.setState({index:getIndex(this.state.index)})
                    })
               }else{
                Animated.spring(this.state.pan,{ toValue:{x:0,y:0}}).start()
              
                Animated.spring(this.state.scale,{toValue:0.9}).start()
                Animated.spring(this.state.translateY,{toValue:44}).start()

                Animated.spring(this.state.thirdScale,{toValue:0.8}).start()
                Animated.spring(this.state.thirdTranslateY,{toValue:-50}).start()
               
               }

           }
       })
   }

   static navigationOptions = {
    //    title:'Section'
    headerShown: false
   }
   
    render() {
        return (
            <Container>
                <AnimatedMask
                  style={{opacity:this.state.opacity}}
                />
               <Animated.View
                  style={{
                      transform: [
                          {translateX:this.state.pan.x},
                          {translateY:this.state.pan.y},
                      ]
                  }}
                  {... this._panResponder.panHandlers}
                >
                   <Product
                      title={projects[this.state.index].title}
                      image={projects[this.state.index].image}
                      author={projects[this.state.index].author}
                      text={projects[this.state.index].text}
                      canOpen={true}
                   />
               </Animated.View>
                <Animated.View style={{
                    position: 'absolute',
                    top:0,
                    left:0,
                    zIndex:-1,
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [
                        {scale:this.state.scale},
                        {translateY:this.state.translateY}
                    ]
                }}>
                    <Product
                       title={projects[getIndex(this.state.index)].title}
                       image={projects[getIndex(this.state.index)].image}
                       author={projects[getIndex(this.state.index)].author}
                       text={projects[getIndex(this.state.index)].text}
                      
                    />
                </Animated.View>
                <Animated.View style={{
                    position: 'absolute',
                    top:0,
                    left:0,
                    justifyContent:'center',
                    alignItems: 'center',
                    zIndex:-3,
                    width:'100%',
                    height:'100%',
                    transform: [
                        {scale:this.state.thirdScale},
                        {translateY:this.state.thirdTranslateY}
                    ]
                }}
                >
                    <Product
                       title={projects[getIndex(this.state.index+1)].title}
                       image={projects[getIndex(this.state.index+1)].image}
                       author={projects[getIndex(this.state.index+1)].author}
                       text={projects[getIndex(this.state.index+1)].text}
                    />
                </Animated.View>
            </Container>
        )
    }
}

export default  connect(mapStateToProps)(ProjectsScreen)


const Mask = styled.View`
  position: absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:rgba(0,0,0,.25);
  z-index:-3;
`

const AnimatedMask = Animated.createAnimatedComponent(Mask)

const Container = styled.View`
 flex:1;
 justify-content:center;
 align-items:center;

`

const projects = [
    {
        title:'Price Tag',
        image:require('../assets/background5.jpg'),
        author:'Liu Yi',
        text:
        'Thanks to Design+Code,I improved my design skill and learned to do  animations for my app Price Tag,Thanks to Design+Code,I improved my design skill and learned to do  animations for my app Price Tag'
    },
    {
        title:'The DM App-Ananoumous Chat',
        image:require('../assets/background6.jpg'),
        author:'Chad Goodman',
        text:
        'Design+Code was the first resource I used when breaking into software.I went from knowing nothing about design or code to building a production ready app from scratch'
    },
    {
        title:'Nikhiljay',
        image:require('../assets/background3.jpg'),
        author:'Nikhil D Souza',
        text:
        'Thanks to Design+Code,I improved my design skill and learned to do  animations for my app Price Tag'
    }
]