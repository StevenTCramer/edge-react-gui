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

type Props = {
  walletId: string,
  getSeed: any
}
type State = {
  confimPassword: String
}

export default class GetSeed extends Component<Props, State> {
  componentWillMount () {
    this.setState({
      confimPassword: ''
    })
  }

  textChange = (value: string) => {
    this.setState({
      confimPassword: value
    })
  }

  renderPasswordInput = (style: any) => {
    const formStyle = {...MaterialInputOnWhite,
      container: {...MaterialInputOnWhite.container, width: 244}
    }
    return (
      <View style={ConfirmPasswordModalStyle.middle.container} >
        <FormField onChangeText={this.textChange}
          style={formStyle}
          label={s.strings.confirm_password_text}
          value={this.state.confimPassword}
          secureTextEntry
          autoFocus/>
      </View>
    )
  }

  render () {
    if (this.props.privateSeedUnlocked) {
      return (<T> {this.props.getSeed()} </T>)
    }
    return (
      <View style={[styles.getSeedContainer]}>
        <OptionSubtext
          confirmationText={s.strings.fragment_wallets_get_seed_wallet_first_confirm_message_mobile}
          label={s.strings.fragment_wallets_get_seed_wallet}
        />
        {this.renderPasswordInput()}
      </View>
    )
  }
}
