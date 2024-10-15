import { FormField, FormFieldProps } from '@radix-ui/react-form'
import React from 'react'
import { cn } from '../../lib/utils'

const Field = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, ...props }, ref) => {
    return (
      <FormField {...props} ref={ref} className={cn('grid mb-4', className)} />
    )
  },
)
Field.displayName = 'Field'

export { Field }
