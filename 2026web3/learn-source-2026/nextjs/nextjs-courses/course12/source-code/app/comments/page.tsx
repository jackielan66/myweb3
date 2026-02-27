import { CommentForm } from '@/components/CommentForm';

export const metadata = {
  title: '评论演示 - Next.js Course',
};

export default function CommentPage() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">发表评论</h2>
      <CommentForm />
    </div>
  );
}