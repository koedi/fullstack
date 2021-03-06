import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, className }) => {

  if (message === null) {
    return null
  } else {
    return (
      <div className={className}>
        {message}
      </div>
    )
  }
}

Notification.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
}

export default Notification
