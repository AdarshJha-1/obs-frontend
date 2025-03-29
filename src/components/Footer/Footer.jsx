import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="relative overflow-hidden py-8 bg-gray-900 border-t border-gray-700 text-gray-400">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap -m-4">
          {/* Logo & Copyright */}
          <div className="w-full md:w-1/2 lg:w-4/12 p-4">
            <div className="flex flex-col h-full justify-between">
              <div className="mb-4 flex items-center space-x-2">
                <Logo size={60} /> {/* Adjusted Logo Size */}
              </div>
              <p className="text-sm">&copy; 2025 OBS. All Rights Reserved.</p>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full md:w-1/2 lg:w-2/12 p-4">
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link className="hover:text-gray-200" to="/">Features</Link></li>
              <li><Link className="hover:text-gray-200" to="/">Pricing</Link></li>
              <li><Link className="hover:text-gray-200" to="/">Affiliate Program</Link></li>
              <li><Link className="hover:text-gray-200" to="/">Press Kit</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="w-full md:w-1/2 lg:w-2/12 p-4">
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link className="hover:text-gray-200" to="/">Account</Link></li>
              <li><Link className="hover:text-gray-200" to="/">Help</Link></li>
              <li><Link className="hover:text-gray-200" to="/">Contact Us</Link></li>
              <li><Link className="hover:text-gray-200" to="/">Customer Support</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="w-full md:w-1/2 lg:w-3/12 p-4">
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-4">Legals</h3>
            <ul className="space-y-2">
              <li><Link className="hover:text-gray-200" to="/">Terms &amp; Conditions</Link></li>
              <li><Link className="hover:text-gray-200" to="/">Privacy Policy</Link></li>
              <li><Link className="hover:text-gray-200" to="/">Licensing</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
