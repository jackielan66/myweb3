# CrowdfundingFactory 合约 API 文档

## 合约概述

`CrowdfundingFactory` 是一个用于创建和管理众筹项目的工厂合约。用户可以通过该合约创建新的众筹项目，并查询自己创建的项目以及所有项目的列表。

## 链相关信息

rpc: https://bsc-testnet-rpc.publicnode.com
chainID: 97

_合约地址_
0xcd2BD08AD6396A30d06bc8ED185Cc4Cf0eE8066B

## 合约状态变量

- `owner` (address): 工厂合约的所有者。
- `paused` (bool): 工厂合约是否暂停。
- `campaigns` (Campaign[]): 所有创建的众筹项目。
- `userCampaigns` (mapping(address => Campaign[])): 每个用户创建的众筹项目。

## 结构体

### Campaign

- `campaignAddress` (address): 众筹项目合约地址。
- `owner` (address): 众筹项目所有者地址。
- `name` (string): 众筹项目的名称。
- `creationTime` (uint256): 众筹项目的创建时间（Unix 时间戳）。

## 方法

### createCampaign

```solidity
function createCampaign(
    string memory _name,
    string memory _description,
    uint256 _goal,
    uint256 _durationInDays
) external notPaused
```

创建一个新的众筹项目。

- `_name` (string): 众筹项目的名称。
- `_description` (string): 众筹项目的描述。
- `_goal` (uint256): 众筹目标金额。
- `_durationInDays` (uint256): 众筹持续时间（天数）。

### getUserCampaigns

```solidity
function getUserCampaigns(address _user) external view returns (Campaign[] memory)
```

获取用户创建的所有众筹项目。

- `_user` (address): 用户地址。

### getAllCampaigns

```solidity
function getAllCampaigns() external view returns (Campaign[] memory)
```

获取所有创建的众筹项目。

### togglePause

```solidity
function togglePause() external onlyOwner
```

暂停或恢复工厂合约。
