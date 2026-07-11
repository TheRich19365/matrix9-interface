import { appVersion } from "./appVersion.js";

const supportSubject = "แจ้งปัญหาการใช้งาน Matrix 9";
const supportBody = [
  "สวัสดีครับ Win Soul of Love",
  "",
  "ฉันพบปัญหาในการใช้งาน Matrix 9",
  "",
  appVersion.productName,
  `Version: ${appVersion.version}`,
  "",
  "App Version:",
  appVersion.version,
  "",
  "รายละเอียดปัญหา:",
  "-",
  "",
  "อุปกรณ์หรือเบราว์เซอร์ที่ใช้:",
  "-",
  "",
  "ขั้นตอนที่ทำก่อนพบปัญหา:",
  "-",
  "",
  "ขอบคุณครับ/ค่ะ"
].join("\n");

function buildMailto(address, params = {}) {
  const query = Object.entries(params)
    .filter(([, value]) => value)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
  return `mailto:${address}${query ? `?${query}` : ""}`;
}

const emailAddress = "Souloflove19365@gmail.com";

export const contactLinks = {
  lineOa: {
    id: "@514wppkc",
    addFriendUrl: "https://line.me/R/ti/p/%40514wppkc",
    label: "LINE Official",
    enabled: true
  },
  email: {
    address: emailAddress,
    mailto: buildMailto(emailAddress),
    supportMailto: buildMailto(emailAddress, {
      subject: supportSubject,
      body: supportBody
    }),
    label: "Email",
    enabled: true
  },
  portfolio: {
    url: "https://win-soul-of-love-portfolio-hub.vercel.app",
    label: "Portfolio Hub",
    enabled: true
  },
  dailyEnergy: {
    url: "https://soul-of-love-daily-energy.vercel.app",
    label: "Daily Energy",
    enabled: true
  },
  thaiWisdom: {
    url: "https://soul-of-love-daily-energy.vercel.app/thai-wisdom",
    label: "ฤกษ์ดี",
    enabled: true
  },
  youtube: {
    url: "https://www.youtube.com/@SourceSignalMusic",
    label: "YouTube Music",
    enabled: true
  },
  suno: {
    url: "https://suno.com/@souloflove6395",
    label: "Suno Music",
    enabled: true
  },
  facebook: {
    url: "https://www.facebook.com/share/1D1UK69eAk/",
    label: "Facebook",
    enabled: true
  },
  instagram: {
    url: "https://www.instagram.com/souloflove19365",
    label: "Instagram",
    handle: "@souloflove19365",
    enabled: true
  },
  tiktok: {
    url: "REPLACE_WITH_TIKTOK_URL",
    label: "TikTok",
    handle: "",
    enabled: false
  },
  logo: {
    src: "/soul-of-love-logo.png",
    label: "Soul of Love logo"
  }
};

export function isConfiguredUrl(url) {
  return Boolean(url && !String(url).startsWith("REPLACE_WITH_") && /^https?:\/\//.test(url));
}

export function isEnabledLink(item) {
  return Boolean(item?.enabled && isConfiguredUrl(item.url));
}

export function isConfiguredEmail(address = contactLinks.email.address) {
  return Boolean(contactLinks.email.enabled && address && !String(address).startsWith("REPLACE_WITH_") && address.includes("@"));
}
