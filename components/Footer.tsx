// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black/20">
      <div className="container py-8 text-center text-sm text-teal-200/70">
        <p>© {new Date().getFullYear()} Moodex Labs. All rights reserved.</p>
      </div>
    </footer>
  );
}
