// @flow
import React, {Component} from 'react'
import { View, Image, Text } from 'react-native'
import iconImage from '../../../../assets/images/otp/OTP-badge.png'
import s from '../../../../locales/strings.js'

type Props= {
  style: Object,
  enabled: boolean
}

export default class OtpHeroComponent extends Component<Props> {
  renderText = (style: Object) => {
    if (this.props.enabled) {
      return <Text style={style.bodyText} >
        {s.strings.title_otp_enabled}
       </Text>
    }
    return <Text style={style.bodyText} >
      {s.strings.title_otp_disabled}
    </Text>
  }
  render () {
    const style = this.props.style
    return <View style={style.container}>
      <View style={style.shim} />
      <Image
        source={iconImage}
        style={style.icon}
        size={style.imageSize} />
      <View style={style.shim} />
      {this.renderText(style)}
      </View>
  }
}
