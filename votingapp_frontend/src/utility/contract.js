import {ethers} from 'ethers';
import {BASIC_CONTRACT_ABI} from '../config';

const CONTACT_ADDRESS = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';

export const getContract = async ()=>{
    if(!window.ethereum){
        return "Please install MetaMask!";
    }
    await window.ethereum.request({method: 'eth_requestAccounts'});
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contact = new ethers.Contract(
        CONTACT_ADDRESS,
        BASIC_CONTRACT_ABI,
        signer
    );
    return contact;
};