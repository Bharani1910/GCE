import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Shield, BarChart2, Smartphone, Users, FileCheck } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">GE</div>
            <span className="font-bold text-2xl text-slate-900 tracking-tight">GCE Erode</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="px-5 py-2 text-slate-600 font-semibold hover:text-indigo-600 transition-colors">Login</Link>
            <Link to="/signup" className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all active:scale-95">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 text-sm font-bold animate-bounce">
            <Bell size={16} />
            The Future of Campus Communication
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Intelligent Digital <span className="text-indigo-600">Notification Framework</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            A centralized system replacing fragmented WhatsApp groups and notice boards with secure, role-based, and actionable alerts for GCE Erode.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all active:scale-95 text-lg">
              Sign Up Now
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-800 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all text-lg">
              Existing User Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white py-24 px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Framework Features</h2>
            <div className="h-1.5 w-20 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { icon: <Shield className="text-indigo-600" />, title: "Secure & Role-Based", desc: "Access dashboards tailored exactly to your responsibilities as Student, Faculty, or Admin." },
              { icon: <FileCheck className="text-indigo-600" />, title: "Mandatory Ack Tracking", desc: "Ensure critical notices are read and acknowledged with real-time lifecycle monitoring." },
              { icon: <BarChart2 className="text-indigo-600" />, title: "Deep Analytics", desc: "Track engagement rates, department-wise statistics, and acknowledgment percentages." },
              { icon: <Users className="text-indigo-600" />, title: "Department Specific", desc: "Target messages precisely to specific batches, departments, or staff groups." },
              { icon: <Smartphone className="text-indigo-600" />, title: "Mobile Responsive", desc: "A seamless experience across all devices, ensuring you never miss an update." },
              { icon: <Bell className="text-indigo-600" />, title: "Smart Prioritization", desc: "Categorize notices by priority and type—from Academic to Emergency alerts." }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all duration-300">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center font-bold">GE</div>
            <span className="font-bold text-lg">GCE Erode Framework</span>
          </div>
          <p className="text-slate-400 text-sm">© 2024 Government College of Engineering, Erode. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;