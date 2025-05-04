// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    string public name;
    string public description;
    uint256 public goal;
    uint256 public deadline;
    address public owner;
    bool public paused;

    struct Tier {
        string name;
        uint256 amount; // 修正了空格问题
        uint256 backers;
    }

    struct Backer {
        uint256 totalContribution;
        mapping(uint256 => bool) fundedTiers;
    }

    enum CampaignState {Active,Successful,Failed}
    CampaignState public state;

    Tier[] public tiers;
    mapping(address=>Backer) public backers;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can do that.");
        _;
    }

    modifier campaignOpen(){
        require(state == CampaignState.Active, "Campaign was not open.");
        _;
    }

    modifier isNotPaused(){
        require(!paused,"Campaign is paused.");
        _;
    }
    
    constructor(
        address _owner,
        string memory _name,
        string memory _description,
        uint256 _goal,
        uint256 _durationInDays
    ) {
        name = _name;
        description = _description;
        goal = _goal;
        deadline = block.timestamp + (_durationInDays * 1 days);
        owner = _owner;
        state = CampaignState.Active;
    }

    function addTier(string memory _name, uint256 _amount) public onlyOwner {
        require(_amount > 0, "_amount can not be 0.");
        tiers.push(Tier({name: _name, amount: _amount, backers: 0}));
    }

    function removeTier(uint256 _tierIndex) public onlyOwner {
        require(_tierIndex < tiers.length, "Index out of bounds");
        tiers[_tierIndex] = tiers[tiers.length - 1];
        tiers.pop();
    }

    function checkAndUpdateCampaignState() internal  {
        if (state == CampaignState.Active ) {
            if(block.timestamp>deadline ){
                state = address(this).balance >= goal ? CampaignState.Successful :CampaignState.Failed;
            }else {
                state = address(this).balance >= goal ? CampaignState.Successful :CampaignState.Active;
            }
        }
    }

    function fund(uint256 _tierIndex) public payable campaignOpen isNotPaused{
        // require(block.timestamp < deadline, "Campaign has ended.");
        require(
            _tierIndex < tiers.length,
            "_index is greater than the tier length"
        );
        require(msg.value == tiers[_tierIndex].amount, "ether must equal tier's amount");
        tiers[_tierIndex].backers++;
        backers[msg.sender].totalContribution += msg.value;
        backers[msg.sender].fundedTiers[_tierIndex] = true;
        checkAndUpdateCampaignState();
    }

    function withdraw() public onlyOwner{
        checkAndUpdateCampaignState();
        require(state==CampaignState.Successful,"Campaign not successful");
        uint256 balance = address(this).balance;
        require(balance>0,"Balance must greater that zero");
        payable(owner).transfer(balance);
    }

    function getRemainingTime() public view returns (uint256) {
        if (block.timestamp >= deadline) return 0;
        return deadline - block.timestamp;
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function refund() public {
        checkAndUpdateCampaignState();
        require(state == CampaignState.Failed, "Campaign not Failed.");
        uint256 amount = backers[msg.sender].totalContribution;
        require(amount>0,"there is no contribution.");

        backers[msg.sender].totalContribution= 0;
        payable(msg.sender).transfer(amount);
    }

    function hasFundedTier(address _backerAddress, uint256 _tierIndex) public view returns(bool) {
        return backers[_backerAddress].fundedTiers[_tierIndex];
    }

    function getTiers() public view returns (Tier[] memory ){
        return tiers;
    }

    function togglePause() public  onlyOwner {
        paused = !paused;
    }

    function getCampainStatus() public view returns(CampaignState){
        if(state == CampaignState.Active && block.timestamp >= deadline){
            return address(this).balance>=goal ? CampaignState.Successful :CampaignState.Failed;
        }
        return state;
    }

    function extendDeadline(uint256 _daysToAdd) public onlyOwner campaignOpen {
        deadline += _daysToAdd * 1 days;
    }
}
