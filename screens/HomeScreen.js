import React from 'react'
import styled from 'styled-components'
import {ScrollView,
        SafeAreaView,
        TouchableOpacity,
        Animated,
        Easing,
        StatusBar,
        Platform
      } from 'react-native'
import {connect} from 'react-redux'
import {Notifications} from '../components/Icon'
import Logo from '../components/Logo'
import Course from '../components/Course'
import Card from '../components/Card'
import Menu from '../components/Menu'
import Avatar from '../components/Avatar'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import ModelLogin from '../components/ModelLogin'

const CardQuery = gql`
{
  cardsCollection{
    items{
      title
      subtitle
      image {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      subtitle
      caption
      logo {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      content
    }
  }
}
`

function mapStateToProps(state){
  return {
    action:state.action,
    name:state.name
  }
}

function mapDispatchToProps(dispatch){
   return {
    openMenu:()=>
      dispatch({
        type:'OPEN_MENU'
      }),
    openLogin:()=>
      dispatch({
        type:'OPEN_LOGIN'
      }),
   }
}

class HomeScreen extends React.Component {

  static navigationOptions = {
    // title:'Home'
    header:null//隐藏顶部导航栏
  }

  state= {
    scale:new Animated.Value(1),
    opacity:new Animated.Value(1)
  }

  //刷新时可以在组件挂载后恢复回来
  componentDidMount(){
    StatusBar.setBarStyle('dark-content',true)
    if(Platform.os==='android')
      StatusBar.setBarStyle('light-content',true)
  }


  componentDidUpdate(){
    this.toggleMenu();
  }

  toggleMenu=()=> {
    if(this.props.action == 'openMenu'){
      Animated.timing(this.state.scale,{
         toValue:0.9,
         duration:300,
         easing:Easing.in()
      }).start()
      Animated.spring(this.state.opacity,{
        toValue:0.5
     }).start()
     StatusBar.setBarStyle('light-content',true)
    }

    if(this.props.action == 'closeMenu'){
      Animated.timing(this.state.scale,{
        toValue:1,
        duration:300,
        easing:Easing.in()
      }).start()
      Animated.spring(this.state.opacity,{
        toValue:1
     }).start()
     StatusBar.setBarStyle('dark-content',true)
    }
  }

