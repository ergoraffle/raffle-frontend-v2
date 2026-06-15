# Terms of Service — ErgoRaffle V2

**Last Updated:** June 13, 2026
**Version:** 1.1.0

**In plain language (summary — not a substitute for the full Terms below):**
- ErgoRaffle V2 is **free, open-source software** (released under the **MIT License**) running on the Ergo blockchain. Anyone can copy it and run their own version.
- It is **non-custodial**: we never hold your funds. Your assets sit in smart contracts you interact with directly from your own wallet.
- The official **ergoraffle.com deployment charges a protocol fee (currently 5% of the funds raised by a successful raffle)**. Paying it does **not** buy any warranty, guarantee, or support promise — everything is provided strictly **"as is."**
- **You are fully responsible** for everything you do: creating a raffle, donating, adding a gift, refunds, and claims. Use it only if it's legal where you are.
- **Refunds on a failed raffle are automatic.** If an automatic refund doesn't arrive, reach out through our official support channel.
- Blockchain transactions are **permanent and cannot be reversed** by anyone, including us.
- **A protocol token may be introduced in the future.** Nothing here is an offer of any token, or any promise of profit, fee share, or return.
- **Disputes:** the Protocol is designed to sit outside any court's jurisdiction. If a court takes a case anyway, disputes go to individual arbitration in Singapore — no class actions.

Welcome to ErgoRaffle V2 (the **"Platform"**). The Platform is a decentralized, non-custodial, smart-contract protocol deployed on the Ergo Blockchain that enables multi-winner raffles, multiple prize types, and dynamic gift donations.

These Terms of Service (the **"Terms"**) form a binding agreement between you (**"you"**, **"your"**, or **"User"**) and the contributors who develop and maintain the ErgoRaffle V2 interface and open-source code (the **"Operators"**, **"we"**, **"us"**).

**By accessing the Platform, connecting a non-custodial wallet, or signing any on-chain transaction that creates a raffle, buys a ticket (donates), adds a gift, claims a refund, or claims funds or rewards, you confirm that you have read, understood, and agree to be bound by these Terms.** Where the Interface presents an "I agree" checkbox or equivalent at wallet connection, you accept these Terms by selecting it. If you do not agree, you must immediately stop using the Platform.



## 1. Definitions

