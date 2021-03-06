// @flow

import {Actions} from 'react-native-router-flux'

import type {Dispatch, GetState} from '../../../ReduxTypes'

import * as ACCOUNT_API from '../../../Core/Account/api.js'
import * as WALLET_API from '../../../Core/Wallets/api.js'
import * as UI_ACTIONS from '../../Wallets/action.js'

import * as CORE_SELECTORS from '../../../Core/selectors.js'
import * as WALLET_SELECTORS from '../../selectors.js'

export const TOGGLE_ARCHIVE_VISIBILITY = 'TOGGLE_ARCHIVE_VISIBILITY'

export const OPEN_DELETE_WALLET_MODAL = 'OPEN_DELETE_WALLET_MODAL'
export const CLOSE_DELETE_WALLET_MODAL = 'CLOSE_DELETE_WALLET_MODAL'

export const OPEN_RENAME_WALLET_MODAL = 'OPEN_RENAME_WALLET_MODAL'
export const CLOSE_RENAME_WALLET_MODAL = 'CLOSE_RENAME_WALLET_MODAL'
export const UPDATE_RENAME_WALLET_INPUT = 'UPDATE_RENAME_WALLET_INPUT'

export const OPEN_RESYNC_WALLET_MODAL = 'OPEN_RESYNC_WALLET_MODAL'
export const CLOSE_RESYNC_WALLET_MODAL = 'CLOSE_RESYNC_WALLET_MODAL'

export const OPEN_SPLIT_WALLET_MODAL = 'OPEN_SPLIT_WALLET_MODAL'
export const CLOSE_SPLIT_WALLET_MODAL = 'CLOSE_SPLIT_WALLET_MODAL'

export const UPDATE_ACTIVE_WALLETS_ORDER_START = 'UPDATE_ACTIVE_WALLETS_ORDER_START'
export const UPDATE_ACTIVE_WALLETS_ORDER_SUCCESS = 'UPDATE_ACTIVE_WALLETS_ORDER_SUCCESS'

export const UPDATE_ARCHIVED_WALLETS_ORDER_START = 'UPDATE_ARCHIVED_WALLETS_ORDER_START'
export const UPDATE_ARCHIVED_WALLETS_ORDER_SUCCESS = 'UPDATE_ARCHIVED_WALLETS_ORDER_SUCCESS'

export const ARCHIVE_WALLET_START = 'ARCHIVE_WALLET_START'
export const ARCHIVE_WALLET_SUCCESS = 'ARCHIVE_WALLET_SUCCESS'

export const ACTIVATE_WALLET_START = 'ACTIVATE_WALLET_START'
export const ACTIVATE_WALLET_SUCCESS = 'ACTIVATE_WALLET_SUCCESS'

export const RENAME_WALLET_START = 'RENAME_WALLET_START'
export const RENAME_WALLET_SUCCESS = 'RENAME_WALLET_SUCCESS'

export const RESYNC_WALLET_START = 'RESYNC_WALLET_START'
export const RESYNC_WALLET_SUCCESS = 'RESYNC_WALLET_SUCCESS'

export const SPLIT_WALLET_START = 'SPLIT_WALLET_START'
export const SPLIT_WALLET_SUCCESS = 'SPLIT_WALLET_SUCCESS'

export const DELETE_WALLET_START = 'DELETE_WALLET_START'
export const DELETE_WALLET_SUCCESS = 'DELETE_WALLET_SUCCESS'

export const ADD_TOKEN = 'ADD_TOKEN'

export const walletRowOption = (walletId: string, option: string, archived: boolean) => {
  if (option === 'archive' && archived) {
    option = 'activate'
  }
  switch (option) {
    case 'restore':
    case 'activate':
      return (dispatch: Dispatch, getState: GetState) => {
        const state = getState()
        const account = CORE_SELECTORS.getAccount(state)

        dispatch(wrap(ACTIVATE_WALLET_START, {walletId}))

        ACCOUNT_API.activateWalletRequest(account, walletId)
        .then(() => {
          dispatch(wrap(ACTIVATE_WALLET_SUCCESS, {walletId}))
        })
        .catch((e) => console.log(e))
      }

    case 'archive':
      return (dispatch: Dispatch, getState: GetState) => {
        const state = getState()
        const account = CORE_SELECTORS.getAccount(state)

        dispatch(wrap(ARCHIVE_WALLET_START, {walletId}))

        ACCOUNT_API.archiveWalletRequest(account, walletId)
        .then(() => {
          dispatch(wrap(ARCHIVE_WALLET_SUCCESS, {walletId}))
        })
        .catch((e) => console.log(e))
      }

    case 'manageTokens':
      return (dispatch: Dispatch, getState: GetState) => {
        const state = getState()
        const wallet = WALLET_SELECTORS.getWallet(state, walletId)
        Actions.manageTokens({guiWallet: wallet})
      }
    case 'delete':
      return (dispatch: Dispatch) => {
        dispatch(wrap(OPEN_DELETE_WALLET_MODAL, {walletId}))
      }

    case 'rename':
      return (dispatch: Dispatch, getState: GetState) => {
        const state = getState()
        const walletName = CORE_SELECTORS.getWallet(state, walletId).name

        dispatch(wrap(OPEN_RENAME_WALLET_MODAL, {walletId, walletName}))
      }

    case 'resync':
      return (dispatch: Dispatch) => {
        dispatch(wrap(OPEN_RESYNC_WALLET_MODAL, {walletId}))
      }

    case 'split':
      return (dispatch: Dispatch) => {
        dispatch(wrap(OPEN_SPLIT_WALLET_MODAL, {walletId}))
      }

    case 'addToken':
      return (dispatch: Dispatch) => {
        dispatch(wrap(ADD_TOKEN, {walletId}))
      }
  }
}

