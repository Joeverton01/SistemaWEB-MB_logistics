export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#009DDC] mx-auto"></div>
        <p className="mt-4 text-gray-600">Carregando dashboard...</p>
      </div>
    </div>
  )
}
