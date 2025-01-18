import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react"; // Import ReactNode untuk tipe children
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Super Digital",
  description: "Penyedia Digital Produk Terbaik",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* adnsene */}
        <meta name="google-adsense-account" content="ca-pub-8454337513998618" />
        {/* Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="Bpbd97x6bEmRhL87NrY9gNq2WsNksvGHyQNJHiQqWPQ"
        />
        {/* Facebook Pixel Script */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '977374340971729');
            fbq('track', 'PageView');
            fbq('track', 'ViewContent');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=977374340971729&ev=PageView&noscript=1"
          />
        </noscript>
        {/* Meta Tags gtm google */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-KJ654KV9');
  `}
        </Script>

        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HP58H3LY8Q"></Script>
        <Script id="gtag-init" strategy="afterInteractive">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-HP58H3LY8Q');
  `}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8454337513998618"
          crossOrigin="anonymous"
          strategy="afterInteractive" // Strategi loading untuk script
        />
        <body className={inter.className}>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-KJ654KV9"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}></iframe>
          </noscript>

          {children}
        </body>
      </head>
    </html>
  );
}
