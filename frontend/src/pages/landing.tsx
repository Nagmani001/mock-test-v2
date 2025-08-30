import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, BarChart3, Clock, Star } from 'lucide-react';
import { SignInButton, SignUpButton, useAuth } from '@clerk/clerk-react';
import Footer from '@/components/footer';

export default function Landing() {
  const auth = useAuth();
  const navigate = useNavigate();
  if (auth.isSignedIn) {
    navigate("/tests");
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              The Future of
              <span className="text-blue-600 block">Online Testing</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience secure, comprehensive, and intelligent test-taking with real-time analytics,
              advanced proctoring, and instant results that help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignUpButton>
                <div className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center group">
                  <h1>Sign Up </h1>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </SignUpButton>
              <SignInButton>
                <div className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                  <h1>Sign In</h1>
                </div>
              </SignInButton>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose CA Raman Luthra Classes ?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with user-friendly design to deliver
              the most reliable testing experience available.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group hover:shadow-md transition-shadow p-6 rounded-lg border border-gray-100">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-100 transition-colors">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Comprehensive Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Get detailed insights into your performance with advanced analytics, progress tracking,
                and personalized recommendations for improvement.
              </p>
            </div>

            <div className="text-center group hover:shadow-md transition-shadow p-6 rounded-lg border border-gray-100">
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-100 transition-colors">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure Testing Environment</h3>
              <p className="text-gray-600 leading-relaxed">
                Enterprise-grade security with advanced proctoring, anti-cheating measures,
                and encrypted data transmission to ensure test integrity.
              </p>
            </div>

            <div className="text-center group hover:shadow-md transition-shadow p-6 rounded-lg border border-gray-100">
              <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-100 transition-colors">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-time Results</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive instant feedback and detailed score reports immediately after test completion,
                with performance breakdowns by category.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              See what our users are saying about their TestPro experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rohit Sharma",
                role: "Graduate Student",
                content: "TestPro made my certification exam preparation seamless. The analytics helped me identify my weak areas and improve my scores significantly.",
                rating: 5
              },
              {
                name: "Priya Kapoor",
                role: "Graduate Student",
                content: "We use TestPro for all our employee assessments. The security features and detailed reporting make it perfect for our organization.",
                rating: 5
              },
              {
                name: "Ananya Mehta",
                role: "Teacher",
                content: "The user interface is intuitive and the real-time results feature saves me hours of grading time. Highly recommended!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of satisfied users and experience the future of online testing today.
          </p>
          <SignUpButton>
            <div
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center group"
            >
              Create Your Account
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </SignUpButton>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};



