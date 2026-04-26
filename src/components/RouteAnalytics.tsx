import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../lib/analytics";

export default function RouteAnalytics() {
  const location = useLocation();

  useEffect(() => {
    trackPageView({
      page_path: location.pathname + location.search + location.hash,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname, location.search, location.hash]);

  return null;
}

