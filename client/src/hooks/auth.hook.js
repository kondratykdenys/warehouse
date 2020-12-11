import { useCallback, useState, useEffect} from "react"

const storageName = "userData"

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userIsChief, setUserIsChief] = useState(null)

  const login = useCallback((jwtToken, isChief) => {
    setToken(jwtToken)
    setUserIsChief(isChief)

    localStorage.setItem(
      storageName,
      JSON.stringify({
        token: jwtToken,
        userIsChief: isChief,
      })
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserIsChief(null)

    localStorage.removeItem(storageName)
  }, [])


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.userIsChief)
    }
  }, [login])

  return { login, logout, token, userIsChief }
}
