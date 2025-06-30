"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { PlusCircle, Upload, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CreateProposalPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    executionDelay: "7",
    targetContract: "",
    functionCall: "",
    parameters: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate proposal creation
    setTimeout(() => {
      toast({
        title: "Proposal Created Successfully",
        description: "Your proposal has been submitted and is now pending review.",
      })
      setIsSubmitting(false)
      // Reset form
      setFormData({
        title: "",
        description: "",
        type: "",
        executionDelay: "7",
        targetContract: "",
        functionCall: "",
        parameters: "",
      })
    }, 2000)
  }

  const getTypeDescription = (type: string) => {
    switch (type) {
      case "ZIP":
        return "zkSync Improvement Proposals - Protocol upgrades and technical changes"
      case "TPP":
        return "Treasury and Partnership Proposals - Fund allocation and strategic partnerships"
      case "GAP":
        return "Governance and Administrative Proposals - Governance parameter changes"
      default:
        return "Select a proposal type to see its description"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Create New Proposal</h1>
          <p className="text-muted-foreground mt-2">
            Submit a proposal to the zkSync governance community for consideration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Proposal Details</CardTitle>
                <CardDescription>Provide comprehensive information about your proposal.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="type">Proposal Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select proposal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ZIP">ZIP - zkSync Improvement Proposal</SelectItem>
                        <SelectItem value="TPP">TPP - Treasury and Partnership Proposal</SelectItem>
                        <SelectItem value="GAP">GAP - Governance and Administrative Proposal</SelectItem>
                      </SelectContent>
                    </Select>
                    {formData.type && (
                      <p className="text-sm text-muted-foreground">{getTypeDescription(formData.type)}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Proposal Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., ZIP-001: Increase Block Gas Limit"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide a detailed description of your proposal, including rationale, implementation details, and expected impact..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={8}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="executionDelay">Execution Delay (days)</Label>
                      <Select
                        value={formData.executionDelay}
                        onValueChange={(value) => setFormData({ ...formData, executionDelay: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 days</SelectItem>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="14">14 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Smart Contract Interaction (Optional)</h3>

                    <div className="space-y-2">
                      <Label htmlFor="targetContract">Target Contract Address</Label>
                      <Input
                        id="targetContract"
                        placeholder="0x..."
                        value={formData.targetContract}
                        onChange={(e) => setFormData({ ...formData, targetContract: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="functionCall">Function Call</Label>
                      <Input
                        id="functionCall"
                        placeholder="e.g., setParameter(uint256)"
                        value={formData.functionCall}
                        onChange={(e) => setFormData({ ...formData, functionCall: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parameters">Parameters (JSON format)</Label>
                      <Textarea
                        id="parameters"
                        placeholder='{"value": 1000000, "recipient": "0x..."}'
                        value={formData.parameters}
                        onChange={(e) => setFormData({ ...formData, parameters: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <Button type="button" variant="outline" className="w-full bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload ABI File
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || !formData.title || !formData.description || !formData.type}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Creating Proposal...
                      </>
                    ) : (
                      <>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create Proposal
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm">Wallet Connected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm">Minimum 100K ZK tokens</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  <span className="text-sm">Community review period</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Proposal Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">1</Badge>
                  <span className="text-sm">Submit proposal</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">2</Badge>
                  <span className="text-sm">Community review (48h)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">3</Badge>
                  <span className="text-sm">Voting period (7 days)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">4</Badge>
                  <span className="text-sm">Execution (if passed)</span>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Make sure to follow the proposal guidelines and provide comprehensive documentation. Incomplete
                proposals may be rejected during the review process.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </main>
    </div>
  )
}