    render() {
        return (
      <RootView>
         <Menu/>
        <AnimatedContainer 
           style={{
              transform: [{scale:this.state.scale}],
              opacity:this.state.opacity
           }}
        >
       
        <SafeAreaView>
        <ScrollView style={{height:'100%'}}>
         <TitleBar>
          <TouchableOpacity
             onPress={this.props.openLogin}
             style={{
               position: 'absolute',
               top:0,
               left:8
             }}
           >
            <Avatar/>
           </TouchableOpacity>
           <Title>Welcome back,</Title>
           <Name>{this.props.name}</Name> 
          <Notifications
             style={{position: 'absolute', top:15,right:20}}
          /> 
         </TitleBar>

          <ScrollView 
             style={{flexDirection:'row',padding:20,paddingLeft:12}} 
             horizontal={true}
             showsHorizontalScrollIndicator={false}
             >
           {
             logos.map((logo,index)=>(
                <Logo 
                key={index}
                image={logo.image}
                text = {logo.text}
                />
             ))
           }
         
          </ScrollView>
          <Subtitle>Continue Learning</Subtitle>
          <ScrollView
             horizontal={true}
             showsHorizontalScrollIndicator={false}
             style={{paddingBottom:30}}
          >
            <Query query={CardQuery}>
               {
                 ({loading,error,data})=>{
                    if(loading)
                       return <Message>Loading...</Message>
                    if(error)
                       return <Message>Error...</Message>

                    console.log(data.cardsCollection.items)   

                    return (
                      <CardContainer>
                        {
                          data.cardsCollection.items.map((card,index)=>(
                            <TouchableOpacity
                            key={index}
                            onPress={()=>{
                              this.props.navigation.push('Section',{section:card})
                            }}
                            >
                             <Card
                             image={card.image}
                             title={card.title}
                             caption={card.caption}
                             subtitle={card.subtitle}
                             logo={card.logo}
                             content={card.content}
                             />
                             </TouchableOpacity>
                          ))
                        }
                      </CardContainer>
                    )
                 }
               }
            </Query>
       
          </ScrollView>
          <Subtitle>related courses</Subtitle>
          <CourseContainer>
          {
            courses.map((course,index)=>(
                <Course
                   key={index}
                   image = {course.image}
                   logo={course.logo}
                   subtitle={course.subtitle}
                   title={course.title}
                   avatar={course.avatar}
                   caption={course.caption}
                   name={course.name}
                />
            ))
         }
        </CourseContainer>
       </ScrollView>
       </SafeAreaView>
     </AnimatedContainer>
     <ModelLogin/>
     </RootView>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen)

  const CourseContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    padding-left:10px;
  `

  const RootView = styled.View`
     background-color:black;
     flex:1
  `  

   const Subtitle = styled.Text`
   
      font-size: 25px;
      font-weight: 600;
      text-transform: uppercase;
      color:#b8bece;
      margin-left: 20px;
      margin-top:20px

   `

   const TitleBar = styled.View`
    width: 100%;
    margin-top: 50px;
    padding-left: 80px;
   `

 

   const Title = styled.Text`
      font-size: 16px;
      color:#b8bece;
      font-weight: 500;
   `
   
   const Message = styled.Text`
      margin:20px;
      color:#b8bece;
      font-size: 15px;
      font-weight: 500;
   `

   const Name = styled.Text`
    font-size: 20px;
    color:#3c4560;
    font-weight: bold;
   `
   
   const CardContainer = styled.View`
     flex-direction: row;
     padding-left:10px;
   `


   const Container = styled.View`
     flex: 1;
     background-color:#f0f3f5;
     border-top-left-radius:10px;
     border-top-right-radius:10px;
  
   `
   const AnimatedContainer = Animated.createAnimatedComponent(Container)

   const logos = [
     {
       image:require('../assets/logo-framerx.png'),
       text:'Framer X'
     },
     {
       image:require('../assets/logo-framerx.png'),
       text:'Framer X'
     },
     {
       image:require('../assets/logo-studio.png'),
       text:'studio'
     },
     {
       image:require('../assets/logo-invision.png'),
       text:'invision'
     },
     {
       image:require('../assets/logo-swift.png'),
       text:'swift'
     },
     {
       image:require('../assets/logo-xcode.png'),
       text:'xcode'
     },
  
   ]

   const cards = [
     {
       image:require('../assets/background11.jpg'),
       title:'Styled Components',
       caption:'1 of 12 sections',
       subtitle:'react native',
       logo:require('../assets/logo-react.png')
     },
     {
       image:require('../assets/background12.jpg'),
       title:'Props and State',
       caption:'1 of 5 sections',
       subtitle:'react',
       logo:require('../assets/logo-react.png')
     },
     {
       image:require('../assets/background13.jpg'),
       title:'Components',
       caption:'1 of 5 sections',
       subtitle:'react',
       logo:require('../assets/logo-react.png')
     },
     {
       image:require('../assets/background14.jpg'),
       title:'Styled Components',
       caption:'4 of 12 sections',
       subtitle:'react native',
       logo:require('../assets/logo-react.png')
     }

   ]


   const courses = [
     {
       image: require('../assets/background13.jpg'),
       logo: require('../assets/logo-react.png'),
       subtitle:'10 sections',
       title:'Prototype in InVision Studio',
       avatar: require('../assets/avatar.jpg'),
       caption:'Learn to design and code a React site',
       name:'Jiang'
     },
     {
       image: require('../assets/background14.jpg'),
       logo: require('../assets/logo-react.png'),
       subtitle:'react native',
       title:'design for react',
       avatar: require('../assets/avatar.jpg'),
       caption:'react Native',
       name:'Jiang'
     },
     {
       image: require('../assets/background15.jpg'),
       logo: require('../assets/logo-react.png'),
       subtitle:'react native',
       title:'design for react',
       avatar: require('../assets/avatar.jpg'),
       caption:'react Native',
       name:'Jiang'
     },
     {
       image: require('../assets/background16.jpg'),
       logo: require('../assets/logo-react.png'),
       subtitle:'react native',
       title:'design for react',
       avatar: require('../assets/avatar.jpg'),
       caption:'react Native',
       name:'Jiang'
     },
   ]
