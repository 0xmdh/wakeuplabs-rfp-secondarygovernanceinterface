# zkSync Governance UI • WakeUp Labs
<https://zkgov.wakeuplabs.io> 

**⚠️ Functional demo — mock data only (no on-chain calls)**  
Submission asset for the **“Secondary Governance Interface” RFP**  
<https://forum.zknation.io/t/rfp-secondary-governance-interface/702>

> This repository hosts a lightweight **UI prototype** that illustrates the intended look-and-feel
> and user flows (dashboard, delegate directory, proposal list, vote modal).  
> **All blockchain interactions are stubbed / simulated** – the app does *not* submit transactions
> to zkSync testnet or mainnet.  
> Its sole purpose is to give the zkSync Governance reviewers a concrete sense of the UX we will
> deliver in the full on-chain product.



## ✨ Prototype Highlights

| Module | What you can see in this demo |
|--------|--------------------------------|
| **Dashboard** | Static totals and mock proposal counters to show layout. |
| **Delegates** | ENS-style name search, profile cards, “Delegate” button (simulated). |
| **Proposals** | Mock list with filters (Active / Passed). “Vote” modal opens but signs nothing. |
| **Wallet overlay** | Connect button opens WalletConnect / MetaMask UI, but votes/delegations are prevented with a toast “stub action”. |
| **Responsive design** | Fully responsive; test on mobile viewport. |
| **Dark / Light themes** | Toggle in navbar (stores preference in localStorage). |


