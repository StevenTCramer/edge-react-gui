// @flow

const strings = {
  accept_button_text: 'Accept',
  addtoken_contract_address_input_text: 'Contract Address',
  addtoken_contract_address_input_text: 'Contract Address',
  addtoken_currency_code_input_text: 'Token Code',
  addtoken_currency_code_input_text: 'Token Code',
  addtoken_default_error_message: 'Please enter valid information',
  addtoken_default_error_message: 'Please enter valid information',
  addtoken_denomination_input_text: 'Number of Decimal Places',
  addtoken_denomination_input_text: 'Number of Decimal Places',
  addtoken_name_input_text: 'Token Name',
  addtoken_name_input_text: 'Token Name',
  addtoken_top_instructions: 'To add a token, please fill out the following form and press \'Save\'',
  addtoken_top_instructions: 'To add a token, please fill out the following form and press \'Save\'',
  amount_above_limit: 'Transaction amount is above the max limit of %1$s',
  amount_below_limit: 'Transaction amount is below the min limit of %1$s',
  back_button_text: 'Back',
  bitcoin_cash_set_spending_limits: 'BSet Spending Limits for BitcoinCash',
  bitcoin_received: '%1$s Received',
  bitcoin_remaining: '%1$s Remaining…',
  bitcoin_set_spending_limits: 'Set Spending Limits for Bitcoin',
  bitcoin: 'Bitcoin',
  bitcoinCash: 'BitcoinCash',
  calculator_done: 'Done',
  cancel: 'Cancel',
  change_mining_fee_body: 'Warning: Low Fees may cause long delays in transaction confirmation',
  change_mining_fee_title: 'Change Mining Fee',
  could_not_select: 'Could Not Select Wallet',
  dialog_title: 'Set Auto Logoff time',
  drawer_exchange_rate_loading: 'Exchange Rate Loading',
  drawer_more: 'More',
  drawer_request: 'Request',
  drawer_scan: 'Scan',
  drawer_transactions: 'Transactions',
  drawer_wallets: 'Wallets',
  dropdown_exchange_max_amount: 'Exchange Max Amount',
  edge_description: 'This application would like to create or access its wallet in your Edge account.\n\n It will not have access to any other wallets.',
  edittoken_delete_prompt: 'Are you sure you want to delete this token?',
  edittoken_delete_title: 'Unable to Edit Token',
  edittoken_delete_token: 'Delete Token',
  edittoken_duplicate_currency_code: 'A token with that token code already exists.',
  edittoken_improper_token_load: 'Unable to load initial data.',
  edittoken_top_instructions: 'Fill out token info and tap \'Save\' to edit token:',
  enter_your_password: 'Enter your password',
  ethereum_set_spending_limits: 'Set Spending Limits for Ethereum',
  ethereum: 'Ethereum',
  exchange_failed: 'Exchange Failed',
  exchange_succeeded: 'Exchange Succeeded',
  exchanges_may_take_minutes: 'Exchanges may take several minutes to process. Please check your destination wallet after a few minutes',
  fragment_create_wallet_create_wallet: 'Create Wallet',
  fragment_create_wallet_select_valid: 'Please select valid data',
  fragment_excahnge_wallet_from_header_title: 'Choose a wallet to exchange funds from:',
  fragment_excahnge_wallet_to_header_title: 'Choose a wallet to exchange funds to:',
  fragment_insufficient_funds: 'insufficient funds',
  fragment_request_copy_title: 'Copy',
  fragment_request_subtitle: 'Request',
  fragment_select_wallet_header_title: 'Choose one of the following as selected wallet:',
  fragment_select_wallet_header_title: 'Choose one of the following as selected wallet:',
  fragment_send_address_dialog_title: 'Send to Public Address',
  fragment_send_address: 'Address',
  fragment_send_flash: 'Flash',
  fragment_send_other_wallet_header_title: 'Choose a wallet to transfer funds to:',
  fragment_send_send_bitcoin_unscannable: 'Unable to scan QR code',
  fragment_send_send_to_hint: 'Public Address or Private Key',
  fragment_send_subtitle: 'Send',
  fragment_transaction_exchange: 'Exchange',
  fragment_transaction_expense: 'Expense',
  fragment_transaction_income: 'Income',
  fragment_transaction_list_receive_prefix: 'Received ',
  fragment_transaction_list_sent_prefix: 'Sent ',
  fragment_transaction_transfer: 'Transfer',
  fragment_tx_detail_mining_fee: '+ %f (Fee)',
  fragment_wallet_unconfirmed: 'Pending',
  fragment_wallets_addwallet_blockchain_hint: 'Choose a blockchain',
  fragment_wallets_addwallet_fiat_hint: 'Choose a fiat currency',
  fragment_wallets_addwallet_fiat_hint: 'Choose a fiat currency',
  fragment_wallets_addwallet_name_hint: 'New Wallet Name',
  fragment_wallets_balance_text: 'Total Balance',
  fragment_wallets_delete_wallet: 'Delete Wallet',
  fragment_wallets_header: 'My Wallets',
  fragment_wallets_rename_wallet: 'Rename Wallet',
  fragment_wallets_sort: 'Sort',
  fragment_wallets_sort: 'Sort',
  fragment_wallets_this_wallet: 'this wallet?',
  fragment_wallets_this_wallet: 'this wallet?', // needs work
  fragmet_wallets_addtoken_option: 'Add Token',
  fragmet_wallets_delete_wallet_first_confirm_message_mobile: 'Are you sure you want to delete ',
  fragmet_wallets_list_archive_title_capitalized: 'Archive',
  fragmet_wallets_managetokens_option: 'Manage Tokens',
  fragmet_wallets_managetokens_option: 'Manage Tokens',
  help_build: 'Build',
  help_modal_title: 'Crypto Wallet and Directory',
  help_version: 'Version',
  litecoin_set_spending_limits: 'Set Spending Limits for Litecoin',
  litecoin: 'Litecoin',
  loading: 'Loading…',
  manage_tokens_duplicate_currency_code: 'A token with that currency code already exists.',
  managetokens_top_instructions: 'Please select which tokens you would like displayed within the wallet:',
  managetokens_top_instructions: 'Please select which tokens you would like displayed within the wallet:',
  mining_fee_high_label_choice: 'High',
  mining_fee_low_label_choice: 'Low',
  mining_fee_standard_label_choice: 'Standard',
  per_day_spending_limit_description: 'Require password above daily limit',
  per_day_spending_limit: 'Daily Spending Limit',
  per_transaction_spending_limit_description: 'Require PIN above transaction limit',
  per_transaction_spending_limit: 'Transaction Spending Limit',
  request_qr_email_title: '%1$s Bitcoin Request',
  request_qr_waiting_for_payment: 'Waiting for Payment…',
  select_dest_wallet: 'Select Dest Wallet',
  select_src_wallet: 'Select Source Wallet',
  send_confirmation_enter_send_password: 'Password',
  send_confirmation_fee_line: 'Fee: + %s (%s)',
  send_confirmation_max_button_title: 'Send Max Amount',
  send_confirmation_slide_to_confirm: 'Slide to Confirm',
  send_scan_header_text: 'Scan, to Send, import, or Edge Login',
  send_to_title: 'To:',
  settings_account_title_cap: 'Account',
  settings_button_change_password: 'Change password',
  settings_button_debug: 'Debug',
  settings_button_lock_settings: 'Tap to lock Account Settings',
  settings_button_logout: 'Logout',
  settings_button_pin: 'Change PIN',
  settings_button_send_logs: 'Send logs',
  settings_button_setup_two_factor: 'Setup 2 Factor',
  settings_button_unlock_settings: 'Tap to unlock Account Settings',
  settings_button_use_touchID: 'Use TouchID',
  settings_days: 'Day(s)',
  settings_denominations_title: 'Denominations',
  settings_hours: 'Hour(s)',
  settings_minutes: 'Minute(s)',
  settings_modal_send_logs_title: 'Send logs?',
  settings_options_title_cap: 'Options',
  settings_options_title: 'Options',
  settings_password_spending_limit_title: 'Password Spending Limit',
  settings_pin_spending_limit_title: 'Pin Spending Limit',
  settings_seconds: 'Second(s)',
  settings_select_currency: 'Select a currency',
  settings_title_auto_logoff: 'Auto log off after',
  settings_title_currency: 'Default Currency',
  settings_title_pin_login: 'PIN Re-login',
  settings_title: 'Settings',
  spending_limits: 'Spending Limits',
  string_cancel_cap: 'Cancel',
  string_cancel: 'CANCEL',
  string_confirm: 'Confirm',
  string_delete: 'Delete',
  string_disable: 'DISABLE',
  string_done_cap: 'Done',
  string_fee_with_brackets: '(Fee)',
  string_fee_with_colon: 'Fee: ',
  string_first_ethereum_wallet_name: 'My Ether',
  string_from_exchange_info: 'You are about to exchange\n %1$s %2$s\n (%3$s)\n from %4$s',
  string_help: 'Help',
  string_next: 'NEXT',
  string_no_name: 'No name',
  string_ok: 'OK',
  string_paste_address: 'Paste %1$s',
  string_rename: 'Rename',
  string_save: 'Save',
  string_search: 'Search',
  string_share: 'Share',
  string_show_balance: 'Show Balance',
  string_to_exchange_info: 'and deposit %1$s %2$s\n to %3$s',
  title_add_token: 'Add Token',
  title_add_tokens: 'Add Tokens',
  title_back: 'Back',
  title_bitcoin_settings: 'Bitcoin Settings',
  title_bitcoinCash_settings: 'BitcoinCash Settings',
  title_change_mining_fee: 'Change Mining Fee',
  title_change_password: 'Change Password',
  title_change_pin: 'Change Pin',
  title_confirm_exchange: 'Confirm exchange',
  title_create_wallet: 'Create Wallet',
  title_default_fiat: 'Default Fiat',
  title_edge_login: 'Edge Login',
  title_edit_token: 'Edit Token',
  title_ethereum_settings: 'Ethereum Settings',
  title_exchange: 'Exchange',
  title_Header: 'Header',
  title_litecoin_settings: 'Litecoin Settings',
  title_manage_tokens: 'Manage Tokens',
  title_password_recovery: 'Password Recovery',
  title_request: 'Request',
  title_send_confirmation: 'Send Confirmation',
  title_send: 'Send',
  title_settings: 'Settings',
  title_transaction_details: 'Transaction Details',
  title_transactions: 'Transactions',
  title_wallets: 'Wallets',
  token_not_supported: 'Token is not supported by exchange',
  transaction_details_category_title: 'Category',
  transaction_details_notes_title: 'Notes',
  transaction_details_payee: 'Payee',
  transaction_details_view_advanced_data: 'View advanced transaction data',
  tx_detail_picker_title: 'Please choose a category:',
}

export default strings
