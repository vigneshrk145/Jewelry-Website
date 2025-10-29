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
const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  
  password: z.string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters'),
  
  showPassword: z.boolean().optional()
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
    reset
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      showPassword: false
    }
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      dispatch(addToast({
        type: 'success',
        title: 'Login Successful',
        message: 'Welcome back!'
      }))
      
      // Reset form after successful login
      reset()
      
      // Redirect to home page after successful login
      setTimeout(() => {
        router.push('/')
      }, 1000) // Small delay to show the success toast
      
    } catch (error) {
      dispatch(addToast({
        type: 'error',
        title: 'Login Failed',
        message: 'Invalid email or password. Please try again.'
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const getFieldError = (fieldName: keyof LoginFormData) => {
    return errors[fieldName]?.message
  }

  const getFieldClasses = (fieldName: keyof LoginFormData) => {
    const hasError = !!errors[fieldName]
    const isTouched = touchedFields[fieldName]
    const isValidField = isTouched && !hasError

    let classes = "w-full px-4 py-3 border text-black rounded-md focus:outline-none transition-colors "
    
    if (hasError) {
      classes += "border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent"
    } else if (isValidField) {
      classes += "border-green-500 focus:ring-2 focus:ring-green-500 focus:border-transparent"
    } else {
      classes += "border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
    }
    
    return classes
  }

  const emailValue = watch('email') || ''
  const passwordValue = watch('password') || ''

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[70vh]">
            {/* Left side - Image */}
            <div className="relative order-2 lg:order-1">
              <div 
                className="w-full h-96 lg:h-[500px] bg-cover bg-center bg-no-repeat rounded-lg shadow-lg"
                style={{ backgroundImage: 'url(/login.jpg)' }}
              >
                <div className="absolute inset-0  bg-opacity-10 rounded-lg"></div>
              </div>
            </div>

            {/* Right side - Login Form */}
            <div className="flex items-center justify-center order-1 lg:order-2">
              <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    LOG IN
                  </h2>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={getFieldClasses('email')}
                        placeholder="Enter Email here"
                      />
                      {touchedFields.email && !errors.email && emailValue && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {getFieldError('email') && (
                      <p className="mt-1 text-sm text-red-600">{getFieldError('email')}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        {...register('password')}
                        className={`${getFieldClasses('password')} pr-20`}
                        placeholder="Enter Password"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                        {touchedFields.password && !errors.password && passwordValue && (
                          <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >

                          {/* <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {showPassword ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            )}
                          </svg> */}
                          
                        </button>
                      </div>
                    </div>
                    {getFieldError('password') && (
                      <p className="mt-1 text-sm text-red-600">{getFieldError('password')}</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <input
                          id="show-password"
                          type="checkbox"
                          checked={showPassword}
                          onChange={(e) => setShowPassword(e.target.checked)}
                          className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                        />
                        <label htmlFor="show-password" className="ml-2 block text-sm text-gray-700">
                          Show password
                        </label>
                      </div>
                      <div className="text-sm">
                        <Link href="/forgot-password" className="text-pink-600 hover:text-pink-500">
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isLoading || !isValid}
                      className={`w-full py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors font-medium flex items-center justify-center ${
                        isLoading || !isValid
                          ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                          : 'bg-pink-600 text-white hover:bg-pink-700'
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Logging in...
                        </>
                      ) : (
                        'LOG IN'
                      )}
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Don&apos;t have an account?{' '}
                      <Link href="/signup" className="text-pink-600 hover:text-pink-500 font-medium">
                        Register Here
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

export default LoginPage