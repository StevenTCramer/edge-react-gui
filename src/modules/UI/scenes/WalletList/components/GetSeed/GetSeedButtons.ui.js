// @flow

import React, {Component} from 'react'
import {View, TouchableHighlight} from 'react-native'
import {MaterialInputOnWhite, ConfirmPasswordModalStyle} from '../../../../../../styles/indexStyles'
import {FormField} from '../../../../../../components/indexComponents'
import * as WALLET_API from '../../../../../Core/Wallets/api.js'
import OptionSubtext from '../../../../components/OptionSubtext/OptionSubtext.ui.js'

import T from '../../../../components/FormattedText/FormattedText.ui'
import styles from '../../style'
import s from '../../../../../../locales/strings.js'

const NEGATIVE_TEXT = s.strings.string_cancel_cap
const POSITIVE_TEXT = s.strings.string_get_seed

export const GET_SEED_WALLET_START = 'GET_SEED_WALLET_START'
export const GET_SEED_WALLET_SUCCESS = 'GET_SEED_WALLET_SUCCESS'

type Props = {
  onPositive: (walletId: string) => void,
  onNegative: () => void,
  onDone: () => void
}
type State = {
  confimPassword: String
}

export default class GetSeedButtons extends Component<Props, State> {
  onDone = () => {
    this.props.onDone()
  }

  onNegative = () => {
    this.props.onNegative()
    this.props.onDone()
  }

  onPositive = () => {
    this.props.onPositive(this.state.confimPassword)
  }

  render () {
    return (
      <View style={[styles.getSeedButtonsWrap]}>
        <TouchableHighlight style={[styles.cancelButtonWrap, styles.stylizedButton]}
          onPress={this.onNegative}>
          <View style={styles.stylizedButtonTextWrap}>
            <T style={[styles.cancelButton, styles.stylizedButtonText]}>
              {NEGATIVE_TEXT}
            </T>
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.doneButtonWrap, styles.stylizedButton]}
          onPress={this.onPositive}>
          <View style={styles.stylizedButtonTextWrap}>
            <T style={[styles.doneButton, styles.stylizedButtonText]}>
              {POSITIVE_TEXT}
            </T>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}
