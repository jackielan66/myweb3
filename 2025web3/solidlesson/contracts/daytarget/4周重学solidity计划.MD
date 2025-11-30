- 1  执行测试命令 
 npx hardhat test test/daytarget/WeekOne.test


```
 📚 1. 核心概念
✔ require(condition, "message")
用于校验输入、权限、余额等
条件失败 → refund gas + revert
✔ revert("message")
主动触发错误
用于复杂逻辑，如 if...else 中
✔ assert(condition)
仅用于内部逻辑不可能失败的情况
失败意味着代码有 bug
会消耗 所有 gas（非常严格）
```