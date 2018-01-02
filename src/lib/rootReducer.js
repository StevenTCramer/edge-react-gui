import {combineReducers} from 'redux'
import routes from './routesReducer'
import {core} from '../modules/Core/reducer.js'
import {ui} from '../modules/UI/reducer.js'
import {exchangeRates} from '../modules/ExchangeRates/reducer.js'
import cryptoExchange from '../reducers/CryptoExchangeReducer'
import plugins from '../reducers/plugins/pluginsReducer'

const rootReducer = combineReducers({
  routes,
  core,
  ui,
  cryptoExchange,
  exchangeRates,
  plugins
})


export default rootReducer
