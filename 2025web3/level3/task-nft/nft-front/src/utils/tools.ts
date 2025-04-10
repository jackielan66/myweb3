import dayjs from 'dayjs'

const nftImages = [
    "https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?w=500&auto=format",
    "https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?w=500&auto=format",
    "https://i.seadn.io/gcs/files/c6cb0b1d6f2ab61c0efacf00e62e2230.jpg?w=500&auto=format",
    "https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?w=500&auto=format",
    "https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?w=500&auto=format",
    "https://i.seadn.io/gae/yIm-M5-BpSDdTEIJRt5D6xphizhIdozXjqSITgK4phWq7MmAU3qE7Nw7POGCiPGyhtJ3ZFP8iJ29TFl-RLcGBWX5qI4-ZcnCPcsY4zI?w=500&auto=format",
    "https://i.seadn.io/gae/6X867ZmCsuYcjHpx-nmNkXeHaDFd2m-EDEEkExVLKETphkfcrpRJOyzFxRQlc-29J0e-9mB9uDGze0O9yracSA9ibnQm2sIq5i2Yuw?w=500&auto=format",
    "https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?w=500&auto=format",
    "https://ipfs.io/ipfs/QmSgvgwxZGaBLqkGyWemEDqikCqU52XxsYLKtdy3vGZ8uq",
    "https://i.seadn.io/s/raw/files/f3564ef33373939b024fb791f21ec37b.png?auto=format&dpr=1&w=100",
    "https://i.seadn.io/gcs/files/b9cc6a3368e7e6e243fc9433f3024b52.png?auto=format&dpr=1&w=100",
    "https://i2.seadn.io/ethereum/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/5a6248b5c4124f57fe6ed70da8fff5/cf5a6248b5c4124f57fe6ed70da8fff5.png?w=100",
    "https://i.seadn.io/gae/tlmoxN7phyuRcGZLqb8NIHrHHS2M2ceQF8IhqZu7pXFQp2HyYbAh4zViNfQudoBAWaWk3JSBK24rpy6WgUJGmjd92w?auto=format&dpr=1&w=100",
    "https://i2.seadn.io/ethereum/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/423558aec7b17453cf02482a2ce52b/fc423558aec7b17453cf02482a2ce52b.png?w=100"
];

export function getRandomNftImage(tokenId:bigint | string ): string {
    const randomIndex =   Number(tokenId) % (nftImages.length) ;
    return nftImages[randomIndex];
}


// 生成随机钱包地址头像的函数
export function getRandomAvatarUrl(): string {
    const services = [
        // Ethereum Blockies
        (addr: string) => `https://eth-blockies.herokuapp.com/${addr}.png`,
        // Dicebear Pixel Art
        (addr: string) => `https://api.dicebear.com/6.x/pixel-art/svg?seed=${addr}`,
        // Dicebear Avatars
        (addr: string) => `https://api.dicebear.com/6.x/avataaars/svg?seed=${addr}`,
    ];

    // 生成随机的钱包地址
    const randomAddr = '0x' + Array.from({ length: 40 }, () =>
        Math.floor(Math.random() * 16).toString(16)).join('');

    // 随机选择一个服务
    const randomService = services[Math.floor(Math.random() * services.length)];

    return randomService(randomAddr);
}

export function formatDate(value: string | number | bigint | Date, format = "YYYY-MM-DD HH:mm:ss") {
    if (!value) return "";
    if (typeof value === "bigint") {
        value = Number(value);
        if (value < 10000000000) {
            value *= 1000;
        }
    }
    return dayjs(value).format(format);
}