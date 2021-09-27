import React from 'react'
import styled from 'styled-components'
import {TouchableOpacity,
        TouchableWithoutFeedback,
        Keyboard,
        Alert,
        Animated,
        Dimensions
      } from 'react-native'
import { BlurView } from 'expo-blur';
import {connect} from 'react-redux'
import Success from '../components/Success'
import Loading from '../components/Loading'
import firebase from './Firebase'

const screenHeight = Dimensions.get('window').height;

function mapStateToProps(state){
  return {action: state.action}
}
function mapDispatchToProps(dispatch){
  return {
    closeLogin:()=>
      dispatch({
        type:'CLOSE_LOGIN'
      })
  }
}

 class ModelLogin extends React.Component {
    state={
        email:'',
        password:'',
        iconEmail:require('../assets/icon-email.png'),
        iconPassword:require('../assets/icon-password.png'),
        isSuccess:false,
        isLoading:false,
        top:new Animated.Value(screenHeight),
        scale:new Animated.Value(1.3),
        translateY:new Animated.Value(0)
    }

    componentDidUpdate() {
      if(this.props.action==='openLogin'){
        Animated.timing(this.state.top,{toValue:0,duration:0}).start()
        Animated.spring(this.state.scale,{toValue:1}).start()
        Animated.timing(this.state.translateY,{toValue:0,duration:0}).start()
      }

      if(this.props.action==='closeLogin'){
       setTimeout(()=>{
        Animated.timing(this.state.top,{toValue:screenHeight,duration:0}).start()
        Animated.spring(this.state.scale,{toValue:1.3}).start()
       },500)

        Animated.timing(this.state.translateY,{toValue:1000,duration:500}).start()
      }

    }

    handLogin=()=>{
        console.log(this.state.email,this.state.password)
        this.setState({isLoading:true});

        // setTimeout(()=>{
        //   this.setState({isLoading:false})
        
        // },2000)

        const email = this.state.email;
        const password = this.state.password;
        firebase
           .auth()
           .signInWithEmailAndPassword(email,password)
           .then(response =>{
              console.log(response)
              this.setState({isLoading:false})

              if(response){
                this.setState({isSuccess:true})
                Alert.alert('Congratulations!',"You've logged successfully")

                setTimeout(()=>{
                  this.props.closeLogin();
                  this.setState({isSuccess:false})
                },1000)
              }
           })
           .catch(function(error){
            Alert.alert('Error',error.message)
            
         })
           
    }

    focusEmail=()=>{
        this.setState({
            iconEmail:require('../assets/icon-email-animated.gif'),
            iconPassword:require('../assets/icon-password.png')
        })
    }

    focusPassword=()=>{
        this.setState({
            iconEmail:require('../assets/icon-email.png'),
            iconPassword:require('../assets/icon-password-animated.gif')
        })
    }

    handleBack=()=>{
      Keyboard.dismiss()
      this.props.closeLogin()
    }

    render(){
        return (
            <AnimatedContainer
              style={{
                top:this.state.top
              }}
            >
              <TouchableWithoutFeedback
                onPress={this.handleBack}
              >
              <BlurView
                
                 intensity={100}
                 tint='default'
                 style={{
                   position: 'absolute',
                   width: '100%',
                   height: '100%'
                 }}
              />
              </TouchableWithoutFeedback>
             <AnimatedModel
               style={{
                 transform: [
                  {scale: this.state.scale},
                  {translateY:this.state.translateY}
                ]
               }}
             >
                <Logo source={require('../assets/logo-dc.png')}/>
                <Text>Start Learning.Access Pro content.</Text>
                <TextInput 
                    placeholder="Email" 
                    keyboardType="email-address"
                    onChangeText={email=>this.setState({email})}
                    onFocus={this.focusEmail}
                />
                <TextInput 
                     placeholder="Password" 
                     secureTextEntry={true}
                     onChangeText={password=>this.setState({password})}
                     onFocus={this.focusPassword}
                />
                <IconEmail source={this.state.iconEmail}/>
                <IconPassword source={this.state.iconPassword}/>
                <TouchableOpacity
                  onPress={this.handLogin}
                >
                <Button>
                   <ButtonText>Log In</ButtonText>
                </Button>
                </TouchableOpacity>
             </AnimatedModel>
             <Success
               isActived={this.state.isSuccess}
             />
             <Loading
               isActived={this.state.isLoading}
             />
            </AnimatedContainer>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ModelLogin)

const Container = styled.View`
  background-color:rgba(0,0,0,.5);
  position: absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  align-items:center;
  justify-content: center;
`

const AnimatedContainer = Animated.createAnimatedComponent(Container)

const Model = styled.View`
  width: 335px;
  height:370px;
  background:white;
  align-items:center;
  border-radius:20px;
  box-shadow:0 20px 40px rgba(0,0,0,.5)
`
const AnimatedModel = Animated.createAnimatedComponent(Model)

const Logo = styled.Image`
 width:44px;
 height:44px;
 margin-top:50px;
`
const Text = styled.Text`
  margin-top:20px;
  font-size: 13px;
  font-weight: 600;
  text-transform:uppercase;
  width:160px;
  text-align:center;
  color:#b8bece;
`
const TextInput = styled.TextInput`
  border:1px solid #dbdfea;
  width:295px;
  height:44px;
  border-radius: 10px;
  font-size: 17px;
  color:#3c4560;
  margin-top:20px;
  padding-left: 44px;
`
const Button = styled.View`
  background:#5263ff;
  width:295px;
  height:50px;
  justify-content:center;
  align-items:center;
  border-radius: 10px;
  box-shadow:0 10px 20px #c2cbff;
  margin-top:20px;
`
const ButtonText = styled.Text`
 color:white;
 font-weight: 600;
 font-size: 20px;
 text-transform:uppercase;
`

const IconEmail = styled.Image`
 width:24px;
 height:16px;
 position:absolute;
 top:196px;
 left:31px;
`
const IconPassword = styled.Image`
  width:18px;
  height:24px;
  position:absolute;
  top:255px;
  left:35px;
`