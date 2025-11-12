// Simple miner demo - frontend only
let balance = 0;      // SWS user balance (simulated)
let pool = 50;        // pool that pays rewards (simulated)
let miners = 0;

const balanceEl = document.getElementById('balance');
const poolEl = document.getElementById('pool');
const minersEl = document.getElementById('miners');
const logEl = document.getElementById('log');

function render(){
  balanceEl.textContent = balance.toFixed(2);
  poolEl.textContent = pool.toFixed(2);
  minersEl.textContent = miners;
}

function addLog(txt){
  const time = new Date().toLocaleTimeString();
  logEl.innerHTML = `<div>[${time}] ${txt}</div>` + logEl.innerHTML;
}

// Mine by clicking
document.getElementById('mineBtn').addEventListener('click', () => {
  if(pool <= 0){
    addLog("Pool kosong. Tidak ada reward.");
    return;
  }
  const reward = Math.max(0.1, Math.min(1, pool * 0.01));
  pool -= reward;
  balance += reward;
  addLog(`Ditemukan: ${reward.toFixed(2)} SWS (dari pool)`);
  render();
});

// Buy miner
document.getElementById('buyMiner').addEventListener('click', () => {
  const cost = 10;
  if(balance < cost){
    addLog("Saldo kurang untuk membeli miner.");
    return;
  }
  balance -= cost;
  miners += 1;
  addLog("Miner dibeli. Akan menghasilkan sedikit tiap 5 detik.");
  render();
});

// Auto-miner loop
setInterval(() => {
  if(miners <= 0 || pool <= 0) return;
  const perMiner = Math.min(0.5, pool * 0.002);
  const total = perMiner * miners;
  if(total > pool) return;
  pool -= total;
  balance += total;
  if(total > 0) addLog(`${miners} miner menghasilkan ${total.toFixed(2)} SWS`);
  render();
}, 5000);

// Withdraw
document.getElementById('withdrawBtn').addEventListener('click', () => {
  if(balance <= 0){
    addLog("Tidak ada saldo untuk ditarik.");
    return;
  }
  addLog(`Withdraw: ${balance.toFixed(2)} SWS -> (simulasi kirim ke wallet)`);
  balance = 0;
  render();
});

// Wallet connect placeholder
document.getElementById('connectBtn').addEventListener('click', () => {
  addLog("Connect Wallet: fitur Web3 belum dihubungkan. (placeholder)");
  document.getElementById('walletAddr').textContent = "0x... (simulated)";
});

render();
