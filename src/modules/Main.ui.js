// import HockeyApp from 'react-native-hockeyapp'
// import SplashScreen from 'react-native-splash-screen'
import React, {Component} from 'react'
import {View, StatusBar, Keyboard} from 'react-native'
import {connect} from 'react-redux'
import {ActionConst, Scene, Router} from 'react-native-router-flux'
import {Container, StyleProvider} from 'native-base'
import {MenuContext} from 'react-native-menu'
import getTheme from '../theme/components'
import platform from '../theme/variables/platform'
import Locale from 'react-native-locale'

import Login from './UI/scenes/Login/Login.ui'
import Layout from './UI/scenes/layout/LayoutConnector'
import TransactionList from './UI/scenes/TransactionList/TransactionListConnector'
import TransactionDetails from './UI/scenes/TransactionDetails'
import Request from './UI/scenes/Request/index'
import SendConfirmation from './UI/scenes/SendConfirmation/index'
import Scan from './UI/scenes/Scan/Scan.ui'
import WalletList from './UI/scenes/WalletList/WalletListConnector'
import CreateWallet from './UI/scenes/CreateWallet/createWalletConnector'
import SettingsOverview from './UI/scenes/Settings/SettingsOverviewConnector'
import CurrencySettings from './UI/scenes/Settings/CurrencySettingsConnector'

import * as CONTEXT_API from './Core/Context/api'

import {makeContext, makeReactNativeIo} from 'airbitz-core-react-native'
import * as EXCHANGE_PLUGINS from 'airbitz-exchange-plugins'
import {BitcoinCurrencyPluginFactory, LitecoinCurrencyPluginFactory} from 'airbitz-currency-bitcoin'
import {EthereumCurrencyPluginFactory} from 'airbitz-currency-ethereum'

const currencyPluginFactories = []
currencyPluginFactories.push(EthereumCurrencyPluginFactory)
currencyPluginFactories.push(BitcoinCurrencyPluginFactory)
currencyPluginFactories.push(LitecoinCurrencyPluginFactory)

const localeInfo = Locale.constants() // should likely be moved to login system and inserted into Redux

import styles from './style.js'

import ENV from '../../env.json'
import {mapAllFiles} from 'disklet'

// import { dumpFolder } from '../../debugTools.js'
export function dumpFolder (folder) {
  return mapAllFiles(folder, (file) =>
    file.getText(file).then(() => {
      // console.log(`dumpfolder: "${path}": "${text}"`)
    })
  )
}

const AIRBITZ_API_KEY = ENV.AIRBITZ_API_KEY
// const HOCKEY_APP_ID = Platform.select(ENV.HOCKEY_APP_ID)

const RouterWithRedux = connect()(Router)

export default class Main extends Component {
  constructor (props) {
    super(props)

    this.state = {
      context: {}
    }
  }

  componentWillMount () {
    // HockeyApp.configure(HOCKEY_APP_ID, true)
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  componentDidMount () {
    // HockeyApp.start()
    // HockeyApp.checkForUpdate() // optional
    makeReactNativeIo()
    .then((io) =>
      // Make the core context:
       makeContext({
         apiKey: AIRBITZ_API_KEY,
         plugins: [...currencyPluginFactories, ...Object.values(EXCHANGE_PLUGINS)],
         io
       }))
    .then((context) => {
      // Put the context into Redux:
      this.props.addContext(context)

      CONTEXT_API.listUsernames(context)
      .then((usernames) => {
        this.props.addUsernames(usernames)
      })
      this.props.setLocaleInfo(localeInfo)
      // this.setState({ context, loading: false }, () => SplashScreen.hide())
      this.setState({context, loading: false})
    })
  }

  render () {
    const routes = this.props.routes
    return (
      <StyleProvider style={getTheme(platform)}>
        <MenuContext style={{flex: 1}}>
          <View style={styles.statusBarHack}>
            <Container onLayout={this._onLayout}>

              <StatusBar translucent backgroundColor='green' barStyle='light-content' />

              <RouterWithRedux>
                <Scene key='root' hideNavBar>
                  <Scene key='login' type={ActionConst.REPLACE} initial username={this.props.username} component={Login} animation={'fade'} duration={600} />

                  <Scene hideNavBar hideTabBar key='edge' component={Layout} routes={routes} animation={'fade'} duration={600}>

                    <Scene hideNavBar hideTabBar type={ActionConst.REPLACE} key='walletList' initial component={WalletList} title='Wallets' animation={'fade'} duration={600} />
                    <Scene hideNavBar hideTabBar type={ActionConst.REPLACE} key='createWallet' component={CreateWallet} title='Create Wallet' animation={'fade'} duration={600} />

                    <Scene hideNavBar hideTabBar type={ActionConst.REPLACE} key='transactionList' component={TransactionList} title='Transactions' animation={'fade'} duration={600} />
                    <Scene hideNavBar hideTabBar type={ActionConst.REPLACE} key='transactionDetails' component={TransactionDetails} title='Transaction Details' duration={0} />

                    <Scene hideNavBar hideTabBar type={ActionConst.REPLACE} key='scan' component={Scan} title='Scan' animation={'fade'} duration={600} />
                    <Scene hideNavBar hideTabBar type={ActionConst.REPLACE} key='sendConfirmation' component={SendConfirmation} title='Send Confirmation' animation={'fade'} duration={600} />

                    <Scene hideNavBar hideTabBar type={ActionConst.REPLACE} key='request' component={Request} title='Request' animation={'fade'} duration={600} />

                    <Scene hideNavBar hideTabBar type={ActionConst.REPLACE} key='settingsOverview' component={SettingsOverview} title='Settings' animation={'fade'} duration={600} />

                    <Scene hideNavBar hideTabBar type={ActionConst.REPLACE} key='btcSettings' component={CurrencySettings} currencyCode={'BTC'} pluginName={'bitcoin'} title='BTC Settings' animation={'fade'} duration={600} />
                    <Scene hideNavBar hideTabBar type={ActionConst.REPLACE} key='ethSettings' component={CurrencySettings} currencyCode={'ETH'} pluginName={'ethereum'} title='ETH Settings' animation={'fade'} duration={600} />
                    <Scene hideNavBar hideTabBar type={ActionConst.REPLACE} key='ltcSettings' component={CurrencySettings} currencyCode={'LTC'} pluginName={'litecoin'} title='LTC Settings' animation={'fade'} duration={600} />

                  </Scene>
                </Scene>
              </RouterWithRedux>

            </Container>
          </View>
        </MenuContext>
      </StyleProvider>
    )
  }

  _onLayout = (event) => {
    const {width, height} = event.nativeEvent.layout
    const xScale = (width / 375).toFixed(2)
    const yScale = (height / 647).toFixed(2)
    this.props.setDeviceDimensions({width, height, xScale, yScale})
  }

  _keyboardDidShow = (event) => {
    let keyboardHeight = event.endCoordinates.height
    this.props.setKeyboardHeight(keyboardHeight)
  }

  _keyboardDidHide = () => {
    this.props.setKeyboardHeight(0)
  }
}
