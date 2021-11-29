// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

import './ERC2981ContractWideRoyalties.sol';

contract TheForge is
    ERC1155,
    ERC2981ContractWideRoyalties,
    AccessControl,
    Pausable,
    ERC1155Burnable
{
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    
    mapping(address => uint) private invitation;

    constructor()
        ERC1155("ipfs://QmWoaBpmunVsVMqVXBos62f2YTTTV4V9EE2cfvVaL3aNRR")
    {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(URI_SETTER_ROLE, msg.sender);
        _setupRole(PAUSER_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
    }

    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }
    
    // @notice Allows to set the royalties on the contract
    // @param recipient the royalties recipient
    // @param value royalties value (between 0 and 10000)
    function setRoyalties(address recipient, uint256 value) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _setRoyalties(recipient, value);
    }
    
    function hasInvite(address account) public view returns (uint) {
        return invitation[account];
    }
    function addInvite(address[] memory accounts, uint256[] memory amounts)
        public
        onlyRole(MINTER_ROLE)
    {
        require(accounts.length == amounts.length, "Input error - accounts and amounts length mismatch");
        
        for(uint256 i = 0; i < accounts.length; i++) {
            invitation[accounts[i]] += amounts[i];
        }
    }
    
    function resetInvite(address[] memory accounts) public onlyRole(MINTER_ROLE) {
        for(uint256 i = 0; i < accounts.length; i++) {
            invitation[accounts[i]] = 0;
        }
    }
    
    function mint(address invitee) public {
        require(invitation[msg.sender] > 0, "No available invitation");
        
        invitation[msg.sender]--;
        _mint(invitee, 0, 1, "");
    }

    function forceMint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyRole(MINTER_ROLE)
    {
        _mint(account, id, amount, data);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    )
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, ERC2981ContractWideRoyalties, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
