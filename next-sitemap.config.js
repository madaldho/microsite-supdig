/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: 'https://ini.kacamatacuan.web.id', // Ganti dengan URL utama Anda
    generateRobotsTxt: true, // Membuat robots.txt otomatis
    sitemapSize: 5000, // Maksimal jumlah URL per file sitemap
    exclude: [], // Halaman yang tidak ingin di-index, kosongkan jika tidak ada
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*', // Semua user agent (Googlebot, Bingbot, dll)
          allow: '/', // Mengizinkan semua halaman
        },
      ],
    },
  };
  
  module.exports = config;
  