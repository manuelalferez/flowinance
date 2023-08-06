import { Table, TableBody, TableHeader, TableRow } from "../ui/table";

interface TransactionTableProps {
  headers: JSX.Element[];
  contents: JSX.Element[];
}

export function TransactionsTable({
  headers,
  contents,
}: TransactionTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>{headers}</TableRow>
      </TableHeader>
      <TableBody>{contents}</TableBody>
    </Table>
  );
}
