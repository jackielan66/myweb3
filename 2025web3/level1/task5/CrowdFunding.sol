// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/**
 * 需求分析
 * 众筹合约分为两种角色：一个是受益人，一个是资助者。
 * // 两种角色:
//      受益人   beneficiary => address         => address 类型
//      资助者   funders     => address:amount  => mapping 类型 或者 struct 类型
 * 
 * 
 * 状态变量按照众筹的业务：
// 状态变量
//      筹资目标数量    fundingGoal
//      当前募集数量    fundingAmount
//      资助者列表      funders
//      资助者人数      fundersKey

需要部署时候传入的数据:
//      受益人
//      筹资目标数量
 */

contract CrowdFunding{
    // 收益人
    address immutable beneficiary;
    // 筹资目标数量
    uint256 immutable fundingGoal;

    // 当前已经弄到的金额
    uint256 fundingAmount;

      // 可迭代的映射
    mapping(address=>bool) private fundersInserted;

    // 资助者
    mapping (address => uint256) funders;

    address[] fundersKey;
    

   constructor(address beneficOwn,uint256 targetNum){
        beneficiary = beneficOwn;
        fundingGoal = targetNum;
   }

   function contribute() external payable{
         // 检查捐赠金额是否会超过目标金额
        uint256 potentialFundingAmount = fundingAmount + msg.value;
        uint256 refundAmount = 0;

     
        if (potentialFundingAmount > fundingGoal) {
            refundAmount = potentialFundingAmount - fundingGoal;
            funders[msg.sender] += (msg.value - refundAmount);
            fundingAmount += (msg.value - refundAmount);
        } else {
            funders[msg.sender] += msg.value;
            fundingAmount += msg.value;
        }

        // 更新捐赠者信息
        if (!fundersInserted[msg.sender]) {
            fundersInserted[msg.sender] = true;
            fundersKey.push(msg.sender);
        }

        // 退还多余的金额
        if (refundAmount > 0) {
            payable(msg.sender).transfer(refundAmount);
        }
       

   }

       // 关闭
    function close() external returns(bool){
        // 1.检查
        if(fundingAmount<fundingGoal){
            return false;
        }
        uint256 amount = fundingAmount;
        // 2.修改
        fundingAmount = 0;
        // AVAILABLED = false;
        // 3. 操作
        payable(beneficiary).transfer(amount);
        return true;
    }
    function fundersLenght() public view returns(uint256){
        return fundersKey.length;
    }
}