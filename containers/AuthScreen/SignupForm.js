import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native-animatable'

import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import metrics from '../../config/metrics'

export default class SignupForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onSignupPress: PropTypes.func.isRequired,
    onLoginLinkPress: PropTypes.func.isRequired,
    onCancelPress: PropTypes.func.isRequired
  }

  state = {
    email: '',
    password: '',
    login: ''
  }

  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
        this.linkRef.fadeOut(300)
      ])
    }
  }

  render () {
    const { email, password, login } = this.state
    const { isLoading, onLoginLinkPress, onSignupPress, onCancelPress } = this.props
    const isValid = email !== '' && password !== '' && login !== ''
    return (
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => this.formRef = ref}>
          <CustomTextInput
            ref={(ref) => this.mobileInputRef = ref}
            placeholder={'Login'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.emailInputRef.focus()}
            onChangeText={(value) => this.setState({ login: value })}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            ref={(ref) => this.emailInputRef = ref}
            placeholder={'Email'}
            keyboardType={'email-address'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.passwordInputRef.focus()}
            onChangeText={(value) => this.setState({ email: value })}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            ref={(ref) => this.passwordInputRef = ref}
            placeholder={'Password'}
            editable={!isLoading}
            returnKeyType={'done'}
            secureTextEntry={true}
            withRef={true}
            onChangeText={(value) => this.setState({ password: value })}
            isEnabled={!isLoading}
          />
          {
            this.props.onLoginLinkedIn && <CustomButton
              onPress={() => this.props.onLoginLinkedIn()}
              isLoading={isLoading}
              buttonStyle={styles.createLinkedInAccount}
              textStyle={styles.createLinkedInAccountButtonText}
              text={'Use LinkedIn'}
            />
          }
        </View>
        <View style={styles.footer}>
          <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <CustomButton
              onPress={() => onSignupPress(email, password, email)}
              isEnabled={isValid}
              isLoading={isLoading}
              buttonStyle={styles.createAccountButton}
              textStyle={styles.createAccountButtonText}
              text={'Create Account'}
            />
          </View>
          <Text
            ref={(ref) => this.linkRef = ref}
            style={styles.loginLink}
            onPress={onLoginLinkPress}
            animation={'fadeIn'}
            duration={600}
            delay={400}
          >
            {'Already have an account?'}
          </Text>
          <Text
            ref={(ref) => this.linkRef = ref}
            style={styles.loginLink}
            onPress={onCancelPress}
            animation={'fadeIn'}
            duration={600}
            delay={400}
          >
            {'Cancel'}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
  },
  form: {
    marginTop: 20
  },
  footer: {
    justifyContent: 'center'
  },
  createLinkedInAccount: {
    backgroundColor: '#303F9F'
  },
  createAccountButton: {
    backgroundColor: 'white'
  },
  createLinkedInAccountButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  createAccountButtonText: {
    color: '#3E464D',
    fontWeight: 'bold'
  },
  //loginLink = cancelLink
  loginLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  }
})
