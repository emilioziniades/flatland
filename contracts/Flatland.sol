pragma solidity >=0.6.0 <0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Flatland is ERC721 {

  using SafeMath for uint256;

  constructor() ERC721("Flatland", "FLATLAND") public {
  }

  event NewSquare(uint256 squareId, uint256 color);

  uint256 maxLength = 16;
  uint256 maxSquares = maxLength ** 2;

  // Using 32 bit numbers instead of 256, to ensure smallest possible database size
  uint256[] public squares;

  // Mapping recording the existence of each square by ID
  mapping (uint256 => bool) _squareExists;

  // Mapping from square ID to owner address
  mapping (uint256 => address) public squareToOwner;

  // Mapping from owner address to square count
  mapping (address => uint256) public ownerSquareCount;


  // Note: ownsNoSquares modifier is omitted from this function for testing purposes
  function mint(uint256 _colour) public canvasHasSpace  {

    squares.push(_colour);
    uint256 id = squares.length;
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

  function changeColour(uint256 _id, uint256 _newColour) public OnlyOwner(_id) {
    squares[_id - 1] = _newColour;
  }

  function getSquares() public view returns(uint256[] memory) {
    return squares;
  }

  // Returns square IDs. IDs start at 1.
  function getSquaresIdsByOwner(address _owner) public view returns(uint256[] memory) {
    uint256[] memory result = new uint256[](balanceOf(_owner));
    uint counter = 0;
    for (uint i = 0; i < squares.length; i++) {
      if (ownerOf(i + 1) == _owner) {
        result[counter] = i + 1;
        counter++;
      }
    }
    return result;
  }

  function getSquareColoursFromIds(uint256[] memory _squareIds) public view returns (uint256[] memory) {
    uint256[] memory result = new uint256[](_squareIds.length);
    uint counter = 0;
    for (uint i = 0; i <_squareIds.length; i++) {
      uint squareId = _squareIds[i];
      uint squareColour = squares[squareId - 1];
      result[counter] = squareColour;
      counter++;
    }
    return result;
  }


function getMaxSupply() public view returns(uint) {
  return maxSquares;
}

function getOwnerSquareCount(address _owner) public view returns(uint256) {
  return balanceOf(_owner);
}

  modifier canvasHasSpace {
      require(squares.length < maxSquares);
      _;
  }
  modifier ownsNoSquares {
      require(balanceOf(msg.sender) < 1, 'Each account may only own one square');
      _;
  }

  modifier OnlyOwner (uint256 _id) {
    require(msg.sender == squareToOwner[_id]);
    _;
  }

}