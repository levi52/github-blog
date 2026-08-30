export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Levi&apos;s Blog. Built with Next.js &amp; deployed on GitHub Pages.
      </div>
    </footer>
  );
}
