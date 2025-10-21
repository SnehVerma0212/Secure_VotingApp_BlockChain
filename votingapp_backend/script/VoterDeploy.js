

async function main(){
    const Voter = await ethers.getContractFactory("voter");
    const voter = await Voter.deploy();
    // await voter .deployed();
    console.log("Voter Contact Address:",voter.address);
    console.log(voter.target);
}

main().catch((error)=>{
    console.error(error);
    process.exitCode = 1;
});