'use server';

import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: FormData) {
    const userId = formData.get('userId');
    // Simulate a database update delay
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log(`[Server] Updating profile for user: ${userId}`);

    // 演示 On-Demand Revalidation：更新数据后刷新页面缓存
    revalidatePath('/server-actions-trap');

    // In a real attack, this would update the wrong user's data!
    return { success: true, message: `Updated user ${userId}` };
}
