import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileIcon, CheckCircle, AlertCircle } from "lucide-react";

const Documents = () => {
  const documents = [
    {
      name: "Driver's License",
      status: "valid",
      expiryDate: "2025-12-31",
    },
    {
      name: "Vehicle Insurance",
      status: "expiring",
      expiryDate: "2024-05-15",
    },
    {
      name: "Vehicle Registration",
      status: "valid",
      expiryDate: "2026-01-01",
    },
    {
      name: "VTC Professional Card",
      status: "valid",
      expiryDate: "2025-06-30",
    },
  ];

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Documents</h3>
      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.name}
            className="flex items-center justify-between p-3 border rounded-lg"
          >
            <div className="flex items-center gap-3">
              <FileIcon className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-sm text-muted-foreground">
                  Expires on: {doc.expiryDate}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {doc.status === "valid" ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-500" />
              )}
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Documents;