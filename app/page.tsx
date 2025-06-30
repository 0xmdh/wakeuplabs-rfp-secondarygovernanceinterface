"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { mockProposals, mockDelegates } from "@/lib/mock-data"
import { Vote, Users, TrendingUp, Clock, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const activeProposals = mockProposals.filter((p) => p.status === "active")
  const totalVotingPower = mockDelegates.reduce((sum, d) => sum + d.votingPower, 0)
  const totalDelegators = mockDelegates.reduce((sum, d) => sum + d.delegators, 0)

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">zkSync Governance Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Participate in zkSync ecosystem governance through proposals, voting, and delegation.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Proposals</CardTitle>
              <Vote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeProposals.length}</div>
              <p className="text-xs text-muted-foreground">{mockProposals.length - activeProposals.length} completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Delegates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockDelegates.length}</div>
              <p className="text-xs text-muted-foreground">{totalDelegators.toLocaleString()} delegators</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Voting Power</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(totalVotingPower / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">ZK tokens delegated</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participation</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">Average turnout</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Proposals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Active Proposals</h2>
              <Button asChild variant="outline">
                <Link href="/proposals">View All</Link>
              </Button>
            </div>

            <div className="space-y-4">
              {activeProposals.map((proposal) => (
                <Card key={proposal.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getTypeColor(proposal.type)}>{proposal.type}</Badge>
                          <div className={`h-2 w-2 rounded-full ${getStatusColor(proposal.status)}`} />
                          <span className="text-sm text-muted-foreground capitalize">{proposal.status}</span>
                        </div>
                        <CardTitle className="text-lg">{proposal.title}</CardTitle>
                      </div>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/proposals/${proposal.id}`}>
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <CardDescription className="line-clamp-2">{proposal.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>For: {(proposal.votesFor / 1000000).toFixed(1)}M</span>
                        <span>Against: {(proposal.votesAgainst / 1000000).toFixed(1)}M</span>
                      </div>
                      <Progress value={(proposal.votesFor / proposal.totalVotes) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Ends {proposal.endTime.toLocaleDateString()}</span>
                        <span>{((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1)}% approval</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Top Delegates */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Top Delegates</h2>
              <Button asChild variant="outline">
                <Link href="/delegates">View All</Link>
              </Button>
            </div>

            <div className="space-y-4">
              {mockDelegates.slice(0, 3).map((delegate, index) => (
                <Card key={delegate.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold">
                          #{index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-foreground truncate">{delegate.name}</p>
                          {delegate.ens && (
                            <Badge variant="secondary" className="text-xs">
                              {delegate.ens}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="text-xs text-muted-foreground">
                            {(delegate.votingPower / 1000000).toFixed(1)}M voting power
                          </p>
                          <p className="text-xs text-muted-foreground">{delegate.delegators} delegators</p>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {delegate.badges.slice(0, 2).map((badge) => (
                            <Badge key={badge} variant="outline" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/delegates/${delegate.id}`}>View</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
