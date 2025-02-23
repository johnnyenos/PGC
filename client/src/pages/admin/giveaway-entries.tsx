import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import Navbar from "@/components/layout/navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { GiveawayEntry } from "@shared/schema";

export default function GiveawayEntriesPage() {
  const { user } = useAuth();

  const { data: entries, isLoading } = useQuery<GiveawayEntry[]>({
    queryKey: ["/api/admin/giveaway-entries"],
    enabled: user?.isAdmin,
  });

  if (!user?.isAdmin) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Giveaway Entries</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Entry Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries?.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.name}</TableCell>
                      <TableCell>{entry.email}</TableCell>
                      <TableCell>{entry.phone}</TableCell>
                      <TableCell>
                        {new Date(entry.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {entry.isWinner ? (
                          <span className="text-green-500">Winner</span>
                        ) : (
                          <span className="text-muted-foreground">Pending</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
