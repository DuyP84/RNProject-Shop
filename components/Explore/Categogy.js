import { Text, StyleSheet, View, Image } from 'react-native'
import React, { Component } from 'react'

export default class Categogy extends Component {
  render() {
    return (
        <View style={{height:130, width:130, marginLeft:20, borderWidth: 0.5, borderColor: '#dddd', shadowOpacity:5, borderRadius:15  }}>
        <View style={{flex:2, }}>
            <Image source={this.props.imgUri} style={{flex:2, width:null, height:null, resizeMode:'cover'}}/>
        </View>
        <View style={{flex:1, flexDirection:'row',justifyContent:'space-around'}}>
            <Text>{this.props.name}</Text>
            <Text>{this.props.price}</Text>
        </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({})