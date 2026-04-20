export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Wahelu. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-sm text-muted-foreground hover:underline">
            Twitter
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:underline">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
