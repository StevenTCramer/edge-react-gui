// @flow

import React, {Component} from 'react'
import {View, TouchableHighlight} from 'react-native'

import T from '../../../components/FormattedText/FormattedText.ui'
import styles from '../style'
import s from '../../../../../locales/strings.js'

const NEGATIVE_TEXT = s.strings.string_cancel_cap
const POSITIVE_TEXT = s.strings.string_delete

type Props = {
  onPositive: (walletId: string) => void,
  onNegative: () => void,
  onDone: () => void,
  walletId: string
}
type State = {}

export default class DeleteWalletButtons extends Component<Props, State> {
  onNegative = () => {
    this.props.onNegative()
    this.props.onDone()
  }
  onPositive = () => {
    this.props.onPositive(this.props.walletId)
    this.props.onDone()
  }

  render () {
    return (
      <View style={[styles.buttonsWrap]}>

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
