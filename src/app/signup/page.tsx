'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { addToast } from '@/store/slices/toastSlice'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import NewsletterSection from '@/components/NewsletterSection'

// Validation schema
const signupSchema = z.object({
  firstName: z.string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),
  
  lastName: z.string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),
  
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  
  phoneNumber: z.string()
    .min(1, 'Phone number is required')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits')
    .regex(/^[0-9]+$/, 'Phone number can only contain digits'),
  
  password: z.string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  confirmPassword: z.string()
    .min(1, 'Please confirm your password'),
  
  countryCode: z.string().min(1, 'Country code is required')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})

type SignupFormData = z.infer<typeof signupSchema>

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
    reset
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      countryCode: 'IN'
    }
  })

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      dispatch(addToast({
        type: 'success',
        title: 'Account Created Successfully!',
        message: 'Welcome to NIORA! You are now logged in.'
      }))
      
      // Reset form after successful signup
      reset()
      
      // Redirect to home page after successful signup
      setTimeout(() => {
        router.push('/')
      }, 1000) // Small delay to show the success toast
      
    } catch (error) {
      dispatch(addToast({
        type: 'error',
        title: 'Signup Failed',
        message: 'Something went wrong. Please try again.'
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const getFieldError = (fieldName: keyof SignupFormData) => {
    return errors[fieldName]?.message
  }

  const getFieldClasses = (fieldName: keyof SignupFormData) => {
    const hasError = !!errors[fieldName]
    const isTouched = touchedFields[fieldName]
    const isValidField = isTouched && !hasError

    let classes = "w-full px-4 py-3 border rounded-md focus:outline-none transition-colors "
    
    if (hasError) {
      classes += "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent"
    } else if (isValidField) {
      classes += "border-green-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
    } else {
      classes += "border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
    }
    
    return classes
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password)
    }
    
    strength = Object.values(checks).filter(Boolean).length
    
    return {
      strength,
      checks,
      label: strength <= 2 ? 'Weak' : strength <= 4 ? 'Medium' : 'Strong',
      color: strength <= 2 ? 'text-red-500' : strength <= 4 ? 'text-yellow-500' : 'text-green-500'
    }
  }

  const passwordValue = watch('password') || ''
  const passwordStrength = getPasswordStrength(passwordValue)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[70vh]">
            {/* Left side - Image */}
            <div className="relative order-2 lg:order-1">
              <div 
                className="w-full h-96 lg:h-[600px] bg-cover bg-center bg-no-repeat rounded-lg shadow-lg"
                style={{ backgroundImage: 'url(/signup.jpg)' }}
              >
                <div className="absolute inset-0 bg-opacity-10 rounded-lg"></div>
              </div>
            </div>

            {/* Right side - Signup Form */}
            <div className="flex items-center justify-center order-1 lg:order-2">
              <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-sm">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    SIGN UP
                  </h2>
                </div>

                <form className="space-y-4 text-black" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      {...register('firstName')}
                      className={getFieldClasses('firstName')}
                      placeholder="Enter Name"
                    />
                    {getFieldError('firstName') && (
                      <p className="mt-1 text-sm text-red-600">{getFieldError('firstName')}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      {...register('lastName')}
                      className={getFieldClasses('lastName')}
                      placeholder="Last Name"
                    />
                    {getFieldError('lastName') && (
                      <p className="mt-1 text-sm text-red-600">{getFieldError('lastName')}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className={getFieldClasses('email')}
                      placeholder="Enter Email here"
                    />
                    {getFieldError('email') && (
                      <p className="mt-1 text-sm text-red-600">{getFieldError('email')}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone number
                    </label>
                    <div className="flex">
                      <select 
                        {...register('countryCode')}
                        className="px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
                      >
                        <option value="IN">IN</option>
                        <option value="US">US</option>
                        <option value="UK">UK</option>
                      </select>
                      <input
                        id="phoneNumber"
                        type="tel"
                        {...register('phoneNumber')}
                        className={`flex-1 px-4 py-3 border border-l-0 border-gray-300 rounded-r-md focus:outline-none transition-colors ${
                          errors.phoneNumber 
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent' 
                            : touchedFields.phoneNumber && !errors.phoneNumber
                            ? 'border-green-500 focus:ring-2 focus:ring-green-500 focus:border-transparent'
                            : 'focus:ring-2 focus:ring-pink-500 focus:border-transparent'
                        }`}
                        placeholder="Phone Number"
                      />
                    </div>
                    {getFieldError('phoneNumber') && (
                      <p className="mt-1 text-sm text-red-600">{getFieldError('phoneNumber')}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Create Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        {...register('password')}
                        className={`${getFieldClasses('password')} pr-12`}
                        placeholder="Enter Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {showPassword ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          )}
                        </svg>
                      </button>
                    </div>
                    {passwordValue && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">Password strength:</span>
                          <span className={`text-xs font-medium ${passwordStrength.color}`}>
                            {passwordStrength.label}
                          </span>
                        </div>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              passwordStrength.strength <= 2 ? 'bg-red-500' : 
                              passwordStrength.strength <= 4 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                          ></div>
                        </div>
                        <div className="mt-1 text-xs text-gray-600">
                          <div className="grid grid-cols-2 gap-1">
                            <span className={passwordStrength.checks.length ? 'text-green-600' : 'text-gray-400'}>
                              ✓ 8+ characters
                            </span>
                            <span className={passwordStrength.checks.uppercase ? 'text-green-600' : 'text-gray-400'}>
                              ✓ Uppercase
                            </span>
                            <span className={passwordStrength.checks.lowercase ? 'text-green-600' : 'text-gray-400'}>
                              ✓ Lowercase
                            </span>
                            <span className={passwordStrength.checks.number ? 'text-green-600' : 'text-gray-400'}>
                              ✓ Number
                            </span>
                            <span className={passwordStrength.checks.special ? 'text-green-600' : 'text-gray-400'}>
                              ✓ Special char
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    {getFieldError('password') && (
                      <p className="mt-1 text-sm text-red-600">{getFieldError('password')}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...register('confirmPassword')}
                        className={`${getFieldClasses('confirmPassword')} pr-12`}
                        placeholder="Confirm Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {showConfirmPassword ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          )}
                        </svg>
                      </button>
                    </div>
                    {getFieldError('confirmPassword') && (
                      <p className="mt-1 text-sm text-red-600">{getFieldError('confirmPassword')}</p>
                    )}
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading || !isValid}
                      className={`w-full py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors font-medium ${
                        isLoading || !isValid
                          ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                          : 'bg-pink-600 text-white hover:bg-pink-700'
                      }`}
                    >
                      {isLoading ? 'Creating Account...' : 'CREATE ACCOUNT'}
                    </button>
                  </div>

                  <div className="text-center pt-2">
                    <p className="text-sm text-gray-600">
                      Already have an account?{' '}
                      <Link href="/login" className="text-pink-600 hover:text-pink-500 font-medium">
                        Click here
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
 <NewsletterSection />
      <Footer />
    </div>
  )
}

export default SignupPage