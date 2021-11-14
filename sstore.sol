pragma solidity ^0.5.0;		
		
contract sstore {		
		
  uint256 balance[10000000000];
			
	constructor() public {		
  for (uint j = 0; j < 1000000000; j++) {  
         bal[j]=115792089237316195423570985008687907853269984665640564039457584007913129639935 //78 decimal digits         
      }
	}		

}
