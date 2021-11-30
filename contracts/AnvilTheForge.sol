// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./ERC2981ContractWideRoyalties.sol";

contract TheForge_Anvil is
    ERC721,
    ERC721URIStorage,
    ERC2981ContractWideRoyalties,
    Pausable,
    AccessControl,
    ERC721Burnable
{
    using Counters for Counters.Counter;

    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    Counters.Counter private _tokenIdCounter;

    string internal URI = "ar://mjmZl24IPQWDCkAPOxfezdvmBf3Jo5v5oT_xhFCnI-0";

    constructor() ERC721("The Forge - Anvil", "TFA") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(PAUSER_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _setupRole(BURNER_ROLE, msg.sender);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function setNewURI(string memory uri) public onlyRole(MINTER_ROLE) {
        URI = uri;
        
        for(uint256 i = 0; i < _tokenIdCounter.current(); i++) {
            _setTokenURI(i, uri);
        }
    }

    // @notice Allows to set the royalties on the contract
    // @param recipient the royalties recipient
    // @param value royalties value (between 0 and 10000)
    function setRoyalties(address recipient, uint256 value) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _setRoyalties(recipient, value);
    }

    function safeMintBatch(address[] memory accounts) public onlyRole(MINTER_ROLE) {
        for(uint256 i = 0; i < accounts.length; i++) {
            _safeMint(accounts[i]);
        }
    }


    function _safeMint(address to) internal onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, URI);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    function forcedBurn(uint tokenId) public onlyRole(BURNER_ROLE) {
        _burn(tokenId);
    }
 
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC2981ContractWideRoyalties, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
