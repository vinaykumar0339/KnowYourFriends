import Snackbar from "react-native-snackbar";
import { COLORS } from "../resources";
import NetInfo from "@react-native-community/netinfo";

export const showSnackBar = (text, duration, action, textColor) => {
  Snackbar.show({
    text,
    textColor,
    duration,
    action
  })
}

export const offlineSnackBar = () => {
  showSnackBar(
    'No network. Your in offline.',
    Snackbar.LENGTH_INDEFINITE,
    {
      text: 'Ok',
      textColor: COLORS.green
    },
    COLORS.red
  )
}

export const onlineSnackBar = (type) => {
  showSnackBar(
    `Connected to ${type} network`,
    Snackbar.LENGTH_SHORT,
    {},
    COLORS.green
  )
}

export const checkNetWorkConnection = async () => {
  const netInfo = await NetInfo.fetch();
  const { isConnected } = netInfo;
  return isConnected;
}