* **Ergo Blockchain** — the public, decentralized Ergo network on which the protocol's smart contracts are deployed.
* **Smart Contracts / Protocol** — the open-source contract set that governs all raffle logic, available at the [ErgoRaffle V2 repository](https://github.com/ErgoRaffle/raffle-v2) and its contracts package.
* **Interface** — the web front-end at ergoraffle.com and any related client used to construct transactions for the Protocol.
* **Raffle Creator** — a User who creates a raffle and sets its parameters.
* **Participant / Donor** — a User who buys tickets in (donates to) a raffle.
* **Gift Donor** — a User who adds a gift (ERG, tokens, or NFTs) to one or more winning positions of an existing raffle.
* **Tickets** — Ticket tokens minted per raffle that represent a Participant's mathematically verifiable share in the draw; they are burned when the raffle concludes.
* **Collecting Token** — the asset in which a raffle's funding goal is denominated (ERG or a chosen token).
* **Creation Fee** — a small refundable deposit paid by a Raffle Creator when creating a raffle, as an anti-spam / anti-fraud measure; it is refunded to the creator if the raffle succeeds and collected by the protocol if it fails (Section 5.1).
* **Protocol Fee** — the percentage share of the funds raised by a *successful* raffle that is collected and distributed to UI implementers and the protocol (Section 6). Formerly referred to as the "service fee."



## 2. Nature of the Platform

* **Decentralized and non-custodial.** The Platform is a passive interface to open-source smart contracts. The Operators do not hold, custody, manage, transmit, or clear any User funds at any time. All assets are locked in smart-contract boxes governed entirely by Ergo consensus rules.
* **No control over the Protocol.** Once deployed, the Smart Contracts execute autonomously. The Operators have no administrative key, backdoor, multi-signature override, or any other technical means to seize, freeze, reverse, redirect, or return assets, or to alter the outcome of any raffle.
* **The only Operator capability is display-level.** The Operators' sole capability over the Platform is to include or exclude a raffle from the Interface's display. This is a presentation filter only; it does not stop, alter, freeze, censor, or otherwise affect any raffle on-chain, and any raffle remains fully accessible to anyone interacting directly with the smart contracts.
* **Interface only.** We may modify, suspend, or discontinue the Interface at any time. Because the Protocol lives on-chain, raffles may remain operable directly through the contracts even if the Interface is unavailable. We do not guarantee continuous availability of the Interface.
* **Open source and forkable.** The Protocol is public and independently verifiable. The smart-contract Protocol and the official Interface are both released under the **MIT License**: any person may copy, modify, and run their own independent deployment of the smart contracts and/or interface, subject to that license. Such independent deployments are operated by whoever runs them and are **not** us, not endorsed by us, and not our responsibility. These Terms concern the official deployment reachable at ergoraffle.com.
* **Protocol fee.** The official ergoraffle.com deployment charges an automated, on-chain protocol fee on successful raffles (see Section 6). The fee is collected and distributed by the smart contracts; it does not make the contributors a custodian, broker, escrow, fiduciary, or guarantor, and does not create any warranty, support obligation, or liability. See Sections 11, 12, and 15.



## 3. Eligibility & Compliance

* **Age.** You must be at least 18 years old, or the age of majority in your jurisdiction, whichever is higher.
* **Jurisdiction.** You are solely responsible for ensuring that creating or participating in on-chain raffles, lotteries, prize draws, or crowdfunding is lawful where you reside or act. You must not use the Platform if doing so violates any applicable lottery, gambling, securities, anti-money-laundering, sanctions, or promotional laws.
* **No restricted persons.** You represent that you are not located in, organized under the laws of, or ordinarily resident in any jurisdiction subject to comprehensive sanctions, and that you are not a person with whom dealings are prohibited under applicable sanctions programs (a **"Restricted Person"**).
* **Sanctions screening (Interface-level).** The official Interface may restrict access from comprehensively sanctioned or embargoed jurisdictions (for example, by IP-based geo-restriction). **This is an Interface-level measure only.** It does not, and technically cannot, affect the autonomous on-chain Protocol, which remains permissionlessly accessible to anyone interacting directly with the smart contracts. The Operators have no ability to restrict, monitor, or condition access at the protocol level. Regardless of any such measure, you represent that you are not a Restricted Person and remain solely responsible for your own compliance.
* **Your own risk.** You interact with the Protocol, with any raffle, and with any other User entirely at your own financial, legal, and tax risk.



## 4. Independence of Raffle Creators and Other Users

* **No endorsement.** The Operators do not create, curate, control, vet, or endorse any raffle. The presence of a raffle in the Interface is not approval or validation of it or its creator.
* **No verification.** We make no representation as to the identity, legitimacy, solvency, honesty, or regulatory compliance of any Raffle Creator, Participant, or Gift Donor.
* **Creator obligations are their own.** Any prize, reward, token delivery, real-world utility, or promise made by a Raffle Creator is solely that creator's obligation. The Operators have no ability and no duty to compel performance, and bear no liability for a creator's acts, omissions, fraud, misrepresentation, or non-delivery.



## 5. The Raffle Lifecycle

By using the Platform you acknowledge and accept the algorithmic, irreversible behavior of the Protocol across each of the following actions. Raffle parameters — Collecting Token, funding goal, ticket price, number of winners, distribution shares, and deadline — are committed on-chain and are **immutable** once set.

### 5.1 Creating a Raffle
* A Raffle Creator initiates a raffle by paying the **Creation Fee** — a small refundable deposit that acts as an anti-spam / anti-fraud measure — and setting the raffle parameters. Creation occurs on-chain via token issuance and merge into an active raffle box, and mints the raffle's Ticket tokens.
* **Creation Fee handling.** If the raffle succeeds, the Creation Fee is refunded to the creator. If the raffle fails, the Creation Fee is collected by the protocol according to the contract parameters. You accept this outcome in advance. The Creation Fee is separate from the Protocol Fee (Section 6), which applies only to successful raffles.
* Once committed, raffle parameters cannot be edited, paused, cancelled, or deleted by anyone, including the creator and the Operators.

### 5.2 Donating (Buying Tickets)
* Buying a ticket contributes the ticket price toward the raffle's funding goal and mints Ticket tokens to your wallet representing your share in the draw. Contributed funds are locked in the active raffle box until the deadline.
* Ticket purchases are final at confirmation. The Operators cannot reverse them.

### 5.3 Adding a Gift
* Any User may add a gift (ERG, tokens, or NFTs) designated for one or more winning positions of an active raffle. Gift Donors are tracked on-chain via Gift tokens.
* Once contributed and confirmed, a gift is bound to the raffle's smart-contract lifecycle and is governed solely by Sections 5.5 (success) and 5.6 (failure).

### 5.4 Immutability of Contributions
Once any transaction under 5.1–5.3 is confirmed, the assets are locked in the relevant smart-contract box. The Operators cannot extract, reverse, or return them. Your sole rights are those the Protocol grants on success or failure.

### 5.5 Successful Raffle (Goal Met by Deadline)
* If the funding goal is reached on or before the deadline, the raffle succeeds. Overfunding before the deadline is permitted where the contract allows it.
* The **Protocol Fee** (Section 6) is deducted from the funds raised and distributed automatically by the contracts, and the creator's **Creation Fee** is refunded.
* **Collected funds** (net of the Protocol Fee) are made available to the Raffle Creator.
* **Winners** are selected automatically by an on-chain lottery from among ticket holders, and become entitled to their reward share plus any gifts assigned to their winning position.
* Distribution and claiming are performed on-chain. Where the Protocol requires the creator, a winner, or a donor to submit a claim transaction, **that person is solely responsible for initiating it.** The Operators cannot push, automate, or guarantee any payout, and have no claim over assets once distributed.

### 5.6 Failed Raffle (Goal Not Met by Deadline)
* If the goal is not met by the deadline, the raffle fails.
* **Refunds are automatic.** The Protocol returns ticket contributions to Participants and gifts to Gift Donors, and handles the Creation Fee per Section 5.1, through the contracts' automated refund mechanism. No manual claim is normally required.
* **If an automatic refund does not arrive,** you may contact us through the official support channel(s) published on ergoraffle.com. We will make reasonable, good-faith efforts to assist. Such support is provided as a courtesy only, on a best-effort basis, with no obligation, deadline, warranty, or liability, and does not give us any ability to override, bypass, or accelerate the on-chain contracts.
* Refund timing and execution are determined solely by the Protocol and the state of the Ergo network.



## 6. Fees, Network Costs, and Taxes

* **Protocol fee.** The official ergoraffle.com deployment applies a protocol fee, **currently 5%**, charged only on **successful** raffles as a share of the funds raised, and collected and distributed automatically by the smart contracts. The fee rate may change; the rate in effect for a raffle is the one encoded on-chain for that raffle. By transacting you agree to the applicable fee.
* **Distribution of the protocol fee.** The protocol fee is distributed automatically by the smart contracts to **UI implementers** (parties who deploy or integrate an interface to the Protocol) and to the **ErgoRaffle development team**, as encoded in the contract parameters.
* **Future token (informational; not an offer).** The Operators anticipate introducing a protocol token to which a portion of the protocol fee may in future be directed. Any such token, and any distribution to holders, **will be governed by separate token terms and risk disclosures published at that time.** Nothing in these Terms is an offer, solicitation, or promise to issue any token or to confer any right to fees, revenue, profit, or return, and you must not transact in reliance on any future token.
* **Creation Fee.** The Creation Fee is a separate, small refundable deposit paid by the Raffle Creator as an anti-spam / anti-fraud measure, handled as described in Section 5.1 (refunded on success; collected by the protocol on failure). It is not the Protocol Fee.
* **The fee buys no guarantee.** Notwithstanding any fee you pay, the Platform, Interface, and Protocol are provided strictly **"as is"** (Sections 11–12). The fee is not consideration for any warranty, guarantee, service level, uptime, support obligation, fiduciary duty, or assumption of liability, and does not entitle you to any refund of the fee itself.
* **Network fees.** All transactions also require Ergo network and miner fees that you must pay. We are not liable for transactions that fail, are delayed, or miss a raffle window due to insufficient fees, network congestion, or wallet error.
* **No tax advice.** Contributions on a decentralized protocol may not qualify as charitable or tax-deductible in your jurisdiction. You are solely responsible for determining, reporting, and paying any taxes (including income, capital-gains, or other) arising from your use of the Platform. Nothing here is tax, legal, financial, or investment advice.



## 7. Prohibited Assets and Conduct

You must not, and must not attempt to:
* contribute or distribute assets that constitute or derive from illegal activity, money laundering, sanctions evasion, or mixers used for those purposes;
* use the Platform for any asset that represents a security, equity, debt, or other regulated financial instrument where doing so would be unlawful in your jurisdiction;
* exploit, attack, overload, or interfere with the Protocol, Interface, or other Users, or attempt to bypass these Terms or applicable law;
* use the Platform to defraud, deceive, or harm any other person.



## 8. User Content

When creating or describing a raffle, you may submit text, titles, links, and media (such as images or logos).
* **Prohibited content.** You must not upload or transmit content that contains sensitive personal data (financial, medical, or identifying), explicit or adult material, material that infringes intellectual-property or privacy rights, defamatory content, or content that incites violence or illegal activity.
* **Your responsibility.** You are solely and exclusively liable for all content you submit. We do not pre-screen, monitor, endorse, or edit User content, but may remove content from the Interface at our discretion.
* **Indemnity for content.** You agree to indemnify and hold the Operators harmless from any claim, loss, or damage arising from content you submit.



## 9. Cross-Chain Transactions (e.g., BTC and Runes)

The Interface may support payments originating from other networks (such as Bitcoin or Runes) via background watchers and proxy-box mechanisms.
* Cross-network confirmations may introduce processing delays or synchronization mismatches.
* The Operators are not responsible for losses arising from external-network congestion, incorrect addresses, oracle or watcher failures, or any third-party bridging or proxy-box architecture.



## 10. Assumption of Blockchain Risk

You acknowledge and accept that:
* **Smart contracts carry risk.** Even open-source, audited contracts may contain bugs, vulnerabilities, or economic attack vectors. You accept all financial risk from Protocol behavior or exploits.
* **Transactions are irreversible.** Mistaken transfers, wrong parameters, lost keys, or compromised seed phrases cannot be recovered by the Operators.
* **Networks change.** Hard forks or changes to the underlying Ergo protocol may disrupt or alter active raffles.
* **Asset volatility.** The value of ERG, tokens, and NFTs may fluctuate or fall to zero.



## 11. No Warranties

THE PLATFORM, INTERFACE, AND PROTOCOL ARE PROVIDED **"AS IS"** AND **"AS AVAILABLE,"** WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, SECURE, ACCURATE, OR ERROR-FREE.



## 12. Limitation of Liability

TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL THE OPERATORS, DEVELOPERS, OR CONTRIBUTORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, FUNDS, DATA, GOODWILL, OR ASSETS, ARISING FROM OR RELATED TO:
1. your use of, or inability to use, the Interface or the Protocol;
2. any unauthorized access to or use of your wallet, keys, or transactions;
3. smart-contract bugs, exploits, oracle, watcher, or bridge failures;
4. the acts, omissions, fraud, or breach of any Raffle Creator, Participant, Gift Donor, or other third party;
5. the success, failure, draw outcome, or non-delivery of any raffle.

TO THE EXTENT A LIABILITY CANNOT BE EXCLUDED, THE OPERATORS' TOTAL AGGREGATE LIABILITY WILL NOT EXCEED THE GREATER OF THE FEES (IF ANY) YOU PAID TO THE OPERATORS, OR USD 100.



## 13. Indemnification

You agree to indemnify, defend, and hold harmless the Operators and contributors from any claim, demand, loss, liability, or expense (including reasonable legal fees) arising from your use of the Platform, your content, your violation of these Terms, or your violation of any law or third-party right.



## 14. Privacy

The Operators do not custody funds and do not require accounts. Blockchain transactions are public and permanent by nature; wallet addresses and on-chain activity are visible to anyone. Any limited data processed by the Interface is handled as described in the **ErgoRaffle V2 Privacy Notice (v1.1.0)**. You are responsible for protecting your own keys and wallet.



## 15. Free Software, No Operator, and Sole User Responsibility

* **Free, open-source software.** ErgoRaffle V2 is published as free, open-source software (under the MIT License) and as a set of autonomous smart contracts deployed on a permissionless, decentralized blockchain. The code is freely available, and any person may run their own independent deployment (Section 2).
* **A fee does not change the "as is" nature.** The official ergoraffle.com deployment charges an automated on-chain protocol fee (Section 6) as a convenience for using the published interface and contracts. **This fee does not buy, and must not be understood as, any warranty, guarantee, service level, support commitment, or assumption of liability of any kind.** Everything remains provided "as is" and at the User's sole risk regardless of any fee paid.
* **Non-custodial; no intermediary role.** The contributors are not a custodian, escrow, broker, exchange, money-services business, or financial intermediary, and do not hold, control, or have access to User funds. The smart contracts run autonomously; once deployed, the contributors cannot stop, pause, censor, reverse, or alter the Protocol or any transaction or outcome.
* **No submission to any jurisdiction.** The contributors do not, by publishing this software, submit to the jurisdiction of, or assume regulatory obligations under, the laws of any particular country or territory. The software is global and not directed at any specific jurisdiction.
* **Sole user responsibility.** Every use of the software — creating a raffle, donating, adding a gift, claiming a refund, or claiming funds or rewards — is the sole and exclusive responsibility of the User who initiates it. By using the Protocol you accept full and exclusive accountability for your own use, for compliance with all laws that apply to you, and for all consequences of your actions. You agree that the contributors bear no responsibility or liability for how any person uses the software.
* **Disputes between Users.** Any dispute relating to a raffle is solely between the Users involved (for example, between a Participant and a Raffle Creator). The contributors are not a party to, and have no role in resolving, such disputes.
* **Reality of legal process.** The contributors cannot prevent any court or authority from asserting its own jurisdiction. Where a court nonetheless applies its own law to these Terms, the disclaimers, "as is" provision, and limitations and exclusions of liability in these Terms apply to the fullest extent that law permits, and the remainder of these Terms continues in force. The fallback in Section 16 then applies.



## 16. Governing Law & Dispute Resolution

The Operators intend that disputes arising from autonomous on-chain activity are not subject to any court's jurisdiction, consistent with Section 15. **To the extent — and only to the extent — that a court, tribunal, or authority asserts jurisdiction over a dispute between you and the Operators notwithstanding Section 15:**

* **(a) Governing law.** These Terms and any such dispute are governed by the laws of **Singapore**, without regard to conflict-of-laws rules.
* **(b) Binding arbitration.** The dispute shall be referred to and finally resolved by binding arbitration administered by the **Singapore International Arbitration Centre (SIAC)** in accordance with the SIAC Rules then in force. The **seat of arbitration is Singapore**, the language is English, and the tribunal shall consist of a sole arbitrator.
* **(c) Class-action waiver.** All disputes are resolved only on an **individual basis**. You and the Operators waive any right to bring or participate in any class, collective, consolidated, or representative action, and the arbitrator may not consolidate more than one person's claims or preside over any representative or class proceeding.
* **(d) No general consent to jurisdiction.** Invoking or enforcing this Section does **not** constitute consent by the Operators to the jurisdiction of any court for any other purpose, and does not waive Section 15. This Section is severable; if the class-action waiver is held unenforceable as to any claim, that claim shall proceed in court, but the remainder of this Section continues to apply.
* **(e) Mandatory consumer rights.** Nothing in this Section deprives you of the protection of mandatory provisions of consumer-protection law that apply to you and cannot be derogated from by agreement.



## 17. Severability & Waiver

If any provision of these Terms is held invalid or unenforceable, the remaining provisions remain in full force, and the invalid provision will be enforced to the maximum extent permitted. Our failure to enforce any provision is not a waiver of it.



## 18. Amendments

We may update these Terms at any time by posting the revised version to the Interface or the code repository, with an updated "Last Updated" date. Material changes take effect when posted. Your continued use of the Platform after changes constitutes acceptance of the revised Terms.



## 19. Entire Agreement

These Terms constitute the entire agreement between you and the Operators regarding the Platform and supersede any prior Agreement.



*ErgoRaffle V2 is open-source software. These Terms are not, and do not substitute for, legal advice for your jurisdiction.*
