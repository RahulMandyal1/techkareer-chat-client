import React, { useState, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ROUTES } from "src/constant/routesUrl"
import { login } from "src/state/slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import Loader from "src/components/Loader"

const FIELD_NAMES = {
  USERNAME: "username",
  PASSWORD: "password",
}

export default function Login() {
  const [formData, setFormData] = useState({
    [FIELD_NAMES.USERNAME]: "",
    [FIELD_NAMES.PASSWORD]: "",
  })
  const [errors, setErrors] = useState({})
  const [touchedFields, setTouchedFields] = useState({})
  const [formError, setFormError] = useState(null)
  const isSubmitting = useSelector((state) => state.auth.loading)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validateField = useCallback((name, value) => {
    switch (name) {
      case FIELD_NAMES.USERNAME:
        return value.trim() ? "" : "Username is required"
      case FIELD_NAMES.PASSWORD:
        return value.length >= 8 ? "" : "Password must be at least 8 characters long"
      default:
        return ""
    }
  }, [])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setFormError(null)
  }, [])

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target
      setTouchedFields((prev) => ({ ...prev, [name]: true }))
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    },
    [validateField],
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { payload } = await dispatch(login(formData))
    if (payload?.success) {
      navigate(ROUTES.HOME_URL)
    } else {
      setFormError(payload.message)
    }
  }

  const isFormValid = () => {
    const allFieldsTouched = Object.keys(formData).every((key) => touchedFields[key])
    const noErrors = Object.values(errors).every((error) => !error) // Check if all error values are falsy
    return allFieldsTouched && noErrors
  }

  return (
    <div className="flex min-h-screen align-center flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.entries(formData).map(([name, value]) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900 capitalize">
                {name}
              </label>
              <div className="mt-2">
                <input
                  id={name}
                  name={name}
                  type={name === FIELD_NAMES.PASSWORD ? "password" : "text"}
                  required
                  value={value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    (touchedFields[name] && errors[name]) || formError ? "ring-red-300" : "ring-gray-300"
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
                {touchedFields[name] && errors[name] && <p className="mt-2 text-sm text-red-600">{errors[name]}</p>}
              </div>
            </div>
          ))}

          {formError && <p className="mt-2 py-2 text-sm text-red-600">{formError}</p>}

          <div>
            <button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed min-h-[30]"
            >
              {isSubmitting ? <Loader /> : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not registered yet?{" "}
          <Link to={ROUTES.REGISTER_URL} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Create new account.
          </Link>
        </p>
      </div>
    </div>
  )
}
