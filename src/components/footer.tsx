export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-charcoal-950">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-white font-bold text-xl">Bningoo</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Premium office food service. Part of Lamseyah Corp.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {["About", "Careers", "Press"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-500 text-sm hover:text-gray-300 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {["For Companies", "For Employees", "Pricing"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-500 text-sm hover:text-gray-300 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {["Privacy", "Terms", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-500 text-sm hover:text-gray-300 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Bningoo — Lamseyah Corp. All
            rights reserved.
          </p>
          <div className="flex items-center gap-4 text-gray-600 text-sm">
            <span>Premium Office Food Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
