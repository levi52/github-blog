export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between text-xs text-text-muted">
        <span>&copy; {new Date().getFullYear()} Levi</span>
        <a
          href="https://github.com/levi52"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors duration-200"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
