export interface Proposal {
  id: string
  title: string
  description: string
  status: "active" | "passed" | "failed" | "pending"
  type: "ZIP" | "TPP" | "GAP"
  votesFor: number
  votesAgainst: number
  totalVotes: number
  endTime: Date
  proposer: string
  created: Date
}

export interface Delegate {
  id: string
  address: string
  name: string
  ens?: string
  avatar?: string
  votingPower: number
  delegators: number
  proposalsVoted: number
  description: string
  badges: string[]
}

export const mockProposals: Proposal[] = [
  {
    id: "1",
    title: "ZIP-001: Increase Block Gas Limit",
    description:
      "Proposal to increase the block gas limit from 30M to 50M to improve transaction throughput on zkSync Era.",
    status: "active",
    type: "ZIP",
    votesFor: 2500000,
    votesAgainst: 150000,
    totalVotes: 2650000,
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    proposer: "0x742d35Cc6634C0532925a3b8D4C9db96590c6C87",
    created: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: "2",
    title: "TPP-005: Treasury Allocation for Developer Grants",
    description: "Allocate 10M ZK tokens from the treasury for a developer grant program to boost ecosystem growth.",
    status: "passed",
    type: "TPP",
    votesFor: 8500000,
    votesAgainst: 1200000,
    totalVotes: 9700000,
    endTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    proposer: "0x8ba1f109551bD432803012645Hac136c22C501e",
    created: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
  },
  {
    id: "3",
    title: "GAP-012: Governance Parameter Update",
    description: "Update voting period from 7 days to 5 days and reduce proposal threshold to 100K ZK tokens.",
    status: "pending",
    type: "GAP",
    votesFor: 0,
    votesAgainst: 0,
    totalVotes: 0,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    proposer: "0x9f2d04A4F1AE2B0D3A54B7B2C8E5F6A7B8C9D0E1",
    created: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
  },
]

export const mockDelegates: Delegate[] = [
  {
    id: "1",
    address: "0x742d35Cc6634C0532925a3b8D4C9db96590c6C87",
    name: "Alice Chen",
    ens: "alice.eth",
    votingPower: 2500000,
    delegators: 1250,
    proposalsVoted: 45,
    description: "Core contributor to zkSync ecosystem with focus on scalability and developer experience.",
    badges: ["Core Contributor", "Top Voter", "Community Leader"],
  },
  {
    id: "2",
    address: "0x8ba1f109551bD432803012645Hac136c22C501e",
    name: "Bob Martinez",
    ens: "bob.zksync.eth",
    votingPower: 1800000,
    delegators: 890,
    proposalsVoted: 38,
    description: "DeFi protocol founder and zkSync advocate. Focused on treasury management and protocol upgrades.",
    badges: ["DeFi Expert", "Protocol Founder"],
  },
  {
    id: "3",
    address: "0x9f2d04A4F1AE2B0D3A54B7B2C8E5F6A7B8C9D0E1",
    name: "Carol Thompson",
    ens: "carol.eth",
    votingPower: 1200000,
    delegators: 567,
    proposalsVoted: 42,
    description: "Security researcher and governance enthusiast. Specializes in protocol security and risk assessment.",
    badges: ["Security Expert", "Risk Analyst"],
  },
]
