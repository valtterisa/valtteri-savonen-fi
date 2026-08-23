type NotFoundPageProps = {
  message?: string;
};

export function NotFoundPage({ message = "Page not found." }: NotFoundPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
      <h1 className="text-2xl font-bold">404</h1>
      <p className="text-muted-foreground">{message}</p>
      <a
        href="/"
        className="text-muted-foreground hover:text-foreground underline underline-offset-2"
      >
        Go home
      </a>
    </div>
  );
}
