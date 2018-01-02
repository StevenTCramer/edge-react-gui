// @flow

const PREFIX = 'UI/SendConfimation/'
export const UPDATE_AMOUNT_SATOSHI = PREFIX + 'UPDATE_AMOUNT_SATOSHI'
export const UPDATE_LABEL = PREFIX + 'UPDATE_LABEL'
export const UPDATE_MAX_AVAILABLE_TO_SPEND_IN_CRYPTO = PREFIX + 'UPDATE_MAX_AVAILABLE_TO_SPEND_IN_CRYPTO'
export const ENABLE_SLIDER = PREFIX + 'ENABLE_SLIDER'
export const UPDATE_DRAFT_STATUS = PREFIX + 'UPDATE_DRAFT_STATUS'
export const UPDATE_IS_KEYBOARD_VISIBLE = PREFIX + 'UPDATE_IS_KEYBOARD_VISIBLE'
export const UPDATE_FEE = PREFIX + 'UPDATE_FEE'
export const UPDATE_MAX_SATOSHI = PREFIX + 'UPDATE_MAX_SATOSHI'
export const UPDATE_SPEND_PENDING = PREFIX + 'UPDATE_SPEND_PENDING'

export const UPDATE_WALLET_TRANSFER = PREFIX + 'UPDATE_WALLET_TRANSFER'
export const UPDATE_PUBLIC_ADDRESS = PREFIX + 'UPDATE_PUBLIC_ADDRESS'
export const UPDATE_SPEND_INFO = PREFIX + 'UPDATE_SPEND_INFO'
export const RESET = PREFIX + 'RESET'

export const UPDATE_CRYPTO_AMOUNT_REQUEST = PREFIX + 'UPDATE_CRYPTO_AMOUNT_REQUEST'
export const USE_MAX_CRYPTO_AMOUNT = PREFIX + 'USE_MAX_CRYPTO_AMOUNT'
export const UPDATE_TRANSACTION = PREFIX + 'UPDATE_TRANSACTION'

export const UPDATE_NATIVE_AMOUNT = PREFIX + 'UPDATE_NATIVE_AMOUNT'
export const CHANGE_MINING_FEE = PREFIX + 'CHANGE_MINING_FEE'

import {Actions} from 'react-native-router-flux'
import {openABAlert} from '../../components/ABAlert/action'
import * as Constants from '../../../../constants/indexConstants'
import * as CORE_SELECTORS from '../../../Core/selectors.js'
import * as UI_SELECTORS from '../../../UI/selectors.js'
import * as WALLET_API from '../../../Core/Wallets/api.js'
import type {AbcSpendInfo, AbcTransaction, AbcCurrencyWallet} from 'airbitz-core-types'

export type UpdateTransactionAction = {
  type: typeof UPDATE_TRANSACTION,
  data: {
    transaction?: AbcTransaction | null,
    error?: Error | null
  }
}

export const updateAmountSatoshi = (amountSatoshi: string) => ({
  type: UPDATE_AMOUNT_SATOSHI,
  data: {amountSatoshi}
})

export const updateTransactionAction = (
  transaction: AbcTransaction | null,
  error: Error | null): UpdateTransactionAction => ({
    type: UPDATE_TRANSACTION,
    data: {transaction, error}
  })

export const updateSpendPending = (pending: boolean) => ({
  type: UPDATE_SPEND_PENDING,
  data: {pending}
})

export const updateNativeAmount = (nativeAmount: string) => ({
  type: UPDATE_NATIVE_AMOUNT,
  data: {nativeAmount}
})

export const signTx = (
  abcUnsignedTransaction: AbcTransaction,
  finishCallback: (error: Error | null, abcTransaction: AbcTransaction | null) => void
) => (dispatch: any, getState: any) => {
  const state = getState()
  const selectedWalletId = UI_SELECTORS.getSelectedWalletId(state)
  const wallet = CORE_SELECTORS.getWallet(state, selectedWalletId)

  WALLET_API.signTransaction(wallet, abcUnsignedTransaction)
    .then((abcTransaction: AbcTransaction) => {
      dispatch(updateSpendPending(false))
      if (typeof finishCallback === 'function') {
        finishCallback(null, abcTransaction)
      }
      Actions.pop()
    })
    .catch((error) => {
      dispatch(updateSpendPending(false))
      if (typeof finishCallback === 'function') {
        finishCallback(error, null)
      }
      Actions.pop()
    })
}

