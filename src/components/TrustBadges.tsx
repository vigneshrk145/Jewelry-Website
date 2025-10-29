'use client'

const TrustBadges = () => {
  const badges = [
    {
      id: 1,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'IODHIA CERTIFIED',
      subtitle: ''
    },
    {
      id: 2,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 5l7 7m-7 0l7-7" />
        </svg>
      ),
      title: 'FREE & FAST',
      subtitle: 'WORLDWIDE SHIPPING'
    },
    {
      id: 3,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'ETHICALLY SOURCED',
      subtitle: 'MATERIALS'
    },
    {
      id: 4,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'LIFETIME WARRANTY',
      subtitle: 'AND SUPPORT'
    }
  ]

  return (
    <section className="py-12 bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex flex-col items-center text-center space-y-3"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                {badge.icon}
              </div>
              
              {/* Text */}
              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                  {badge.title}
                </h3>
                {badge.subtitle && (
                  <p className="text-xs text-gray-600 uppercase tracking-wide">
                    {badge.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustBadges