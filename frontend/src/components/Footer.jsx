import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div>
            <Link
              to="/"
              className="text-2xl font-bold text-white flex items-center gap-2"
            >
              <span className="text-blue-500">🚆</span> RailStream
            </Link>

            <p className="mt-4 text-sm text-slate-400 leading-6">
              RailStream provides a fast, secure, and convenient way to search
              trains, reserve seats, and manage your railway journeys from
              anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/search" className="hover:text-white transition">
                  Search Trains
                </Link>
              </li>

              <li>
                <Link to="/schedule" className="hover:text-white transition">
                  Train Schedule
                </Link>
              </li>

              <li>
                <Link to="/stations" className="hover:text-white transition">
                  Stations
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link to="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>

              <li>
                <Link to="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link to="/terms" className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>

            <div className="space-y-3 text-sm text-slate-400">
              <p>📍 Colombo, Sri Lanka</p>
              <p>📞 +94 75 288 2802</p>
              <p>✉️ support@railstream.com</p>
            </div>

            <div className="flex gap-4 mt-5">
              <a
                href="#"
                className="hover:text-white transition text-lg"
                aria-label="Facebook"
              >
                🌐
              </a>

              <a
                href="#"
                className="hover:text-white transition text-lg"
                aria-label="Twitter"
              >
                🐦
              </a>

              <a
                href="#"
                className="hover:text-white transition text-lg"
                aria-label="Instagram"
              >
                📸
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} RailStream. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;