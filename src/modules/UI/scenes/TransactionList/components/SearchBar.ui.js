import React, {Component} from 'react'
import {
  TextInput,
  Text,
  View,
  TouchableHighlight,
  Animated
} from 'react-native'
import s from '../../../../../locales/strings.js'
import {sprintf} from 'sprintf-js'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import styles from '../style'
import * as UTILS from '../../../../utils'

const CANCEL_TEXT = sprintf(s.strings.string_cancel_cap)
const SEARCH_PLACEHOLDER_TEXT = sprintf(s.strings.string_search)

export default class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = this.props.state
  }

  render () {
    return (
      <View style={[styles.searchContainer, UTILS.border()]}>
        <View style={[styles.innerSearch, UTILS.border()]}>
          <EvilIcons style={[styles.searchIcon, UTILS.border()]}
            name='search' size={20} />
          <TextInput style={[styles.searchInput, UTILS.border()]}
            onChangeText={this.props.onSearchChange}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            placeholder={SEARCH_PLACEHOLDER_TEXT} />
        </View>

        <Animated.View style={{width: this.state.animation, opacity: this.state.op}}>
          <TouchableHighlight style={[UTILS.border(), styles.cancelButton]}
            onPress={this.props.onPress}>
            <Text style={styles.cancelButtonText}>
              {CANCEL_TEXT}
            </Text>
          </TouchableHighlight>
        </Animated.View>
      </View>
    )
  }
}
