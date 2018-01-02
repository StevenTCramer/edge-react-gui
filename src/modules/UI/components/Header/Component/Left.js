import React, {Component} from 'react'
import {Actions} from 'react-native-router-flux'
import s from '../../../../../locales/strings.js'
import BackButton from './BackButton.ui'
import * as Constants from '../../../../../constants'

const BACK_TEXT = s.strings.back_button_text
const CANCEL_TEXT = s.strings.string_cancel_cap

export default class Left extends Component {
  render () {
    const children = this.props.routes.scene.children
    const sceneName = children
      ? this.props.routes.scene.children[this.props.routes.scene.index].name
      : null

    const makeBackButton = (labelText, consts) =>
      <BackButton label={labelText} onPress={() => Actions[consts]({type: 'reset'})} />

    switch (sceneName) {
    case Constants.CREATE_WALLET:
      return makeBackButton(CANCEL_TEXT, Constants.WALLET_LIST)
    case Constants.TRANSACTION_DETAILS:
      return makeBackButton(CANCEL_TEXT, Constants.TRANSACTION_LIST)
    case Constants.SEND_CONFIRMATION:
      return makeBackButton(BACK_TEXT, Constants.SCAN)
    case Constants.CHANGE_PASSWORD:
      return makeBackButton(CANCEL_TEXT, Constants.SETTINGS_OVERVIEW)
    case Constants.CHANGE_PIN:
      return makeBackButton(CANCEL_TEXT, Constants.SETTINGS_OVERVIEW)
    case Constants.RECOVER_PASSWORD:
      return makeBackButton(CANCEL_TEXT, Constants.SETTINGS_OVERVIEW)
    case Constants.PLUGIN:
      return (<BackButton label={BACK_TEXT} onPress={() => Actions.pop()} />)
    default:
      if (Object.keys(Constants.CURRENCY_SETTINGS).indexOf(sceneName) !== -1) {
        return makeBackButton(BACK_TEXT, Constants.SETTINGS_OVERVIEW)
      }
      return null
    }
  }
}
