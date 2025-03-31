import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TableProps = {
  dados: any[];
  headers: string[]; // Cabeçalho personalizado
};

export function Tables({ dados, headers }: TableProps) {
  return (
    <Table className="bg-white dark:bg-black text-black dark:text-white">
      <TableHeader>
        <TableRow>
          {/* Gerar cabeçalho dinamicamente */}
          {headers.map((header, index) => (
            <TableHead key={index}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {dados.length > 0 ? (
          dados.map((item, index) => (
            <TableRow key={index} className="hover:bg-gray-100 dark:hover:bg-gray-900">
              {/* Gerar células dinamicamente com base nas chaves do item */}
              {Object.keys(item).map((key, idx) => (
                <TableCell key={idx} className="font-medium">{item[key]}</TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={headers.length} className="text-center">
              Nenhum item encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
