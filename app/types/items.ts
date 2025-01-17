export interface Item {
    id: number
    title: string
    description: string
    imageUrl: string
  redirectUrl: string
}
    
  export const items: Item[] = [
    {
      id: 1,
      title: "100++ Ide Produk Digital & cara Jualnya",
      description: "Temukan lebih dari 100 ide produk digital dan pelajari cara menjualnya dengan efektif.",
    imageUrl: "/favicon.png",
    redirectUrl: "https://www.google.com"
    },
    {
      id: 2,
      title: "Produk Digital Siap Jual",
      description: "Jual produk digital siap pakai dengan mudah dan cepat.",
    imageUrl: "/favicon.png",
    redirectUrl: "https://www.youtube.com"
    }
]