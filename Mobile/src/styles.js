import { Dimensions, StatusBar, StyleSheet } from 'react-native'

const NAVBAR_HEIGHT = 56
const DATEBAR_HEIGHT = 48
const BOTTOMBAR_HEIGHT = 48
const ROWTIME_HEIGHT = 60

const SCREEN_HEIGHT = Dimensions.get('screen').height
const WINDOW_HEIGHT = Dimensions.get('window').height
const STATUSBAR_HEIGHT = StatusBar.currentHeight
/*
const COLORS = {
  textColor: '#212529',
  backgroundColor: '#fff',
  backgroundContrastColor: '#e9ecef',
  borderColor: '#0000002d',
  buttonBackgroundPressedColor: '#1e1e1e',
  buttonTextColor: '#212529',
  buttonTextPressedColor: '#ffffff',
}
*/
const COLORS = {
  textColor: '#adb5bd',
  backgroundColor: '#212529',
  backgroundColor: '#1e1e1e',
  backgroundContrastColor: '#343a40',
  borderColor: '#ffffff26',
  buttonBackgroundPressedColor: '#1e1e1e',
  buttonBackgroundPressedColor: '#fff',
  buttonTextColor: '#212529',
  buttonTextColor: '#adb5bd',
  buttonTextPressedColor: '#000000',
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  inputGroup: {
    flexDirection: 'row'
  },
  input: {
    flexGrow: 1,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 6,
    borderWidth: 1,
    borderStyle: 'solid',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    fontSize: 16,
    fontWeight: '400',
    borderColor: '#DEE2E6',
    color: '#212529',
    backgroundColor: '#fff',
    //placeholderTextColor: '#212529bf',
    borderColor: '#495057',
    color: '#adb5bd',
    backgroundColor: '#212529',
    placeholderTextColor: '#adb5bdbf',
  },
  labelGroup: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 6,
    borderWidth: 1,
    borderStyle: 'solid',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderRightWidth: 0,
    fontSize: 16,
    fontWeight: '400',
    borderColor: '#DEE2E6',
    color: '#212529',
    backgroundColor: '#fff',
    borderColor: '#495057',
    color: '#adb5bd',
    backgroundColor: '#212529',
  },
  bgPrimary: { backgroundColor: '#0d6efd' },
  bgSecondary: { backgroundColor: '#6c757d' },
  bgSuccess: { backgroundColor: '#198754' },
  bgInfo: { backgroundColor: '#0dcaf0' },
  bgWarning: { backgroundColor: '#ffc107' },
  bgDanger: { backgroundColor: '#dc3545' },
  bgLight: { backgroundColor: '#f8f9fa' },
  bgDark: { backgroundColor: '#212529' },
  textPrimary: { color: '#0d6efd' },
  textSecondary: { color: '#6c757d' },
  textSuccess: { color: '#198754' },
  textInfo: { color: '#0dcaf0' },
  textWarning: { color: '#ffc107' },
  textDanger: { color: '#dc3545' },
  textLight: { color: '#f8f9fa' },
  textDark: { color: '#212529' },
  h1: {
    color: COLORS.textColor,
    fontSize: 22,
    fontWeight: '500'
  },
  h2: {
    color: COLORS.textColor,
    fontSize: 20,
    fontWeight: '500'
  },
  h3: {
    color: COLORS.textColor,
    fontSize: 18,
    fontWeight: '500'
  },
  h4: {
    color: COLORS.textColor,
    fontSize: 16,
    fontWeight: '500'
  },
  mainColor: { color: COLORS.textColor },
  mainBgColor: { backgroundColor: COLORS.backgroundColor },
  mainBgContrastColor: { backgroundColor: COLORS.backgroundContrastColor },
  mainBorderColor: { borderColor: COLORS.borderColor },
  navbar: {
    marginTop: StatusBar.currentHeight || 0,
  },
  content: {
    //height: WINDOW_HEIGHT - STATUSBAR_HEIGHT - NAVBAR_HEIGHT,
    maxHeight: WINDOW_HEIGHT - STATUSBAR_HEIGHT - NAVBAR_HEIGHT
  },
  schedule: {
    height: WINDOW_HEIGHT - (STATUSBAR_HEIGHT + NAVBAR_HEIGHT + DATEBAR_HEIGHT + 16 + 16)
  },
  calendar: {
    height: WINDOW_HEIGHT - (STATUSBAR_HEIGHT + NAVBAR_HEIGHT + 32),
  },
  justifyCenter: { justifyContent: 'center' },
  justifyEnd: { justifyContent: 'flex-end' },
  justifyBetween: { justifyContent: 'space-between' },
  alignItemsCenter: { alignItems: 'center' },
  allCenter: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  border: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderStyle: 'solid',
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: COLORS.borderColor,
    borderStyle: 'solid',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: COLORS.borderColor,
    borderStyle: 'solid',
  },
  borderStart: {
    borderStartWidth: 1,
    borderColor: COLORS.borderColor,
    borderStyle: 'solid',
  },
  borderEnd: {
    borderEndWidth: 1,
    borderColor: COLORS.borderColor,
    borderStyle: 'solid',
  },
  positionRelative: { position: 'relative' },
  positionAbsolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  w100: { width: '100%' },
  h100: { height: '100%' },
  flexRow: { flexDirection: 'row' },
  flexColumn: { flexDirection: 'column' },
  button: {
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderStyle: 'solid',
    borderRadius: 8,
    padding: 8
  },
  buttonPressed: { backgroundColor: COLORS.buttonBackgroundPressedColor },
  buttonText: { color: COLORS.buttonTextColor },
  buttonTextPressed: { color: COLORS.buttonTextPressedColor },
  textUppercase: { textTransform: 'uppercase' },
  textLowercase: { textTransform: 'lowercase' },
  textCapitalize: { textTransform: 'capitalize' },
  overflowHidden: { overflow: 'hidden' }
})

/*
const buttons = StyleSheet.create({
  primary: {
    backgroundColor: '#0d6efd',
    borderColor: '#0d6efd',
  }
})
*/

const buttons = {
  button: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 6,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
  },
  primary: {
    backgroundColor: '#0d6efd',
    borderColor: '#0d6efd',
  },
  pressed: {
    primary: {
      backgroundColor: '#0b5ed7',
      borderColor: '#0a58ca',  
    }
  }
}

export { styles, buttons, NAVBAR_HEIGHT, DATEBAR_HEIGHT, ROWTIME_HEIGHT }