export const renameWallet = (walletId: string, walletName: string) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const wallet = CORE_SELECTORS.getWallet(state, walletId)

  dispatch(wrap(RENAME_WALLET_START, {walletId}))

  WALLET_API.renameWalletRequest(wallet, walletName)
    .then(() => {
      dispatch(wrap(RENAME_WALLET_SUCCESS, {walletId}))
      dispatch(UI_ACTIONS.refreshWallet(walletId))
    })
    .catch((e) => console.log(e))
}

export const resyncWallet = (walletId: string) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()

  const wallet = CORE_SELECTORS.getWallet(state, walletId)

  dispatch(wrap(RESYNC_WALLET_START, {walletId}))

  WALLET_API.resyncWallet(wallet)
    .then(() => {
      dispatch(wrap(RESYNC_WALLET_SUCCESS, {walletId}))
      dispatch(UI_ACTIONS.refreshWallet(walletId))
    })
    .catch((e) => console.log(e))
}

export const splitWallet = (walletId: string) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()

  const account = CORE_SELECTORS.getAccount(state)
  const splitType = getSplitType()

  dispatch(wrap(SPLIT_WALLET_START, {walletId}))

  account.splitWalletInfo(walletId, splitType)
    .then(() => {
      dispatch(wrap(SPLIT_WALLET_SUCCESS, {walletId}))
    })
    .catch((e) => console.log(e))
}

export const deleteWallet = (walletId: string) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const account = CORE_SELECTORS.getAccount(state)

  dispatch(wrap(DELETE_WALLET_START, {walletId}))

  ACCOUNT_API.deleteWalletRequest(account, walletId)
    .then(() => {
      dispatch(wrap(DELETE_WALLET_SUCCESS, {walletId}))
      dispatch({type: CLOSE_DELETE_WALLET_MODAL})
    })
    .catch((e) => console.log(e))
}

export const updateActiveWalletsOrder = (activeWalletIds: Array<string>) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const {account} = state.core
  dispatch(wrap(UPDATE_ACTIVE_WALLETS_ORDER_START, {activeWalletIds}))
  ACCOUNT_API.updateActiveWalletsOrderRequest(account, activeWalletIds)
    .then(() => {
      dispatch(wrap(UPDATE_ACTIVE_WALLETS_ORDER_SUCCESS, {activeWalletIds}))
    })
    .catch((e) => console.log(e))
}

export const updateIndividualWalletSortIndex = (walletId: string, sortIndex: number) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const wallet = CORE_SELECTORS.getWallet(state, walletId)
  wallet.sortIndex = sortIndex
  return dispatch(UI_ACTIONS.upsertWallet(wallet))
}

export const updateArchivedWalletsOrder = (archivedWalletIds: Array<string>) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState()
  const {account} = state.core

  dispatch(wrap(UPDATE_ARCHIVED_WALLETS_ORDER_START, {archivedWalletIds}))

  ACCOUNT_API.updateArchivedWalletsOrderRequest(account, archivedWalletIds)
    .then((archivedWalletIds: Array<string>) => {
      dispatch(wrap(UPDATE_ARCHIVED_WALLETS_ORDER_SUCCESS, {archivedWalletIds}))
    })
    .catch((e) => console.log(e))
}

const wrap = (type, data) => ({ type, data })

export const updateRenameWalletInput = (renameWalletInput: string) => ({
  type: UPDATE_RENAME_WALLET_INPUT,
  data: {renameWalletInput}
})

const getSplitType = () => 'wallet:bitcoincash'
