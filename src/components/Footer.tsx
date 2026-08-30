export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between text-xs text-text-muted">
        <span>&copy; {new Date().getFullYear()} Levi</span>
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
}
