// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract voter{

    mapping (address=>mapping (uint=>bool)) public votes;
    mapping (uint=>uint)public voteCount;
    mapping (address=>bool) public hasVoted;
    mapping (string=>uint) public candidateList;

    string[] public candidateRegisterName;
    mapping(uint=>bool) public idExist;


    function addCandidate(string memory nameCandidate,uint candidateId) public {
        require(!idExist[candidateId],"Already Exists");
        candidateList[nameCandidate] = candidateId;
        idExist[candidateId] = true;
        candidateRegisterName.push(nameCandidate);
    }

    function showCandidateList() public view returns (string[] memory,uint[] memory){
        uint length = candidateRegisterName.length;
        uint[] memory idx = new uint[](length);
        for(uint i=0;i<length;i++){
            idx[i] = candidateList[candidateRegisterName[i]];
        }
        return (candidateRegisterName,idx);
    }

    function vote(uint pollId) public{
        require(!votes[msg.sender][pollId],"Has Already Vote");
        require(!hasVoted[msg.sender],"You can't vote multiple times");
        votes[msg.sender][pollId] = true;
        hasVoted[msg.sender]=true;
        voteCount[pollId]++;
    }

    function voteCount_Particular(uint pollId)public view returns(uint){
        return voteCount[pollId];
    }
    
}