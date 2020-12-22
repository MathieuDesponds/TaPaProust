import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import {ImageBrowser} from 'expo-image-picker-multiple';

export default class ImageBrowserScreen extends React.Component {
  _getHeaderLoader = () => (
    <ActivityIndicator style = {styles.loading} size='large' color={'#000000'}/>
  );

  imagesCallback = (callback) => {
    const { navigation } = this.props;
    this.props.navigation.setOptions({
      headerRight: () => this._getHeaderLoader()
    });

    callback.then(async (photos) => {
      const cPhotos = [];
      for(let photo of photos) {
        const pPhoto = await this._processImageAsync(photo.uri);
        cPhotos.push({
          uri: pPhoto.uri,
          name: photo.filename,
          type: 'image/jpg'
        })
      }
      navigation.navigate('Ajouter un livre', {photos: cPhotos});
    })
    .catch((e) => console.log(e));
  };

  async _processImageAsync(uri) {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{resize: { width: 1000 }}],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return file;
  };

  _renderDoneButton = (count, onSubmit) => {
    if (!count) return null;
    return <TouchableOpacity style = {styles.touchableOpacity } onPress={onSubmit}>
      <Text style = {styles.done} onPress={onSubmit}>Done</Text>
    </TouchableOpacity>
  }

  updateHandler = (count, onSubmit) => {
    this.props.navigation.setOptions({
      title: `Selected ${count} files`,
      headerRight: () => this._renderDoneButton(count, onSubmit)
    });
  };

  renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  render() {
    const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;

    return (
      <View style={[styles.flex, styles.container]}>
        <ImageBrowser
          max={4}
          onChange={this.updateHandler}
          callback={this.imagesCallback}
          renderSelectedComponent={this.renderSelectedComponent}
          emptyStayComponent={emptyStayComponent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    marginLeft : 5, marginRight : 5,
    marginBottom : 5,
    position: 'relative'
  },
  emptyStay:{
    textAlign: 'center',
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: 'absolute',
    right: 3,
    bottom: 3,
    justifyContent: 'center',
    backgroundColor: '#0580FF'
  },
  countBadgeText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 'auto',
    color: '#ffffff'
  },
  done : {
    fontWeight: 'bold',
    marginRight : 20,
    fontSize : 20
  },
  loading : {
    marginRight : 20,
    width : 40,
    height : 40
  }
});
