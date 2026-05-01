export const config = {
  runtime: "edge", // حیاتی: برای جلوگیری از شناسایی توسط فایروال Node.js ورسل
};

const TARGET_BASE = (process.env.DATA_API_TEST || "").replace(/\/$/, "");
const MAX_CONCURRENT = 20; // محدودیت برای جلوگیری از مشکوک شدن ورسل
let activeRequests = 0;

const STRIP_HEADERS = new Set([
  "host", "connection", "proxy-connection", "keep-alive", "via", "forwarded",
  "x-forwarded-for", "x-forwarded-proto", "x-forwarded-host", "x-real-ip",
  "cf-ray", "cf-connecting-ip", "x-vercel-id", "x-vercel-proxy-signature"
]);

export default async function handler(req) {
  // ۱. بررسی ظرفیت (Slot Management)
  if (activeRequests >= MAX_CONCURRENT) {
    return new Response("Busy", { status: 503 });
  }

  // ۲. استتار و فریب (Deception Layer)
  const url = new URL(req.url);
  if (url.pathname === "/" || url.pathname === "/favicon.ico") {
    return new Response("<html><body><h1>System Status: OK</h1></body></html>", {
      status: 200, headers: { "content-type": "text/html" }
    });
  }

  activeRequests++;
  try {
    const targetUrl = TARGET_BASE + url.pathname + url.search;
    
    // ۳. کپی امن هدرها (فقط هدرهای استاندارد)
    const newHeaders = new Headers();
    for (const [key, value] of req.headers) {
      const lowKey = key.toLowerCase();
      if (!STRIP_HEADERS.has(lowKey) && !lowKey.startsWith("x-vercel-")) {
        newHeaders.set(key, value);
      }
    }

    // ۴. جعل اثر انگشت مرورگر
    newHeaders.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0.0.0");

    const fetchOpts = {
      method: req.method,
      headers: newHeaders,
      redirect: "manual",
    };

    if (req.method !== "GET" && req.method !== "HEAD") {
      fetchOpts.body = req.body;
      fetchOpts.duplex = "half";
    }

    // ۵. اجرای تونل در سطح لبه (Native Edge Fetch)
    const upstream = await fetch(targetUrl, fetchOpts);

    const responseHeaders = new Headers();
    for (const [key, value] of upstream.headers) {
      const lowKey = key.toLowerCase();
      if (!STRIP_HEADERS.has(lowKey) && !lowKey.startsWith("x-vercel-") && lowKey !== "server") {
        responseHeaders.set(key, value);
      }
    }

    // ۶. جلوگیری از شناسایی توسط مانیتورینگ ترافیک
    responseHeaders.set("X-Accel-Buffering", "no");
    responseHeaders.set("Cache-Control", "no-store, no-cache, must-revalidate");

    return new Response(upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });

  } catch (err) {
    return new Response("Error", { status: 502 });
  } finally {
    activeRequests--;
  }
}
