import React from 'react'
import styled from 'styled-components'
import {TouchableOpacity,StatusBar,Linking,ScrollView} from 'react-native'
import {WebView} from 'react-native-webview'
import Ionicons from "react-native-vector-icons/Ionicons"
import Markdown from 'react-native-showdown'

export default class SectionScreen extends React.Component {
   
   static navigationOptions = {
    //    title:'Section'
        header:null
   }
   //导航栏淡入淡出
   componentDidMount() {
    StatusBar.setBarStyle('light-content',true)
    }

    componentWillUnmount(){
        StatusBar.setBarStyle('light-content',false)
    }

   
    render() {

        const {navigation} = this.props;
        const section = navigation.getParam('section');
        return (
          <ScrollView>
            <Container>
                <StatusBar hidden/>
               <Cover>
                   <Image source={section.image}/>
                   <Wrapper>
                       <Logo source={section.logo}/>
                       <Subtitle>{section.subtitle}</Subtitle>
                   </Wrapper>
                   <Title>{section.title}</Title>
                   <Caption>{section.caption}</Caption>
               </Cover>
               <TouchableOpacity
                 onPress={()=>{
                      navigation.goBack()
                 }}
                 style={{
                     position: 'absolute',
                     top:20,
                     right:20
                }}
               >
               <CloseView>
                   <Ionicons 
                      name="ios-close" 
                      size={34} 
                      color="#4775f2"        
                      />
               </CloseView>
               </TouchableOpacity>
               <Content>
                   {/* <WebView
                     source={{html:section.content+htmlStyles}}
                     scalesPageToFit={false}
                     scrollEnabled={false}
                     ref={currentNode=>this.webview = currentNode}
                     onShouldStartLoadWithRequest={ event =>{
                       console.log(event)
                          
                       if(event.url!='about:blank'){
                        //  this.webview.stopLoading();
                         //Linking作用就是没有在页面中打开网址，直接去浏览器中打开
                        Linking.openURL(event.url)
                        return false
                       }
                      
                     }}
                   /> */}
                   <Markdown
                      body={section.content}
                      pureCSS={htmlStyles}
                      scalesPageToFit={false}
                      scrollEnabled={false}
                   />
               </Content>
            </Container>
            </ScrollView>
        )
    }
}

const htmlContent = `
<h2>This is a title</h2>
<p>This <strong>is</strong> a <a href="http://www.baidu.com"> link</a></p>
<img src="https://i.loli.net/2021/06/24/TJ6CLAB1lQKVFwU.jpg"/>
`


const htmlStyles = `

   *{
       font-family:-apple-system,Roboto;
       padding:0;
       margin:0;
       font-size:17px;
       font-weight:normal;
       color:#3c4560;
       line-height:24px;
   }

   h2{
     font-size:20px;
     text-transform:uppercase;
     color:#b8bece;
     font-weight:600;
     margin:50px;
   }

   p{
    margin: 20px;
   }

   a{
    color:#4775f2;
    font-weight:600;
    text-decoration:none;
   }
   strong{
     font-weight:700;
   }

   img{
     width:100%;
     border-radius:10px;
     margin-top:20px;
   }

   pre{
    padding:20px;
    background:#212c4f;
    overflow:hidden;
    word-wrap:break-word;
    border-radius:10px;
    }
    code{
       color:white 
    }

`

const Content = styled.View`
  height: 1500px;
  padding:20px;
`

const Container = styled.View`
 
 flex:1;
`
const Cover = styled.View`
  height:375px;
`
const Image = styled.Image`
   width:100%;
   height:100%;
   position:absolute;

`
const Title = styled.Text`
   font-weight: 800;
   color:white;
   position:absolute;
   font-size: 24px;
   top:78px;
   left:20px;
   width: 178px;

`
const Caption = styled.Text`
   width:300px;
   color:white;
   position:absolute;
   left:20px;
   bottom:20px;
   font-size: 17px;

`

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background-color:white;
  border-radius: 16px;
  box-shadow:0 5px 10px rgba(0,0,0,.15);
  justify-content:center;
  align-items:center;
`

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top:40px;
  left:20px;
  align-items:center;
`
const Logo = styled.Image`
   width: 24px;
   height:24px;
`
const Subtitle = styled.Text`
   font-size: 15px;
   font-weight: 800;
   color:rgba(255,255,255,.8);
   margin-left:5px;
   text-transform: uppercase;
`