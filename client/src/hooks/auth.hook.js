import { useCallback, useState, useEffect } from "react"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const storageName = "userData"

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userIsChief, setUserIsChief] = useState(null)

  const login = useCallback((jwtToken, isChief) => {
    setToken(jwtToken)
    setUserIsChief(isChief)

    const expires = new Date(Date.now() + 3600000)

    cookies.set(
      storageName,
      JSON.stringify({
        token: jwtToken,
        userIsChief: isChief,
      }),
      { path: "/", expires: expires }
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserIsChief(null)

    cookies.remove(storageName)
  }, [])

  useEffect(() => {
    const data = cookies.get(storageName)

    if (data && data.token) {
      login(data.token, data.userIsChief)
    }
  }, [login])

  return { login, logout, token, userIsChief }
}
