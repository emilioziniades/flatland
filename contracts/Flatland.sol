pragma solidity >=0.6.0 <0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Flatland is ERC721 {

  using SafeMath for uint256;

  constructor() ERC721("Flatland", "FLATLAND") public {
  }

  event NewSquare(uint squareId, string color);

  uint maxLength = 256;
  uint maxSquares = maxLength ** 2;

  struct Square {
    string colour;
  }

  string[] public squares;

  mapping(uint => bool) _squareExists;
  mapping (uint => address) public squareToOwner;
  mapping (address => uint) public ownerSquareCount;
  mapping (uint => string) squareColour;

  function mint(string memory _colour) public canvasHasSpace ownsNoSquares {

    // No one should own more than one square
    require(ownerSquareCount[msg.sender] == 0, 'Each address may only own one square');

    squares.push(_colour);
    uint id = squares.length;
    squareToOwner[id] = msg.sender;
    ownerSquareCount[msg.sender].add(1);
    _squareExists[id] = true;


    //safeMint function from Open Zeppelin ERC721. It
    // * checks if token _exists
    // * updates _holderTokens and _tokenOwners (used by _exists)
    // * Emits a Transfer event
    _safeMint(msg.sender, id);

    emit NewSquare(id, _colour);
  }

  function changeColour(uint _id, string memory _newColour) public OnlyOwner(_id) {
    squares[_id - 1] = _newColour;
  }

function getMaxSupply() public view returns(uint) {
  return maxSquares;
}

function getOwnerSquareCount(address _owner) public view returns(uint) {
  return ownerSquareCount[_owner];
}

  modifier canvasHasSpace {
      require(squares.length < maxSquares);
      _;
  }
  modifier ownsNoSquares {
      require(ownerSquareCount[msg.sender] == 0);
      _;
  }

  modifier OnlyOwner (uint _id) {
    require(msg.sender == squareToOwner[_id]);
    _;
  }

}