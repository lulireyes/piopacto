import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper">
      <div className="text-center">
        <h1 className="mb-4 font-display text-display text-ink">404</h1>
        <p className="mb-4 text-lead text-ink-soft">Oops! Page not found</p>
        <a href={import.meta.env.BASE_URL} className="text-link underline hover:text-link-hover">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
