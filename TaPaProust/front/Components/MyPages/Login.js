import React from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native'
import * as Font from 'expo-font'

import MyTextInput from '../MyCustomComponents/MyTextInput'
import MyButton from '../MyCustomComponents/MyButton'
import MyActivityIndicator from '../MyCustomComponents/MyActivityIndicator'

import {inputs} from '../../Helpers/global'
import API from '../../API/BooksAPI'

class Login extends React.Component{
  constructor(props){
    super(props)
    this.userMail = "u@tapaproust.ch"
    this.password = "u"

    this._login = this._login.bind(this)
    this._register = this._register.bind(this)
    this._onChangedInput = this._onChangedInput.bind(this)

    this.state = {
      isLoading : false,
      assetsLoaded: false,
      successfulLogin : false,
      firstTime : true
    };
  }

  async componentDidMount() {
        await Font.loadAsync({
            'lobster-regular': require('../../assets/fonts/Lobster-Regular.ttf')
        });
        await Font.loadAsync({
            'dancing-bold' : require('../../assets/fonts/DancingScript-Bold.ttf')
        });
        await Font.loadAsync({
            'dancing-medium' : require('../../assets/fonts/DancingScript-Medium.ttf')
        });
        await Font.loadAsync({
            'dancing-regular' : require('../../assets/fonts/DancingScript-Regular.ttf')
        });
        await Font.loadAsync({
            'dancing-semibold' : require('../../assets/fonts/DancingScript-SemiBold.ttf')
        });
        await Font.loadAsync({
            'LobsterTwo-Regular' : require('../../assets/fonts/LobsterTwo-Regular.ttf')
        });
        await Font.loadAsync({
            'LobsterTwo-Bold' : require('../../assets/fonts/LobsterTwo-Bold.ttf')
        });
        await Font.loadAsync({
            'LobsterTwo-Italic' : require('../../assets/fonts/LobsterTwo-Italic.ttf')
        });
        this.props.navigation.setOptions({headerShown: true,headerTitleStyle : {
          fontFamily : 'lobster-regular', fontSize : 30}})
        this.setState({ assetsLoaded: true });
    }

  _onChangedInput(text, input){
    switch(input){
      case inputs.USER_MAIL :
        this.userMail = text
        break;
      case inputs.PASSWORD :
        this.password = text
        break;
    }
  }
//// TODO: Remove default login
  async _login(){
    this.setState({
      isLoading : true,
    })
    await API.login(this.userMail, this.password).then(response => {
      this.setState({
        isLoading : false,
        successfulLogin : response.data === "Login is successful",
        firstTime : false
      })
    })
    if(this.state.successfulLogin){
      this.props.navigation.replace('Home')
    }
  }

  _register(){
    this.props.navigation.navigate('Inscription')
  }

  _getLoginFailure(){
    if(!this.state.firstTime && !this.state.successfulLogin){
      return (
        <View>
          <Text style = {styles.loginFail}>Mauvais utilisateur ou mauvais mot de passe</Text>
        </View>
      )
    }
  }

  _loginItemBox(){
    return (
      <View style = { styles.login_item_container}>
        <MyTextInput
          title = {'Mail'} placeholder = {'Mail'} input = {inputs.USER_MAIL}
          onChangedInput = {this._onChangedInput} onFocus = {()=> {}}
          defaultValue ={"u@tapaproust.ch"}
          />
        <MyTextInput
          title = {'Mot de passe '} placeholder = {'Mot de passe'} input = {inputs.PASSWORD}
          secureTextEntry = {true} onChangedInput = {this._onChangedInput} onFocus = {()=> {}}
          defaultValue ={"u"}
          />
          {this._getLoginFailure()}
        <MyButton
          onPress = {this._login}
          title = {'Login'}/>
        <MyButton
          onPress = {this._register}
          title = {'Créer un compte'}
          reverse = {true}/>
          {}
      </View>
    )
  }

  render(){
    if(this.state.assetsLoaded) {
      return (
        <View style = {styles.main_container}>
          <View style = { styles.title_box}>
            <Text style = {styles.title}>
              TaPaProust
            </Text>
          </View>
          {this._loginItemBox()}
          <MyActivityIndicator condition ={this.state.isLoading}/>
        </View>
      )
    }else{
      return <MyActivityIndicator condition ={true}/>
    }
  }
}

const styles = StyleSheet.create({
  login_item_container : {
    flex : 5,
    margin : 10
  },
  main_container : {
    margin : 20,
    flex : 1
  },
  title_box : {
    height : 70,
    alignItems : 'center',
    justifyContent : 'center',
    marginBottom :40
  },
  title : {
    fontSize : 55,
    fontFamily : 'lobster-regular',
  },
  loginFail : {
    color : '#ff0000'
  },
})

export default Login