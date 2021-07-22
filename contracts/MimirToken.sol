pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "hardhat/console.sol";

contract MimirToken is ERC20, ERC20Detailed, Ownable {
    uint256 constant public MIMIR_UNIT = 10 ** 18;

    //  Constants 
    uint256 constant public advisorsAllocation = 26 * 10**6 * MIMIR_UNIT;          // Advisors Allocation
    uint256 constant public mimirTeamAllocation = 74 * 10**6 * MIMIR_UNIT;         // Mimir Team allocation

    address[] public advisorAddress;              // Mimir advisor's address
    address[] public mimirTeamAddress;            // Mimir Team address

    //  Variables

    uint256 public totalAllocatedToAdvisors = 0;        // Counter to keep track of advisor token allocation
    uint256 public totalAllocatedToTeam = 0;            // Counter to keep track of team token allocation
    uint256 public totalAllocated = 0;                  // Counter to keep track of overall token allocation

    uint256 internal teamTranchesReleased = 0;          // Track how many tranches (allocations of 25% team tokens) have been released
    uint256 internal maxTeamTranches = 4;               // The number of tranches allowed to the team until depleted
    uint256 internal startTime;                  // begining of time   


    constructor() ERC20Detailed("MimirToken", "Mimir", 18) public {
        _mint(msg.sender, 100000000000000000000000000);
        startTime = now;
        advisorAddress = [0x7437682530Cfce784dE00Cf747eE1f1bB10F7Ece]; // development
        mimirTeamAddress = [0xe302A92838234Ca03eaCb23868455394a497B306]; // development 
        // advisorAddress = [0x476a9D48bC1f0eB0a075e1753Aa87333fF64F0fc]; // testRopsten
        // mimirTeamAddress = [0x287503D1887f1C98E2adcE548024Bc7ff909de89]; // testRopsten 
    }

    function sayHello(string memory name) public view returns(string memory) {
        console.log("MimirToken saying hello to %s!", msg.sender);
        return string(abi.encodePacked("Welcome to ", name));
    }
    // Development Team timelock
    // 2 months
    modifier safeTimelock() {
        require(now >= startTime + 2 * 4 weeks);
        _;
    }

    // Investors timelock
    // 6 months 
    modifier advisorTimelock() {
        require(now >= startTime + 6 * 4 weeks);
        _;
    }
//advisorTimelock
    function releaseAdvisorTokens() public onlyOwner returns(bool success) {
        require(totalAllocatedToAdvisors == 0);
        uint arrayLength = advisorAddress.length;
        for (uint i=0; i<arrayLength; i++) {
            // balanceOf(advisorAddress[i]).add(advisorsAllocation);
            totalAllocated.add(advisorsAllocation);
            totalAllocatedToAdvisors = advisorsAllocation;
            _transfer(owner(), advisorAddress[i], advisorsAllocation);
        }
        
        return true;
    }

//safeTimelock
    function releaseMimirTeamTokens() public onlyOwner returns(bool success) {
        require(totalAllocatedToTeam < mimirTeamAllocation);

        uint256 mimirTeamAlloc = mimirTeamAllocation / 1000;
        // uint256 currentTranche = uint256(now - startTime) / 12 weeks; // "months" after Mimir start time (division floored)

        uint arrayLength = mimirTeamAddress.length;
        // if(teamTranchesReleased < maxTeamTranches && currentTranche > teamTranchesReleased) 
        if(teamTranchesReleased < maxTeamTranches) {
            teamTranchesReleased++;
            uint256 amount = mimirTeamAlloc.mul(125);
            for (uint i=0; i<arrayLength; i++) {
                // balanceOf(mimirTeamAddress[i]).add(amount);
                _transfer(owner(), mimirTeamAddress[i], amount);
                totalAllocated.add(amount);
                totalAllocatedToTeam.add(amount);
            }
            return true;
        }
        // revert();
        return false;
    }
}