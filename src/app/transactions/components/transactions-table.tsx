import { Card } from "@/app/components/ui/card";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

interface TransactionTableProps {
  headers: JSX.Element[];
  contents: JSX.Element[];
}

export function TransactionsTable({
  headers,
  contents,
}: TransactionTableProps) {
  return (
    <Card className="p-2">
      <Table>
        <TableHeader>
          <TableRow>{headers}</TableRow>
        </TableHeader>
        <TableBody>{contents}</TableBody>
      </Table>
    </Card>
  );
}
