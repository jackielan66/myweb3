// app/api/user/route.ts
// App Router API 路由示例（Route Handlers）
// 路由地址: /api/user

import { NextRequest, NextResponse } from 'next/server';

type User = {
  id: number;
  name: string;
  age: number;
};

// 模拟数据库
const users: User[] = [
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 },
];

// GET /api/user - 获取用户列表
// App Router 中直接导出 HTTP 方法函数，无需手动判断
export async function GET() {
  return NextResponse.json({ users });
}

// POST /api/user - 创建新用户
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, age } = body;

    if (!name) {
      return NextResponse.json(
        { error: '用户名不能为空' },
        { status: 400 }
      );
    }

    const newUser: User = {
      id: users.length + 1,
      name,
      age: age || 18,
    };

    users.push(newUser);

    return NextResponse.json(
      { message: `创建用户 ${name} 成功`, user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: '请求体解析失败' },
      { status: 400 }
    );
  }
}

// PUT /api/user - 更新用户（演示其他 HTTP 方法）
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, age } = body;

    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      );
    }

    users[userIndex] = { ...users[userIndex], name, age };

    return NextResponse.json({
      message: '更新成功',
      user: users[userIndex],
    });
  } catch (error) {
    return NextResponse.json(
      { error: '请求体解析失败' },
      { status: 400 }
    );
  }
}

// DELETE /api/user - 删除用户
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: '缺少用户 ID' },
      { status: 400 }
    );
  }

  const userIndex = users.findIndex((u) => u.id === Number(id));
  if (userIndex === -1) {
    return NextResponse.json(
      { error: '用户不存在' },
      { status: 404 }
    );
  }

  const deletedUser = users.splice(userIndex, 1)[0];

  return NextResponse.json({
    message: '删除成功',
    user: deletedUser,
  });
}
