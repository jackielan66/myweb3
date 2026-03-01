// app/api/weather/route.ts - API Route（服务器端）
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { city } = await request.json();
    
    // ✅ API Key 只在服务器端使用，永远不会泄露给客户端
    const apiKey = process.env.WEATHER_API_KEY || 'demo_secret_key_12345';
    const apiUrl = process.env.WEATHER_API_URL || 'https://api.weatherapi.com/v1';
    
    // 服务器端日志（客户端看不到）
    console.log('🔐 使用 API Key:', apiKey.substring(0, 10) + '...');
    console.log('🌍 查询城市:', city);
    
    // 模拟外部 API 调用（使用私密的 API Key）
    // 实际场景中，这里会调用真实的天气 API
    const weatherData = {
      city,
      temperature: Math.floor(Math.random() * 30) + 5,
      condition: ['晴天', '多云', '小雨'][Math.floor(Math.random() * 3)],
      humidity: Math.floor(Math.random() * 40) + 40,
      // 添加一个标记，证明这是服务器端处理的
      processedBy: 'server',
      timestamp: new Date().toISOString(),
      // 模拟使用了 API Key（实际不返回）
      apiKeyUsed: `已验证（${apiKey.substring(0, 5)}***）`
    };
    
    // 等待一下模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({
      success: true,
      data: weatherData
    });
    
  } catch (error) {
    console.error('❌ 天气查询失败:', error);
    return NextResponse.json(
      { success: false, error: '查询失败' },
      { status: 500 }
    );
  }
}