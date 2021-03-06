// @flow

import React, {Component} from 'react'
import {View, Text} from 'react-native'

type Props = {
  exchangeRate: string,
  style: any
}
type State = {}
export default class CryptoExchageRate extends Component<Props, State> {
  render () {
    const {
      container,
      containerError,
      text,
      textError
    } = this.props.style
    const viewStyle = [container, (this.props.insufficient || this.props.genericError) ? containerError : null]
    const textStyle = [text, this.props.insufficient || textError ? textError : null]

    return (
      <View style={viewStyle}>
        <Text style={textStyle}>
          {this.props.exchangeRate}
        </Text>
      </View>
    )
  }
}
