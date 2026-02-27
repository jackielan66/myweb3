import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CommentForm from '@/components/CommentForm'
import userEvent from '@testing-library/user-event'

describe('CommentForm Component', () => {
    it('渲染输入框和按钮', () => {
        render(<CommentForm onSubmit={jest.fn()} />)
        expect(
            screen.getByPlaceholderText('写下你的评论...')
        ).toBeInTheDocument()
        
        expect(
            screen.getByRole('button', { name: '发布评论' })
        ).toBeInTheDocument()
    })

    it('用户提交评论后显示成功状态', async () => {
        const mockSubmit = jest.fn().mockResolvedValue({})
        render(<CommentForm onSubmit={mockSubmit} />)

        // 1. 模拟用户输入
        const input = screen.getByLabelText('comment-input')
        fireEvent.change(input, { target: { value: '这是一条测试评论' } })

        // 2. 点击提交
        const button = screen.getByRole('button', { name: '发布评论' })
        fireEvent.click(button)

        // 3. 验证“提交中”状态
        expect(screen.getByText('提交中...')).toBeInTheDocument()

        // 4. 等待异步完成，验证成功消息
        await waitFor(() => {
            expect(screen.getByText('评论发布成功！')).toBeInTheDocument()
        })

        // 5. 验证 mock 函数被调用
        expect(mockSubmit).toHaveBeenCalledWith('这是一条测试评论')
    })
})
