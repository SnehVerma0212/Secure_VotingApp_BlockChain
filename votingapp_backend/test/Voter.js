const {ethers} = require("hardhat");
const {expect} = require("chai");

describe("Single Voter Acceptance Test Cases",() =>{
    let Voter;
    let voter;
    let address;

    beforeEach(async()=>{
        Voter = await ethers.getContractFactory("voter");
        voter = await Voter.deploy();
        address = await ethers.getSigners();
    });
    
    it("Voter Registration",async ()=>{
        await voter.addCandidate("Paras",1);
        const [name,id] = await voter.showCandidateList();
        expect(await name[0]).to.equal("Paras");
        expect(await id[0].toNumber?id[0].toNumber():id[0]).to.equal(1);
    });

    it("Duplicate Voter Registration",async ()=>{
        await voter.addCandidate("Paras",1);
        await expect(voter.addCandidate("Alice",1)).to.
        be.revertedWith("Already Exists");
    });

    it("Voter Voting",async()=>{
        await voter.addCandidate("Paras",1);
        await voter.addCandidate("Alice",2);
        await voter.addCandidate("Bob",3);

        await voter.connect(address[1]).vote(1); // here .vote(1) is the poll id
        await voter.connect(address[2]).vote(1);
        await voter.connect(address[3]).vote(1);

        const count = await voter.voteCount_Particular(1);
        expect(count).to.equal(3);
    });

    it("Multiple Times User Voting", async()=>{
        await voter.addCandidate("Paras",1);
        await voter.connect(address[1]).vote(1);
        await expect(voter.connect(address[1]).vote(1)).to.be.revertedWith("Has Already Vote");
    });

    it("Dulpicate User Voting", async()=>{
        await voter.addCandidate("Paras",1);
        await voter.connect(address[1]).vote(1);
        expect(voter.connect(address[1]).vote(2)).to
        .be.revertedWith("You can't vote multiple times");
    });
});

describe("Multiple Voter Acceptance Test Cases",()=>{
    let Voter;
    let voter;
    let address;

    beforeEach(async()=>{
        Voter = await ethers.getContractFactory("voter");
        voter = await Voter.deploy();
        address = await ethers.getSigners();
    });

    it("Multiple Voter Registration",async ()=>{
        await voter.addCandidate("Paras",1);
        await voter.addCandidate("Alice",2);
        await voter.addCandidate("Bob",3);
        const [name,id] = await voter.showCandidateList();
        expect(await name[0]).to.equal("Paras");
        expect(await id[0].toNumber?id[0].toNumber():id[0]).to.equal(1);
        expect(await name[1]).to.equal("Alice");
        expect(await id[1].toNumber?id[1].toNumber():id[1]).to.equal(2);
        expect(await name[2]).to.equal("Bob");
        expect(await id[2].toNumber?id[2].toNumber():id[2]).to.equal(3);
    });

    it("Multiple Voter Voting",async()=>{
        await voter.addCandidate("Paras",1);
        await voter.addCandidate("Alice",2);
        await voter.addCandidate("Bob",3);
        await voter.connect(address[1]).vote(1); // here .vote(1) is the poll id
        await voter.connect(address[2]).vote(2);
        await voter.connect(address[3]).vote(3);
        const count1 = await voter.voteCount_Particular(1);
        const count2 = await voter.voteCount_Particular(2);
        const count3 = await voter.voteCount_Particular(3);
        expect(count1).to.equal(1);
        expect(count2).to.equal(1);
        expect(count3).to.equal(1);
    });

    it("Mutiple Voter Duplicate Registration",async ()=>{
        await voter.addCandidate("Paras",1);
        await voter.addCandidate("Alice",2);
        await expect(voter.addCandidate("Bob",2)).to.
        be.revertedWith("Already Exists");
    });


    it("Multiple Times User Voting", async()=>{
        await voter.addCandidate("Paras",1);
        await voter.addCandidate("Alice",2);
        await voter.addCandidate("Bob",3);
        await voter.connect(address[1]).vote(1);
        await expect(voter.connect(address[1]).vote(1)).to.be.revertedWith("Has Already Vote");
    });
    it("Dulpicate User Voting", async()=>{
        await voter.addCandidate("Paras",1);
        await voter.addCandidate("Alice",2);
        await voter.addCandidate("Bob",3);
        await voter.connect(address[1]).vote(1);
        await expect(voter.connect(address[1]).vote(2)).to
        .be.revertedWith("You can't vote multiple times");
    });
});