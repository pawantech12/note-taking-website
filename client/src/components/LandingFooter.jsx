import React from "react";

const LandingFooter = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-neutral-800 text-white py-4 text-center mt-12">
      <p>&copy; {currentYear} NotePlus. All rights reserved.</p>
    </footer>
  );
};

export default LandingFooter;
