// @flow

import * as UTILS from '../../../utils'

const PREFIX = 'UI/Scenes/TransactionList/'
export const UPDATE_TRANSACTIONS_LIST = PREFIX + 'UPDATE_TRANSACTIONS_LIST'
export const DELETE_TRANSACTIONS_LIST = PREFIX + 'DELETE_TRANSACTIONS_LIST'
export const TRANSACTIONS_SEARCH_VISIBLE = PREFIX + 'TRANSACTIONS_SEARCH_VISIBLE'
export const TRANSACTIONS_SEARCH_HIDDEN = PREFIX + 'TRANSACTIONS_SEARCH_HIDDEN'
export const UPDATE_CONTACTS_LIST = PREFIX + 'UPDATE_CONTACTS_LIST'
export const UPDATE_SEARCH_RESULTS = PREFIX + 'UPDATE_SEARCH_RESULTS'
export const ENABLE_UPDATING_BALANCE = PREFIX + 'ENABLE_UPDATING_BALANCE'
export const DISABLE_UPDATING_BALANCE = PREFIX + 'DISABLE_UPDATING_BALANCE'
export const TOGGLE_UPDATING_BALANCE = PREFIX + 'TOGGLE_UPDATING_BALANCE'
export const TOGGLE_TRANSACTIONS_WALLET_LIST_MODAL = PREFIX + 'TOGGLE_TRANSACTIONS_WALLET_LIST_MODAL'
export const UPDATE_TRANSACTIONS = PREFIX + 'UPDATE_TRANSACTIONS'
export const GET_TRANSACTIONS = PREFIX + 'GET_TRANSACTIONS'

export const NEW_TRANSACTIONS = PREFIX + 'NEW_TRANSACTIONS'
export const CHANGED_TRANSACTIONS = PREFIX + 'CHANGED_TRANSACTIONS'

import * as CORE_SELECTORS from '../../../Core/selectors.js'
import * as UI_SELECTORS from '../../../UI/selectors.js'
import * as WALLET_API from '../../../Core/Wallets/api.js'

import {displayTransactionAlert} from '../../components/TransactionAlert/actions'

import type {
  Dispatch,
  GetState
} from '../../../ReduxTypes'

import type {
  AbcTransaction
} from 'airbitz-core-types'

export const getTransactionsRequest = (walletId: string, currencyCode) => (dispatch: Dispatch, getState: GetState) => {
  global.pnow('START getTransactionsRequest')
  const state = getState()
  const wallet = CORE_SELECTORS.getWallet(state, walletId)

  if (wallet) {
    global.pnow('START WALLET_API.getTransactions')
    WALLET_API.getTransactions(wallet, currencyCode)
    .then((transactions) => {
      global.pnow('END WALLET_API.getTransactions')
      global.pnow('START dispatch updateTransactions')
      dispatch(updateTransactions(transactions))
      global.pnow('END dispatch updateTransactions')
      global.pnow('END getTransactionsRequest')
    })
  }
}

const refreshDetails = {}

function dispatchGetTransactionsRequest (dispatch, walletId, currencyCode) {
  // console.log('updating wallet balance', walletId)
  global.pnow('START dispatchGetTransactionsRequest')
  global.pstart('dispatchGetTransactionsRequest')
  dispatch(getTransactionsRequest(walletId, currencyCode))
  refreshDetails[walletId].delayRefresh = false
  refreshDetails[walletId].lastRefresh = Date.now()
  global.pend('dispatchGetTransactionsRequest')
  global.pnow('END dispatchGetTransactionsRequest lastRefresh:' + refreshDetails[walletId].lastRefresh)
}


export const refreshTransactionsRequest = (walletId: string) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const selectedWalletId = UI_SELECTORS.getSelectedWalletId(state)
  const currencyCode = UI_SELECTORS.getSelectedCurrencyCode(state)

  if (walletId === selectedWalletId) {
    if (!refreshDetails[walletId]) {
      refreshDetails[walletId] = {
        delayRefresh: false,
        lastRefresh: 0
      }
    }
    if (!refreshDetails[walletId].delayRefresh) {
      const now = Date.now()
      if (now - refreshDetails[walletId].lastRefresh > 3000) {
        dispatchGetTransactionsRequest(dispatch, walletId, currencyCode)
      } else {
        console.log('dispatchGetTransactionsRequest setTimeout delay getTransactions id:' + walletId)
        refreshDetails[walletId].delayRefresh = true
        setTimeout(() => {
          dispatchGetTransactionsRequest(dispatch, walletId, currencyCode)
        }, 3000)
      }
    } else {
      console.log('dispatchGetTransactionsRequest delay getTransactions id:' + walletId)
    }
  }
}

export const newTransactionsRequest = (walletId: string, abcTransactions: Array<AbcTransaction>) => (dispatch: Dispatch) => {
  const abcTransaction: abcTransaction = abcTransactions[0]
  if (!UTILS.isReceivedTransaction(abcTransaction)) return

  dispatch(displayTransactionAlert(abcTransaction))
}

export const newTransactions = (transactions: Array<AbcTransaction>) => ({
  type: NEW_TRANSACTIONS,
  data: {transactions}
})

export const changedTransactionsRequest = (transactions: Array<AbcTransaction>, walletId: string) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const selectedWalletId = UI_SELECTORS.getSelectedWalletId(state)

  if (walletId === selectedWalletId) {
    return dispatch(changedTransactions(transactions))
  }
}

export const changedTransactions = (transactions: Array<AbcTransaction>) => ({
  type: CHANGED_TRANSACTIONS,
  data: {transactions}
})

export const updateTransactions = (transactions: Array<AbcTransaction>) => ({
  type: UPDATE_TRANSACTIONS,
  data: {transactions}
})

export const updateBalance = () => ({
  type: 'noop'
})

export function deleteTransactionsList () {
  return {
    type: DELETE_TRANSACTIONS_LIST
  }
}

export function transactionsSearchVisible () {
  return {
    type: TRANSACTIONS_SEARCH_VISIBLE
  }
}

export function transactionsSearchHidden () {
  return {
    type: TRANSACTIONS_SEARCH_HIDDEN
  }
}

// $FlowFixMe
export function updateContactsList (data) {
  return {
    type: UPDATE_CONTACTS_LIST,
    data
  }
}

// $FlowFixMe
export function updateSearchResults (data) {
  return {
    type: UPDATE_SEARCH_RESULTS,
    data
  }
}

export function toggleTransactionsWalletListModal () {
  return {
    type: TOGGLE_TRANSACTIONS_WALLET_LIST_MODAL
  }
}
