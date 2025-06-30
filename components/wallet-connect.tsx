"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wallet, Copy, ExternalLink, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState("")
  const { toast } = useToast()

  const connectWallet = () => {
    // Simulate wallet connection
    const mockAddress = "0x742d35Cc6634C0532925a3b8D4C9db96590c6C87"
    setAddress(mockAddress)
    setIsConnected(true)
    toast({
      title: "Wallet Connected",
      description: "Successfully connected to MetaMask",
    })
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setAddress("")
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    })
  }

  if (!isConnected) {
    return (
      <Button onClick={connectWallet} className="flex items-center space-x-2">
        <Wallet className="h-4 w-4" />
        <span>Connect Wallet</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="hidden sm:inline">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <Badge variant="secondary" className="ml-2">
            zkSync Era
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={copyAddress}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ExternalLink className="mr-2 h-4 w-4" />
          View on Explorer
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={disconnectWallet}>
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
