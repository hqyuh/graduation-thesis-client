import React from 'react'
import { toast } from 'react-toastify'

interface WithToastProps {
  toast: typeof toast
}

export function getDisplayName<T>(WrappedComponent: React.ComponentType<T>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const withToast = <P extends WithToastProps = WithToastProps>(
  WrappedComponent: React.ComponentType<P>,
): React.FC<P> => {
  const WithToast: React.FC<P> = (props) => <WrappedComponent {...props} toast={toast} />
  WithToast.displayName = `WithToast${getDisplayName<P>(WithToast)}`
  return WithToast
}

export default withToast
