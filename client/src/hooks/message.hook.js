import { useCallback } from "react"
import { message } from "antd"

export const useMessage = () => {
  return useCallback(error => {
    if (error) {
      console.log(error)
      message.error(error)
    }
  }, [])
}
