const connectBtn = document.querySelector('#connectBtn')
const noteArea = document.querySelector('#note');


const MMSDK = new MetaMaskSDK.MetaMaskSDK({
    dappMetadata: {
        name: "Real Estate Rental Platform",
    },
    infuraAPIKey: '563a1906d51f46b4b6cc3012ef766cc3',
});


function isMetamaskInstalled() {
    if (typeof window.ethereum !== "undefined") {
        noteArea.textContent = "MetaMask installed" ;
    } else {
        noteArea.innerHTML = `<p>Metamask is not installed <a href ='https://metamask.io/download/'> Install </a>`
    }
}
isMetamaskInstalled();


// Connect wallet
async function connectWallet() {
    const provider = MMSDK.getProvider();
    try {
      // Disable button while request is pending
      document.getElementById("connectBtn").disabled = true;
      
      const accounts = await provider.request({ 
        method: "eth_requestAccounts" 
      });
      
      const account = accounts[0];
      
      // Update UI
      document.getElementById("address").textContent = `${account}`;
    } catch (err) {
      if (err.code === 4001) {
        console.log("User rejected connection");
      } else {
        console.error(err);
      }
    } finally {
      document.getElementById("connectBtn").disabled = false;
    }
  }


//! DARK MODE
const modeBtn = document.querySelector('#light')
modeBtn.addEventListener('click', ()=> {
    if(modeBtn.textContent == 'Light') {
        document.querySelector('.main').classList.add('active');
        modeBtn.textContent = 'Dark'
        modeBtn.style.backgroundColor = 'black'
    }else {
        document.querySelector('.main').classList.remove('active');
        modeBtn.textContent = 'Light'
        modeBtn.style.backgroundColor = 'cadetblue'
    }
})
