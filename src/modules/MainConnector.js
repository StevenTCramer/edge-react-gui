// @flow
import type {Dispatch} from './ReduxTypes'
import * as Constants from '../constants/indexConstants.js'
import {connect} from 'react-redux'
import Main from './Main.ui'

import {
  addExchangeTimer,
  addCurrencyPlugin
} from './UI/Settings/action'
import {setKeyboardHeight} from './UI/dimensions/action'
import {
  addContext,
  addUsernames
} from './Core/Context/action.js'
import {setLocaleInfo} from './UI/locale/action'
import {
  enableScan,
  disableScan
} from './UI/scenes/Scan/action'
import * as actions from '../actions/indexActions'

import makeContextCallbacks from './Core/Context/callbacks'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatchEnableScan: () => {
    return dispatch(enableScan())
  },
  dispatchDisableScan: () => {
    return dispatch(disableScan())
  },
  addExchangeTimer: () => {
    return dispatch(addExchangeTimer())
  },
  addCurrencyPlugin: (plugin) => {
    return dispatch(addCurrencyPlugin(plugin))
  },
  setKeyboardHeight: (keyboardHeight) => {
    return dispatch(setKeyboardHeight(keyboardHeight))
  },
  addContext: (context) => {
    return dispatch(addContext(context))
  },
  addUsernames: (usernames) => {
    return dispatch(addUsernames(usernames))
  },
  setLocaleInfo: (localeInfo) => {
    return dispatch(setLocaleInfo(localeInfo))
  },
  urlRecived: (backupKey) => {
    return dispatch(actions.deepLinkLogout(backupKey))
  },
  contextCallbacks: makeContextCallbacks(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
