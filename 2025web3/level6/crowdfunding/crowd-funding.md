# Crowdfunding 合约 API 文档

## 合约概述

`Crowdfunding` 用户可以通过该合约创建众筹项目，设定目标金额和截止日期，并允许用户资助不同的资助级别。合约所有者可以在众筹成功后提取资金，众筹失败时资助者可以获得退款。

## 合约状态变量

- `name` (string): 众筹项目的名称。
- `description` (string): 众筹项目的描述。
- `goal` (uint256): 众筹目标金额。
- `deadline` (uint256): 众筹截止日期（Unix 时间戳）。
- `owner` (address): 合约所有者地址。
- `paused` (bool): 合约是否暂停。
- `state` (CampaignState): 众筹状态（`Active`, `Successful`, `Failed`）。

## 枚举

### CampaignState

- `Active`: 众筹进行中。
- `Successful`: 众筹成功。
- `Failed`: 众筹失败。

## 结构体

### Tier

- `name` (string): 资助级别的名称。
- `amount` (uint256): 资助金额。
- `backers` (uint256): 资助者数量。

### Backer

- `totalContribution` (uint256): 资助者的总资助金额。
- `fundedTiers` (mapping(uint256 => bool)): 资助者已资助的级别。

## 方法

### fund

```solidity
function fund(uint256 _tierIndex) public payable campaignOpen notPaused
```

资助特定级别。

- `_tierIndex` (uint256): 资助级别的索引。

### addTier

```solidity
function addTier(string memory _name, uint256 _amount) public onlyOwner
```

添加新的资助级别。

- `_name` (string): 资助级别的名称。
- `_amount` (uint256): 资助金额。

### removeTier

```solidity
function removeTier(uint256 _index) public onlyOwner
```

移除指定的资助级别。

- `_index` (uint256): 资助级别的索引。

### withdraw

```solidity
function withdraw() public onlyOwner
```

合约所有者提取众筹资金。

### getContractBalance

```solidity
function getContractBalance() public view returns (uint256)
```

查看合约余额。

### refund

```solidity
function refund() public
```

在众筹失败时为资助者退款。

### hasFundedTier

```solidity
function hasFundedTier(address _backer, uint256 _tierIndex) public view returns (bool)
```

检查资助者是否资助了特定级别。

- `_backer` (address): 资助者地址。
- `_tierIndex` (uint256): 资助级别的索引。

### getTiers

```solidity
function getTiers() public view returns (Tier[] memory)
```

获取所有资助级别。

### togglePause

```solidity
function togglePause() public onlyOwner
```

暂停或恢复合约。

### getCampaignStatus

```solidity
function getCampaignStatus() public view returns (CampaignState)
```

获取当前众筹状态。

### extendDeadline

```solidity
function extendDeadline(uint256 _daysToAdd) public onlyOwner campaignOpen
```

延长众筹截止日期。

- `_daysToAdd` (uint256): 要延长的天数。

## 事件

### Fund

```solidity
event Fund(address indexed backer, uint256 amount, uint256 tierIndex)
```

### Refund

```solidity
event Refund(address indexed backer, uint256 amount)
```

### Withdraw

```solidity
event Withdraw(address indexed owner, uint256 amount)
```

### TierAdded

```solidity
event TierAdded(string name, uint256 amount)
```

### TierRemoved

```solidity
event TierRemoved(uint256 index)
```
