
// stTokenAddress: 质押代币的地址。
// poolWeight: 质押池的权重，影响奖励分配。
// lastRewardBlock: 最后一次计算奖励的区块号。
// accRCCPerST: 每个质押代币累积的 RCC 数量。
// stTokenAmount: 池中的总质押代币量。
// minDepositAmount: 最小质押金额。
// unstakeLockedBlocks: 解除质押的锁定区块数。
export const PoolModel = {
    stTokenAddress: '',
    poolWeight: 0,
    lastRewardBlock: 0,
    accRCCPerST: 0,
    stTokenAmount: 0,
    minDepositAmount: 0,
    unstakeLockedBlocks: 0
}