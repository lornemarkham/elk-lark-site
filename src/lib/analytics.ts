export type AnalyticsParams = {
  page_path?: string;
  page_location?: string;
  page_title?: string;
  from_path?: string;
  to_path?: string;
  /** Route or URL the CTA navigates to (e.g. intake path with query). */
  destination?: string;
  /** High-level page funnel for plan-your-retreat CTAs (e.g. wellness). */
  page_type?: string;
  /** Where on the page the CTA appeared — stable for reporting (not derived from label). */
  cta_context?: "hero" | "mid_page" | "bottom" | "nav" | "footer";
  cta_text?: string;
  placement?: string;
  selected_type?: string;
  cta_source?: string;
  add_on_name?: string;
  action?: string;
  selected_count?: number;
  has_add_ons?: boolean;
  add_on_count?: number;
  has_dates?: boolean;
  error_type?: string;
  status?: number;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function getPageContext(): Required<Pick<AnalyticsParams, "page_path" | "page_location" | "page_title">> {
  if (typeof window === "undefined") {
    return { page_path: "", page_location: "", page_title: "" };
  }
  return {
    page_path: window.location.pathname,
    page_location: window.location.href,
    page_title: document.title,
  };
}

function ensureDataLayer(): Array<Record<string, unknown>> {
  if (typeof window === "undefined") {
    return [];
  }
  window.dataLayer = window.dataLayer ?? [];
  return window.dataLayer;
}

/** Experience funnel tags for primary planning CTAs (GTM). */
export type PlanCtaPageType = "wellness" | "wedding" | "group" | "general";

/** Map URL to funnel type for shared CTAs (nav/footer). Defaults to wellness when unknown. */
export function planPageTypeFromPathname(pathname: string): PlanCtaPageType {
  if (pathname.startsWith("/micro-weddings")) return "wedding";
  if (pathname.startsWith("/group-getaways")) return "group";
  if (pathname.startsWith("/wellness-retreats")) return "wellness";
  return "wellness";
}

/**
 * Minimal GTM push before navigation — matches standard tag wiring for plan CTAs.
 */
export function pushPlanCtaDataLayer(pageType: PlanCtaPageType): void {
  if (typeof window === "undefined") {
    return;
  }
  const dataLayer = ensureDataLayer();
  dataLayer.push({ event: "plan_cta_click", page_type: pageType });
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") {
    return;
  }
  const dataLayer = ensureDataLayer();
  dataLayer.push({
    event: eventName,
    ...getPageContext(),
    ...params,
  });
}

export function trackCtaClick(params: Pick<AnalyticsParams, "cta_text" | "placement" | "to_path" | "from_path" | "cta_source">): void {
  trackEvent("cta_click", params);
}

/**
 * Primary planning/intake funnel CTAs — single dataLayer push before navigation (event + page_type + context).
 */
export function trackPlanCtaClick(params: {
  cta_text: string;
  cta_context: NonNullable<AnalyticsParams["cta_context"]>;
  page_type: PlanCtaPageType;
  destination: string;
  from_path?: string;
}): void {
  if (typeof window === "undefined") {
    return;
  }
  const dataLayer = ensureDataLayer();
  const { destination, page_type, cta_text, cta_context, from_path } = params;
  dataLayer.push({
    event: "plan_cta_click",
    page_type,
    ...getPageContext(),
    cta_text,
    cta_context,
    destination,
    to_path: destination,
    ...(from_path ? { from_path } : {}),
  });
}

export function trackFormStart(params: Pick<AnalyticsParams, "selected_type" | "cta_source"> = {}): void {
  trackEvent("form_start", params);
}

export function trackFormSubmitAttempt(
  params: Pick<AnalyticsParams, "selected_type" | "cta_source" | "has_add_ons" | "add_on_count" | "has_dates">
): void {
  trackEvent("form_submit_attempt", params);
}

export function trackFormSubmitSuccess(
  params: Pick<AnalyticsParams, "selected_type" | "cta_source" | "has_add_ons" | "add_on_count" | "has_dates" | "status">
): void {
  trackEvent("form_submit_success", params);
}

export function trackFormError(
  params: Pick<AnalyticsParams, "selected_type" | "cta_source" | "error_type" | "status">
): void {
  trackEvent("form_error", params);
}

export function trackExperienceSelected(
  params: Pick<AnalyticsParams, "selected_type" | "cta_source" | "action">
): void {
  trackEvent("experience_selected", params);
}

export function trackAddOnSelected(
  params: Pick<AnalyticsParams, "add_on_name" | "action" | "selected_count" | "selected_type" | "cta_source">
): void {
  trackEvent("add_on_selected", params);
}

export function trackPageView(params: Pick<AnalyticsParams, "page_path" | "page_location" | "page_title">): void {
  trackEvent("page_view", params);
}

