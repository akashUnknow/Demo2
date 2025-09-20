import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function PublicKeyPage() {
  const location = useLocation();
  const publicKey = location.state?.publicKey || "No key provided";

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <Card className="w-[600px] shadow-lg">
          <CardHeader>
            <CardTitle>Public Key</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              className="bg-gray-100 p-4 rounded text-xs overflow-x-auto h-64"
              readOnly
              value={publicKey}
            />
            <Button
              className="mt-4"
              onClick={() => navigator.clipboard.writeText(publicKey)}
            >
              Copy to Clipboard
            </Button>
          </CardContent>
        </Card>
      </main>
      <footer className="p-4 bg-gray-100 text-center">© 2025 My App</footer>
    </div>
  );
}
