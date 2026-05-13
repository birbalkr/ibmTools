export default function Home() {
  const courses = [
    {
      title: 'Web Development',
      description: 'Learn HTML, CSS, JavaScript, and React from scratch.',
    },
    {
      title: 'UI/UX Design',
      description: 'Design beautiful and user-friendly digital experiences.',
    },
    {
      title: 'Data Science',
      description: 'Master Python, data analysis, and machine learning.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-5 bg-white shadow-sm sticky top-0 z-50">
        <h1 className="text-2xl font-bold">LearnHub</h1>
        <nav className="flex gap-6 text-sm font-medium">
          <a href="/Courses" className="hover:text-blue-600">Courses</a>
          <a href="#features" className="hover:text-blue-600">Features</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-8 py-20 text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h2 className="text-5xl font-extrabold mb-6 leading-tight">
          Learn Skills Online <br /> Anytime, Anywhere
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8 opacity-90">
          Join thousands of students learning coding, design, and business skills with interactive lessons.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition">
          Start Learning
        </button>
      </section>

      {/* Features */}
      <section id="features" className="px-8 py-16 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">Why Choose LearnSite?</h3>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition">
            <h4 className="text-xl font-semibold mb-4">Expert Teachers</h4>
            <p className="text-gray-600">
              Learn from experienced instructors with real-world knowledge.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition">
            <h4 className="text-xl font-semibold mb-4">Flexible Learning</h4>
            <p className="text-gray-600">
              Study at your own pace with lifetime course access.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition">
            <h4 className="text-xl font-semibold mb-4">Certificates</h4>
            <p className="text-gray-600">
              Earn certificates after completing your learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="px-8 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Popular Courses</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-3xl p-6 shadow hover:shadow-lg transition"
              >
                <div className="h-40 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-500 mb-6"></div>
                <h4 className="text-xl font-semibold mb-3">{course.title}</h4>
                <p className="text-gray-600 mb-6">{course.description}</p>
                <button className="w-full bg-blue-600 text-white py-3 rounded-2xl font-medium hover:bg-blue-700 transition">
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-20 text-center bg-indigo-600 text-white">
        <h3 className="text-4xl font-bold mb-4">Start Your Learning Journey Today</h3>
        <p className="max-w-2xl mx-auto mb-8 opacity-90">
          Build your future with high-quality online education and practical skills.
        </p>
        <button className="bg-white text-indigo-600 px-8 py-3 rounded-2xl font-semibold hover:scale-105 transition">
          Join Free
        </button>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-300 px-8 py-10 text-center">
        <h4 className="text-2xl font-bold text-white mb-3">LearnSite</h4>
        <p className="mb-4">Empowering students through online learning.</p>
        <p className="text-sm opacity-70">© 2026 LearnSite. All rights reserved.</p>
      </footer>
    </div>
  );
}
