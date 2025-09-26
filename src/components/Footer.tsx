const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} Running Mate. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
