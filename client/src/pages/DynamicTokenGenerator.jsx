import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function DynamicTokenGenerator() {
  const [username, setUsername] = useState("");
  const [key, setKey] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateToken = async () => {
    if (!username || !key) {
      setError("Username and key are required");
      return;
    }

    setLoading(true);
    setToken("");
    setError("");

    try {
      const res = await fetch("http://localhost:8000/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, key }),
      });

      const data = await res.json();
      if (data.token) {
        setToken(data.token);
      } else {
        setError(data.error || "Failed to generate token");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen items-center justify-center">
      <Card className="w-[600px] shadow-lg">
        <CardHeader>
          <CardTitle>Dynamic JWT Generator</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="key">Dynamic Key</Label>
            <Input
              id="key"
              placeholder="Enter key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          {token && (
            <>
              <Label>Generated Token</Label>
              <Textarea
                readOnly
                value={token}
                className="bg-gray-100 p-4 rounded text-xs overflow-x-auto h-32"
              />
              <Button
                onClick={() => navigator.clipboard.writeText(token)}
                className="w-full"
              >
                Copy to Clipboard
              </Button>
            </>
          )}
        </CardContent>

        <CardFooter>
          <Button onClick={handleGenerateToken} disabled={loading} className="w-full">
            {loading ? "Generating..." : "Generate Token"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
