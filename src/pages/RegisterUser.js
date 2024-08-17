import React, { useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useNavigation } from "react-router-dom"
import { toast } from "react-toastify"
import { ROUTES } from "src/constant/routesUrl"
import { register } from "src/state/slices/authSlice"
import Loader from "src/components/Loader"

const FIELD_NAMES = {
  USERNAME: "username",
  PASSWORD: "password",
  PROFILE_URL: "profileUrl",
}

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    [FIELD_NAMES.USERNAME]: "",
    [FIELD_NAMES.PASSWORD]: "",
    [FIELD_NAMES.PROFILE_URL]: "",
  })
  const [formError, setFormError] = useState(null)
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [touchedFields, setTouchedFields] = useState({})
  const isSubmitting = useSelector((state) => state.auth.loading)
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

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
    const { payload } = await dispatch(register(formData))
    if (payload?.success) {
      navigate(ROUTES.HOME_URL)
      toast.success("Welcome !")
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
          Create new account
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
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Loader /> : "Register"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to={ROUTES.LOGIN_URL} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
