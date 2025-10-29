'use client'

import Image from 'next/image'

const blogs = [
  {
    id: 1,
    title: 'KNOW OUR STORY',
    date: '07 June 2025',
    image: '/nowourstory.jpg',
    excerpt: 'Discover the heritage and craftsmanship behind our jewelry collection.',
    category: 'Story'
  },
  {
    id: 2,
    title: 'BEHIND THE DESIGNS',
    date: '12 June 2025',
    image: '/behindthedesign.jpg',
    excerpt: 'Explore the creative process and inspiration behind our latest designs.',
    category: 'Design'
  }
]

const BlogSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            RECENT BLOGS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group cursor-pointer"
            >
              {/* Blog Image */}
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <div className="relative w-full h-64 md:h-80">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>

              {/* Blog Content */}
              <div className="space-y-3">
                <p className="text-sm text-gray-500">
                  {blog.date}
                </p>
                
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {blog.excerpt}
                </p>
                
                <button className="text-pink-600 text-sm font-medium hover:text-pink-700 transition-colors">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogSection