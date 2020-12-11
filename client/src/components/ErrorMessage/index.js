import React from "react"
import { Alert } from "antd"

// How show error?
// <ErrorMessage clearError={clearError}>{error}</ErrorMessage>

function ErrorMessage({ children, clearError }) {
  return children ? (
    <Alert
      type="error"
      message={children}
      afterClose={() => {
        if (clearError) {
          clearError()
        }
      }}
      closable
    />
  ) : (
    ""
  )
}

export default ErrorMessage
