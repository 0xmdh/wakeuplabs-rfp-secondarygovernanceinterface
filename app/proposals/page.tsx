"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockProposals } from "@/lib/mock-data"
import { Vote, Clock, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function ProposalsPage() {
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const filteredProposals = mockProposals.filter((proposal) => {
    const typeMatch = selectedType === "all" || proposal.type === selectedType
    const statusMatch = selectedStatus === "all" || proposal.status === selectedStatus
    return typeMatch && statusMatch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "passed":
        return "bg-blue-500"
      case "failed":
        return "bg-red-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "ZIP":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "TPP":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "GAP":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Governance Proposals</h1>
            <p className="text-muted-foreground mt-2">Vote on proposals that shape the future of zkSync ecosystem.</p>
          </div>
          <Button asChild>
            <Link href="/create">
              <Vote className="h-4 w-4 mr-2" />
              Create Proposal
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all" onClick={() => setSelectedStatus("all")}>
              All ({mockProposals.length})
            </TabsTrigger>
            <TabsTrigger value="active" onClick={() => setSelectedStatus("active")}>
              Active ({mockProposals.filter((p) => p.status === "active").length})
            </TabsTrigger>
            <TabsTrigger value="pending" onClick={() => setSelectedStatus("pending")}>
              Pending ({mockProposals.filter((p) => p.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger value="passed" onClick={() => setSelectedStatus("passed")}>
              Passed ({mockProposals.filter((p) => p.status === "passed").length})
            </TabsTrigger>
            <TabsTrigger value="failed" onClick={() => setSelectedStatus("failed")}>
              Failed ({mockProposals.filter((p) => p.status === "failed").length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={selectedType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType("all")}
          >
            All Types
          </Button>
          <Button
            variant={selectedType === "ZIP" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType("ZIP")}
          >
            ZIP
          </Button>
          <Button
            variant={selectedType === "TPP" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType("TPP")}
          >
            TPP
          </Button>
          <Button
            variant={selectedType === "GAP" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType("GAP")}
          >
            GAP
          </Button>
        </div>

        <div className="grid gap-6">
          {filteredProposals.map((proposal) => (
            <Card key={proposal.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <Badge className={getTypeColor(proposal.type)}>{proposal.type}</Badge>
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(proposal.status)}`} />
                      <span className="text-sm text-muted-foreground capitalize">{proposal.status}</span>
                      <span className="text-sm text-muted-foreground">
                        • Created {proposal.created.toLocaleDateString()}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{proposal.title}</CardTitle>
                    <CardDescription className="text-base">{proposal.description}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/proposals/${proposal.id}`}>
                        View Details
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                    {proposal.status === "active" && (
                      <Button size="sm">
                        <Vote className="h-4 w-4 mr-2" />
                        Vote
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">For: {(proposal.votesFor / 1000000).toFixed(1)}M ZK</span>
                      <span className="text-red-600">Against: {(proposal.votesAgainst / 1000000).toFixed(1)}M ZK</span>
                    </div>
                    <Progress
                      value={proposal.totalVotes > 0 ? (proposal.votesFor / proposal.totalVotes) * 100 : 0}
                      className="h-3"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Total: {(proposal.totalVotes / 1000000).toFixed(1)}M ZK</span>
                      <span>
                        {proposal.totalVotes > 0
                          ? `${((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1)}% approval`
                          : "No votes yet"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      {proposal.status === "active"
                        ? `Ends ${proposal.endTime.toLocaleDateString()}`
                        : `Ended ${proposal.endTime.toLocaleDateString()}`}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Proposer: {proposal.proposer.slice(0, 6)}...{proposal.proposer.slice(-4)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProposals.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Vote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No proposals found</h3>
              <p className="text-muted-foreground mb-4">No proposals match your current filters.</p>
              <Button
                onClick={() => {
                  setSelectedType("all")
                  setSelectedStatus("all")
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
