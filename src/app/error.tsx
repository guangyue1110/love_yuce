'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">出错啦！</h2>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
        >
          重试
        </button>
      </div>
    </div>
  )
} 