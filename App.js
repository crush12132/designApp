import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import AppNavigator from './navigator/AppNavigator'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'

const client = new ApolloClient({
  uri:"https://graphql.contentful.com/content/v1/spaces/2wdvq32ejvro",
  Credentials:"same-origin",
  headers:{
    Authorization:`Bearer fQ6GjYrwZERrW_-oZ5CnQg0qJP5bIHWpjo5ZGj793Vo`
  }
})

const initalState = {
  action:'',
  name:''
}
const reducer = (state=initalState,action)=>{
  switch(action.type){
    case "OPEN_MENU":
      return {action:'openMenu'}
    case "CLOSE_MENU":
      return {action:'closeMenu'}
    case "UPDATE_NAME":
      return {name:action.name}  
    case 'OPEN_PRODUCT':
      return {action:'openProduct'} 
    case 'CLOSE_PRODUCT':
      return {action:'closeProduct'}  
    case 'OPEN_LOGIN':
      return {action:'openLogin'} 
    case 'CLOSE_LOGIN':
      return {action:'closeLogin'}    
    default:
      return state;   
  }
} 

const store = createStore(reducer)

const App = ()=>(
  <ApolloProvider client={client}>
  <Provider store={store}>
    <AppNavigator/>
  </Provider>
  </ApolloProvider>
)

export default App