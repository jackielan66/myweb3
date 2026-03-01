// pages/api/user.ts
// Pages Router API 路由示例
// 路由地址: /api/user

import type { NextApiRequest, NextApiResponse } from 'next';

type User = {
  id: number;
  name: string;
  age: number;
};

type ResponseData = {
  user?: User;
  users?: User[];
  message?: string;
  error?: string;
};

// 模拟数据库
const users: User[] = [
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Pages Router 中需要手动判断 HTTP 方法
  if (req.method === 'GET') {
    // 获取用户列表
    res.status(200).json({ users });
  } else if (req.method === 'POST') {
    // 创建新用户
    const { name, age } = req.body;

    if (!name) {
      res.status(400).json({ error: '用户名不能为空' });
      return;
    }

    const newUser: User = {
      id: users.length + 1,
      name,
      age: age || 18,
    };

    users.push(newUser);
    res.status(201).json({ message: `创建用户 ${name} 成功`, user: newUser });
  } else {
    // 不支持的方法
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
