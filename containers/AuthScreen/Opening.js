import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native-animatable'

import CustomButton from '../../components/CustomButton'
import metrics from '../../config/metrics'

export default class Opening extends Component {
  static propTypes = {
    onCreateAccountPress: PropTypes.func.isRequired,
    onSignInPress: PropTypes.func.isRequired,
    onLoginLinkedIn: PropTypes.func
  }

  render () {
    return (
      <View style={styles.container}>
        {
          this.props.onLoginLinkedIn && <View animation={'zoomIn'} delay={600} duration={400}>
            <CustomButton
              text={'Connect with LinkedIn'}
              onPress={this.props.onLoginLinkedIn}
              buttonStyle={styles.signInButton}
              textStyle={styles.createAccountButtonText}
            />
            </View>
        }
        {
          this.props.onLoginLinkedIn && <View style={styles.separatorContainer} animation={'zoomIn'} delay={700} duration={400}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorOr}>{'Or'}</Text>
            <View style={styles.separatorLine} />
          </View>
        }
        <View animation={'zoomIn'} delay={600} duration={400}>
          <CustomButton
            text={'Create Account'}
            onPress={this.props.onCreateAccountPress}
            buttonStyle={styles.createAccountButton}
            textStyle={styles.createAccountButtonText}
          />
        </View>
        {
          this.props.onLoginLinkedIn &&
          <View style={styles.separatorContainerThin} animation={'zoomIn'} delay={700} duration={400}>
          </View>
        }
        {
          !this.props.onLoginLinkedIn &&
          <View style={styles.separatorContainer} animation={'zoomIn'} delay={700} duration={400}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorOr}>{'Or'}</Text>
            <View style={styles.separatorLine} />
          </View>
        }
        <View animation={'zoomIn'} delay={800} duration={400}>
          <CustomButton
            text={'Sign In'}
            onPress={this.props.onSignInPress}
            buttonStyle={styles.signInButton}
            textStyle={styles.signInButtonText}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: metrics.DEVICE_WIDTH * 0.1,
    justifyContent: 'center'
  },
  createAccountButton: {
    backgroundColor: '#9B9FA4'
  },
  createAccountButtonText: {
    color: 'white'
  },
  separatorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20
  },
  separatorContainerThin: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 4
  },
  separatorLine: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: '#9B9FA4'
  },
  separatorOr: {
    color: '#9B9FA4',
    marginHorizontal: 8
  },
  signInButton: {
    backgroundColor: '#1976D2'
  },
  signInButtonText: {
    color: 'white'
  }
})
