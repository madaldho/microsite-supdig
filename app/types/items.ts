export interface Item {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  redictUrl?: string;
}
export const items: Item[] = [
  {
    id: 1,
    title: "Domain & Hosting",
    description: "Layanan domain dan hosting premium untuk website Anda",
    imageUrl:
      "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
    redictUrl: "https://www.google.com",
  },
  {
    id: 2,
    title: "Cloud Server",
    description: "Server cloud dengan performa tinggi dan uptime 99.9%",
    imageUrl:
      "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
    redictUrl: "https://www.google.com",
  },
  {
    id: 3,
    title: "SSL Certificate",
    description: "Sertifikat SSL untuk keamanan website Anda",
    imageUrl:
      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
    redictUrl: "https://www.google.com",
  },
  {
    id: 4,
    title: "Website Builder",
    description: "Buat website profesional dengan mudah",
    imageUrl:
      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
    redictUrl: "https://www.google.com",
  },
  {
    id: 12,
    title: "Mobile App Development",
    description: "Pengembangan aplikasi mobile untuk platform iOS dan Android",
    imageUrl:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
    redictUrl: "https://www.google.com",
  },
];
