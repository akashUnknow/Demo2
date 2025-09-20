import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router-dom"

export default function ValidateToken() {
  const [token, setToken] = useState("")
  const [audience, setAudience] = useState("my-service")
  const [result, setResult] = useState(null)
  const [PublicKeyresult, setPublicKeyResult] = useState(null)
  const [loading, setLoading] = useState(false)
    const [PublicKeyloading, setPublicKeyLoading] = useState(false)
      const navigate = useNavigate();

  const handleGetPublicKey = async () => {
    setPublicKeyLoading(true)
    try {
      const res = await fetch("http://localhost:8080/api/public-key", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      const data = await res.text()
       navigate("/public-key", { state: { publicKey: data } });
    } catch (err) {
      console.error(err)
      setPublicKeyResult({ error: "Something went wrong" })
    } finally {
      setPublicKeyLoading(false)
    }
  }

  const handleValidate = async () => {
    if (!token) return alert("Please enter a token")

    setLoading(true)
    try {
      const res = await fetch("http://localhost:8080/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, audience }),
      })

      const data = await res.json()
      setResult(data)
    } catch (err) {
      console.error(err)
      setResult({ error: "Something went wrong" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-50 w-full h-full">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Token Validator</CardTitle>
          <CardDescription>Paste your JWT token and validate it against the backend service.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>JWT Token</Label>
            <Textarea
              placeholder="Enter JWT here"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Audience</Label>
            <Input
              type="text"
              placeholder="my-service"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" onClick={handleValidate} disabled={loading}>
            {loading ? "Validating..." : "Validate Token"}
          </Button>

           <Button className="w-full" onClick={handleGetPublicKey} disabled={PublicKeyloading}>
            {PublicKeyloading ? "Getting public key..." : "Get Public Key"}
          </Button>

          {result && (
            <div className="w-full bg-gray-100 rounded-md p-3 text-sm max-h-64 overflow-auto">
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
