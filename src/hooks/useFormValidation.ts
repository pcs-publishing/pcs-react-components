import FastestValidator, {
  ValidationError,
  ValidationSchema
} from 'fastest-validator'
import { isEmpty } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'

const validator = new FastestValidator()

interface FormValidationOptions<T> {
  schema: ValidationSchema<T>
  value: T
  validationEnabledByDefault?: boolean
}

function useFormValidation<T>(options: FormValidationOptions<T>) {
  const { schema, value } = options
  const [validationEnabled, setValidationEnabled] = useState(
    options.validationEnabledByDefault ?? true
  )
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  )
  const runValidation = useMemo(() => validator.compile(schema), [schema])

  const processValidation = useCallback(async () => {
    if (!validationEnabled) return
    const result = await runValidation(value)
    if (result === true) {
      setValidationErrors([])
    } else {
      setValidationErrors(result)
    }
  }, [runValidation, value, validationEnabled])

  useEffect(() => {
    processValidation()
  }, [processValidation])

  const getErrorForField = useCallback(
    (key: string) => {
      if (!validationEnabled) return

      const validationError = validationErrors.find(
        (validationError) => validationError.field === key
      )

      if (!validationError || !validationError.message) {
        return
      }

      return validationError.message
    },
    [validationErrors, validationEnabled]
  )

  return {
    valid: isEmpty(validationErrors),
    validationErrors,
    getErrorForField,
    runValidation,
    setValidationEnabled
  }
}

export default useFormValidation
