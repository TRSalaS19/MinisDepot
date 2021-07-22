import React from 'react'
import { Alert } from 'react-bootstrap'

const Alerts = ({ variant, children}) => {
  return (
    <Alert variant={variant}>
        {children}
    </Alert>
  )
}

Alerts.defaultProps = {
  variant: 'danger',
}

export default Alerts
