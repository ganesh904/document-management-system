import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      {/* Logo */}
      {/* <div className="text-white text-2xl font-semibold">
        <Link href="/">MySite</Link>
      </div> */}

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link href="/" className="text-white hover:text-gray-400 transition">
          Documents
        </Link>
        <Link href="/createdocument" className="text-white hover:text-gray-400 transition">
          Add Document
        </Link>
        {/* <Link href="/services" className="text-white hover:text-gray-400 transition">
          Services
        </Link>
        <Link href="/contact" className="text-white hover:text-gray-400 transition">
          Contact
        </Link> */}
      </div>

      {/* Button */}
      <div>
        {/* <Link href="/login">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Log In
          </button>
        </Link> */}
      </div>
    </div>
  </nav>
  )
}

export default Navbar