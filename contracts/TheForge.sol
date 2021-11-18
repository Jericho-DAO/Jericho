// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./VerifySignature.sol";

contract TheForge is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, Ownable, ERC721Burnable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    
    string _URI = "https://gateway.pinata.cloud/ipfs/QmWoaBpmunVsVMqVXBos62f2YTTTV4V9EE2cfvVaL3aNRR";
    
    //Import external contract to verify signature
    address public AddressVS;
    
    function _setAddressVerifySignature(address _AddressVS) public {
        AddressVS = _AddressVS;
    }
    
    function callVerify(address _signer, address _to, bytes memory signature) public view returns (bool){
        require(AddressVS != address(0));
        VerifySignature vs = VerifySignature(AddressVS);
        return vs.verify(_signer, _to, signature);
    }
    
    // Mapping from address to Anvil ID
    mapping(address => uint256) private _ownersAnvil;
    
    // Mapping from address to Hammer ID
    mapping(address => uint256) private _ownersHammer;
    
    // Mapping from address to Invite Score, if 0 then the user cannot invite more people
    mapping(address => uint256) private _inviteScore;

    constructor() ERC721("TheForgeHammer", "TFH") {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, address invintingAddress, bytes memory invitationSignature) public {
        
        //Check that the invitation was indeed created by the invintingAddress and that the address 'to' is the invitee by comparing these inputs to the signature
        require(callVerify(invintingAddress, to, invitationSignature));

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _URI);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
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
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
