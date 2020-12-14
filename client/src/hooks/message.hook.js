import { useCallback } from "react"
import { message } from "antd"

export const useMessage = () => {
  return useCallback(error => {
    if (error) {
      message.error(error)
    }
  }, [])
}
