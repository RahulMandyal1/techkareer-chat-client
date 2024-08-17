import Cookies from "js-cookie"
const ACCESS_TOKEN_KEY = "chatapp-accessToken"

export const setTokens = ({ accessToken }) => {
  Cookies.set(ACCESS_TOKEN_KEY, accessToken)
}

export const getTokens = () => {
  const accessToken = Cookies.get(ACCESS_TOKEN_KEY)
  return { accessToken }
}

export const clearTokens = () => {
  Cookies.remove(ACCESS_TOKEN_KEY)
}