export const signBroadcastAndSave = (
  abcUnsignedTransaction: AbcTransaction,
  finishCallback: (error: Error | null, abcTransaction: AbcTransaction | null) => void
) => (dispatch: any, getState: any) => {
  const state = getState()
  const selectedWalletId = UI_SELECTORS.getSelectedWalletId(state)
  const wallet = CORE_SELECTORS.getWallet(state, selectedWalletId)

  WALLET_API.signTransaction(wallet, abcUnsignedTransaction)
    .then((abcSignedTransaction: AbcTransaction) => {
      WALLET_API.broadcastTransaction(wallet, abcSignedTransaction)
      dispatch(updateSpendPending(false))
      if (typeof finishCallback === 'function') {
        finishCallback(null, abcSignedTransaction)
      }
      Actions.pop()
      const successInfo = {
        success: true,
        title: 'Transaction Sent',
        message: 'Your transaction has been successfully sent.'
      }
      dispatch(openABAlert(Constants.OPEN_AB_ALERT, successInfo))
      return abcSignedTransaction
    })
    .then((abcSignedTransaction: AbcTransaction) => WALLET_API.saveTransaction(wallet, abcSignedTransaction))
    .catch((e) => {
      // console.log(e)
      dispatch(updateSpendPending(false))
      const errorInfo = {
        success: false,
        title: 'Transaction Failure',
        message: e.message
      }
      if (typeof finishCallback === 'function') {
        finishCallback(e, null)
      }
      dispatch(openABAlert(Constants.OPEN_AB_ALERT, errorInfo))
    })
}

export const updateMaxSatoshiRequest = () => (dispatch: any, getState: any) => {
  const state = getState()
  const selectedWalletId = UI_SELECTORS.getSelectedWalletId(state)
  const wallet = CORE_SELECTORS.getWallet(state, selectedWalletId)

  wallet.getMaxSpendable()
    .then((amountSatoshi) => dispatch(updateMaxSatoshi(amountSatoshi)))
}

export const updateMaxSatoshi = (maxSatoshi: string) => ({
  type: UPDATE_MAX_SATOSHI,
  data: {maxSatoshi}
})

export const useMaxSatoshi = () => (dispatch: any, getState: any) => {
  const state = getState()
  const {maxSatoshi} = state.ui.scenes.sendConfirmation
  dispatch(updateAmountSatoshi(maxSatoshi))
}

export const updateWalletTransfer = (wallet: AbcCurrencyWallet) => (dispatch: any) => {
  dispatch(updateLabel(wallet.name))
}

export const processParsedUri = (parsedUri: AbcParsedUri) => (dispatch: any, getState: any) => {
  const state = getState()
  const walletId = UI_SELECTORS.getSelectedWalletId(state)
  const abcWallet = CORE_SELECTORS.getWallet(state, walletId)
  const spendInfo: AbcSpendInfo = makeSpendInfo(parsedUri)
  spendInfo.networkFeeOption = state.ui.scenes.sendConfirmation.feeSetting
  spendInfo.customNetworkFee = state.ui.scenes.sendConfirmation.feeSatoshi

  return WALLET_API.makeSpend(abcWallet, spendInfo)
  .then((abcTransaction: AbcTransaction) => {
    dispatch(updateTransactionAction(parsedUri, abcTransaction, null))
  })
  .catch((error) => {
    dispatch(updateTransactionAction(parsedUri, null, error))
  })
}

export const getMaxSpendable = () => (dispatch: any, getState: any) => {
  const state = getState()
  const walletId = UI_SELECTORS.getSelectedWalletId(state)
  const abcWallet = CORE_SELECTORS.getWallet(state, walletId)
  const spendInfo: AbcSpendInfo = makeSpendInfo(parsedUri)
  spendInfo.networkFeeOption = state.ui.scenes.sendConfirmation.feeSetting
  spendInfo.customNetworkFee = state.ui.scenes.sendConfirmation.feeSatoshi

  return WALLET_API.getMaxSpendable(abcWallet, abcSpendInfo)
    .then((maxSpendable) => dispatch(updateNativeAmount(maxSpendable)))
    .catch((error) => console.log(error))
}

export const updateLabel = (label: string) => ({
  type: UPDATE_LABEL,
  data: {label}
})

export const reset = () => ({
  type: RESET,
  data: {}
})

export const processSpendInfo = (abcSpendInfo: AbcSpendInfo) => (dispatch: any, getState: any) => {
  const state = getState()
  const walletId = UI_SELECTORS.getSelectedWalletId(state)
  const abcWallet = CORE_SELECTORS.getWallet(state, walletId)

  return WALLET_API.makeSpend(abcWallet, abcSpendInfo)
    .then((abcTransaction: AbcTransaction) => dispatch(updateTransactionAction(abcTransaction, null)))
    .catch((error: Error) => dispatch(updateTransactionAction(null, error)))
}

export const changeFee = (feeSetting: string) => ({
  type: CHANGE_MINING_FEE,
  feeSetting,
  // fee,
})
