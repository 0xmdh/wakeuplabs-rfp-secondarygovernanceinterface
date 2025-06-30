"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockDelegates } from "@/lib/mock-data"
import { Users, Search, TrendingUp, Vote, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function DelegatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const filteredDelegates = mockDelegates.filter(
    (delegate) =>
      delegate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delegate.ens?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delegate.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelegate = (delegateAddress: string, delegateName: string) => {
    toast({
      title: "Delegation Successful",
      description: `You have successfully delegated your voting power to ${delegateName}`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Delegate Directory</h1>
          <p className="text-muted-foreground mt-2">
            Discover and delegate your voting power to trusted community members.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name, ENS, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <TrendingUp className="h-4 w-4 mr-2" />
            Sort by Voting Power
          </Button>
        </div>

        <div className="grid gap-6">
          {filteredDelegates.map((delegate, index) => (
            <Card key={delegate.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-xl">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-xl">{delegate.name}</CardTitle>
                        {delegate.ens && <Badge variant="secondary">{delegate.ens}</Badge>}
                      </div>
                      <CardDescription className="text-sm text-muted-foreground">{delegate.address}</CardDescription>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {delegate.badges.map((badge) => (
                          <Badge key={badge} variant="outline" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleDelegate(delegate.address, delegate.name)}>
                      <Vote className="h-4 w-4 mr-2" />
                      Delegate
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/delegates/${delegate.id}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground mb-4">{delegate.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">{(delegate.votingPower / 1000000).toFixed(1)}M</span>
                      <span className="text-muted-foreground ml-1">voting power</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">{delegate.delegators}</span>
                      <span className="text-muted-foreground ml-1">delegators</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Vote className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">{delegate.proposalsVoted}</span>
                      <span className="text-muted-foreground ml-1">proposals voted</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {((delegate.proposalsVoted / 50) * 100).toFixed(0)}% participation
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDelegates.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No delegates found</h3>
              <p className="text-muted-foreground mb-4">No delegates match your search criteria.</p>
              <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
