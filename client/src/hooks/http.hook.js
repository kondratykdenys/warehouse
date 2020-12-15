import { useCallback, useState } from "react"

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, serError] = useState(null)

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true)
      try {
        if (body) {
          body = JSON.stringify(body)
          headers["Content-Type"] = "application/json"
        }

        const response = await fetch(url, { method, body, headers })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message || "Сталася помилка з сервером. Спробуйте пізніше."
          )
        }

        setLoading(false)

        return data
      } catch (e) {
        setLoading(false)
        serError(e.message)
        setTimeout(clearError, 1000 * 3)
        throw e
      }
    },
    []
  )

  const clearError = () => serError(false)

  return { loading, request, error }
}
