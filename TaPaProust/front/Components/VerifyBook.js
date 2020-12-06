import React from 'react'
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native'

import MyButton from './MyButton'

class VerifyBook extends React.Component{
  constructor(props){
    super(props)
    this._confirmBook = this._confirmBook.bind(this)
  }
  async componentDidMount() {
    this.props.navigation.setOptions({headerTitleStyle : {
      fontFamily : 'lobster-regular', fontSize : 30}})
    this.setState({ assetsLoaded: true });
  }

  _confirmBook(){
    const text = this.props.modify ? "Votre livre a bien été ajouté" : "Votre livre a bien été modifié"
    Alert.alert(
      "Confirmation",
      text,
      [
        { text: "OK"}
      ],
      { cancelable: true }
    );
    if(this.props.route.params.modify){
      this.props.navigation.navigate('Mes livres')
    }else{
      this.props.navigation.navigate('Ajouter un livre')
    }
  }

  render(){
      return (
        <ScrollView style = {styles.main_container}>
          <View style = {styles.header_box}>
            <Text style = {styles.header_text}>Veuillez vérifier les informations que vous venez de rentrer:</Text>
          </View>
          <View style = {styles.text_box}>
            <Text style = {styles.text}><Text style = {styles.entry_text}>Title: </Text>{this.props.route.params.title}</Text>
            <Text style = {styles.text}><Text style = {styles.entry_text}>Author: </Text>{this.props.route.params.author}</Text>
            <Text style = {styles.text}><Text style = {styles.entry_text}>Edition: </Text>{this.props.route.params.edition}</Text>
            <Text style = {styles.text}><Text style = {styles.entry_text}>Langue: </Text>{this.props.route.params.language}</Text>
            <Text style = {styles.text}><Text style = {styles.entry_text}>Prix: </Text>{this.props.route.params.price}</Text>
            <Text style = {styles.text}><Text style = {styles.entry_text}>Etat: </Text>{this.props.route.params.state}</Text>
          </View>
          <MyButton onPress = {this._confirmBook} title = {'Confirmer'}/>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  main_container : {
    flex : 1
  },
  header_box : {
    margin : 10,
  },
  header_text : {
    fontFamily : 'dancing-regular',
    fontSize : 30
  },
  text_box :{
    borderWidth : 4,
    borderColor : 'black',
    justifyContent : 'center',
    flexDirection : 'column',
    margin : 10,
    padding : 10
  },
  entry_text : {
    fontFamily : 'lobster-regular',
    fontSize : 25
  },
  text : {
    fontFamily : 'dancing-regular',
    fontSize : 25,
  }
})

export default VerifyBook
