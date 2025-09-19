import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // ✅ for scopes
import { cn } from "@/lib/utils";

export default function Login() {
  const [form, setForm] = useState({
    subject: "",
    audience: "",
    scopes: [], // ✅ array now
    expiresIn: 600,
  });

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const toggleScope = (scope, checked) => {
    setForm((prev) => ({
      ...prev,
      scopes: checked
        ? [...prev.scopes, scope]
        : prev.scopes.filter((s) => s !== scope),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToken(null);

    try {
      const response = await fetch("http://localhost:8080/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: form.subject,
          audience: form.audience,
          scopes: form.scopes, 
          expiresIn: Number(form.expiresIn),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get token");
      }

      const data = await response.json();
      setToken(data.access_token);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Token based Auth</CardTitle>
          <CardDescription className="text-center">
            Enter details to generate a JWT token
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                type="text"
                placeholder="user123"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            {/* Audience */}
            <div className="space-y-2">
              <Label htmlFor="audience">Audience</Label>
              <Input
                id="audience"
                type="text"
                placeholder="my-service"
                value={form.audience}
                onChange={handleChange}
                required
              />
            </div>

            {/* Scopes with checkboxes */}
            <div className="space-y-2">
              <Label>Scopes</Label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="scope-read"
                    checked={form.scopes.includes("read")}
                    onCheckedChange={(checked) =>
                      toggleScope("read", checked)
                    }
                  />
                  <Label htmlFor="scope-read">Read</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="scope-write"
                    checked={form.scopes.includes("write")}
                    onCheckedChange={(checked) =>
                      toggleScope("write", checked)
                    }
                  />
                  <Label htmlFor="scope-write">Write</Label>
                </div>
              </div>
            </div>

            {/* Expires In */}
            <div className="space-y-2 mt-2">
              <Label htmlFor="expiresIn">Expires In (seconds)</Label>
              <Input
                id="expiresIn"
                type="number"
                placeholder="600"
                value={form.expiresIn}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-3 mt-4">
            <Button
              type="submit"
              className={cn(
                "w-full",
                loading && "opacity-70 cursor-not-allowed"
              )}
              disabled={loading}
            >
              {loading ? "Requesting token..." : "Get Token"}
            </Button>

            {token && (
              <p className="text-xs break-all text-green-600 mt-2">
                <strong>Access Token:</strong> {token}
              </p>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
