import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function DynamicJwkToPem() {
  const [jwk, setJwk] = useState({
    kty: "RSA",
    e: "AQAB",
    n: "",
    kid: "static-key-1",
  });
  const [pem, setPem] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setJwk({ ...jwk, [e.target.id]: e.target.value });
  };

const handleConvert = async () => {
  setLoading(true);
  setPem("");
  setError("");
  try {
    // console.log("JWK being sent for conversion:", jwk);
    const cleanN = jwk.n
      .replace(/-----BEGIN PUBLIC KEY-----/g, "")
      .replace(/-----END PUBLIC KEY-----/g, "")
      .replace(/\s+/g, "");

    const payload = { ...jwk, n: cleanN };

    const res = await fetch("http://localhost:8000/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    console.log("Response status:", data);
    if (data.pem) {
      setPem(data.pem);
    } else {
      setError(data.error || "Failed to convert JWK to PEM");
    }
  } catch (err) {
    console.error(err);
    setError("Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex flex-col  bg-gray-50">
      <main className="flex-grow flex items-center justify-center">
        <Card className="w-[600px] shadow-lg">
          <CardHeader>
            <CardTitle>Dynamic JWK → PEM Converter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="kty">kty</Label>
              <Input id="kty" value={jwk.kty} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="e">e (exponent)</Label>
              <Input id="e" value={jwk.e} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="n">n (modulus)</Label>
              <Textarea
                id="n"
                value={jwk.n}
                onChange={handleChange}
                placeholder="Paste modulus here"
                className="h-32"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kid">kid</Label>
              <Input id="kid" value={jwk.kid} onChange={handleChange} />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button onClick={handleConvert} className="w-full" disabled={loading}>
              {loading ? "Converting..." : "Convert to PEM"}
            </Button>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            {pem && (
              <>
                <Textarea
                  readOnly
                  className="bg-gray-100 p-4 rounded text-xs overflow-x-auto h-64"
                  value={pem}
                />
                <Button
                  onClick={() => navigator.clipboard.writeText(pem)}
                  className="w-full"
                >
                  Copy to Clipboard
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
