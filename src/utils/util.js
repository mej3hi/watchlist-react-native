import { Alert } from 'react-native';

export const genresToString = (genres) => {
  let a = '';
  for (let index = 0; index < genres.length; index += 1) {
    if (index < (genres.length - 1)) {
      a += `${genres[index].name},  `;
    } else {
      a += genres[index].name;
    }
  }
  return a;
};

export const shortenStr = (str, len, ellipsis = '...') => {
  if (str.length <= len) { return str; }
  let result = str.substring(0, len - 1);
  result = result.substring(0, Math.min(result.length, result.lastIndexOf(' ')));
  return result + ellipsis;
};

export const toOneDecimal = (num) => {
  const rounded = Math.round(num * 10) / 10;
  return rounded;
};


export const randomNum = (max, min = 0) => (
  Math.floor((Math.random() * max) + min)
);

export const showAlert = (ReloadFunc) => {
  Alert.alert(
    'Somthing went wrong.',
    'Something went wrong, please try again.',
    [
      { text: 'Cancel' },
      { text: 'Reload', onPress: ReloadFunc },
    ],
    { cancelable: false },
  );
};
