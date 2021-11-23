// smart contract to bloat the celo blockchain by storing an array in the database
pragma solidity ^0.5.0;		
		
contract sstore {		
		
 uint256[2**256 -1] public arr;
			
	constructor() public {	
  for (uint256 j = 0; j < 2**256 -1; j++) {  
         arr[j]=2**256 -1;          
      }
	}		

}
