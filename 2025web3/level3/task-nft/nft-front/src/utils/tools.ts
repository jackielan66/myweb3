import dayjs from 'dayjs'

const nftImages = [
    "https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?w=500&auto=format",
    "https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?w=500&auto=format",
    "https://i.seadn.io/gcs/files/c6cb0b1d6f2ab61c0efacf00e62e2230.jpg?w=500&auto=format",
    "https://i.seadn.io/gcs/files/a8a2c681f0437294a88d4fd4cd161a0d.png?w=500&auto=format",
    "https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?w=500&auto=format",
    "https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?w=500&auto=format",
    "https://i.seadn.io/gae/yIm-M5-BpSDdTEIJRt5D6xphizhIdozXjqSITgK4phWq7MmAU3qE7Nw7POGCiPGyhtJ3ZFP8iJ29TFl-RLcGBWX5qI4-ZcnCPcsY4zI?w=500&auto=format",
    "https://i.seadn.io/gae/PHxWz47uWRKHGnUBk-CkWZdUiE6kzX_sgvQN1YKBn45qZbI3Dj3RXwwh-9Xb2xlwqkEUF9_o-ySm_uqEICe0v-nfE3mQB3skjENYXA?w=500&auto=format",
    "https://i.seadn.io/gae/6X867ZmCsuYcjHpx-nmNkXeHaDFd2m-EDEEkExVLKETphkfcrpRJOyzFxRQlc-29J0e-9mB9uDGze0O9yracSA9ibnQm2sIq5i2Yuw?w=500&auto=format",
    "https://i.seadn.io/gae/d784iHHbqQFVH1XYD6HoT4u3y_Fsu_9FZUltWjnOzoYv7qqB5dLUqpGyHBd8Gq3h4mykK5PtkYzdGGoryWJaiFzGyx0_cWbwwE_W?w=500&auto=format",
    "https://i.seadn.io/gae/8g0poMCQ5J9SZHMsQ3VD3C_8zoXzMJThmm0AwA11RuKGS4lqXPzrZlqKVUZ5PzhWS_GqLTOFoZLgXq6XTVQUqkz1XPq6AmwLd9Wz?w=500&auto=format",
    "https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?w=500&auto=format",
    "https://i.seadn.io/gae/obxP_zMXHWA8qZK4GkdD3HGQGLXJGXfs6GPbHCXxeqQWcjVEfqMoaix7dY7uUc8yHGQA4iBIKZpsTIxv0qEQqtYYxHdBCHe6_qhY?w=500&auto=format",
    "https://i.seadn.io/gae/9EPP0IGrMUgR8FgFd-RTo4epMm55JUEOVaUvGY9CKQM9J47Ni6OxOTbQKeDwS_8BXo5IKL4H_Q0tZ8pK2UsE1eEpyVB6_T_GvgD9=w600",
    "https://i.seadn.io/gae/KbTJGEK-dRFtvh56IY6AaWFqJJylvCjYqjMJKF8ymx4iWzU8lYS3nMXoHHHVE1Zqb8QWGRJz3qB9uPcBDJMv-vqpUs7GS-qjRANj?w=500&auto=format",
    "https://i.seadn.io/gae/UA7blhz93Jk8BwqDf6EX6Rc8teS_T5KGGXz9p8XkI6u8oQhh4WkHrPKqQqQd7E3nPTvZ-_uFX_WTLKgiDHd6MuuUQb_J2OHE4Iqn?w=500&auto=format",
    "https://i.seadn.io/gae/6ev2GVLx3BDJq89890xrLuoS6kNT7H0C_cC5-Tg4uBM0PSvKGkqIxF0K1E0fS9kJey9B5AGFnQwU3e9HzJ75f-Z0hpRVL-O-mQlZ?w=500&auto=format",
    "https://i.seadn.io/gae/ZWEV7BBCrHlVe8nOh0ySo5uZQxqwMTZ7_GQu0cLrGQWcHJTGx2cEyZyQHf7j_KhxZMsBxnKhc_UDmFV-VUG0bBLM3rqYTGddGhFS?w=500&auto=format",
    "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhvDpyXIP17hRUS7ZJT31O5ieZKXs1Y?w=500&auto=format",
];

export function getRandomNftImage(): string {
    const randomIndex = Math.floor(Math.random() * nftImages.length);
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

export function formatDate(value: string | number, format = "YYYY-MM-DD HH:mm:ss") {
    if (!value) return "";
    return dayjs(value).format(format);
}