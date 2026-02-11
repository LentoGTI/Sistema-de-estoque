import { useState, useMemo } from 'react';
import { ArrowDownCircle, ArrowUpCircle, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { movements } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Movements() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredMovements = useMemo(() => {
    return movements.filter((movement) => {
      const matchesSearch = movement.productName.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'all' || movement.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  const sortedMovements = useMemo(() => {
    return [...filteredMovements].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [filteredMovements]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Movimentações</h1>
        <p className="text-muted-foreground">
          Histórico de entradas e saídas do estoque
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="metric-card flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
            <Filter className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total de registros</p>
            <p className="text-2xl font-bold">{movements.length}</p>
          </div>
        </div>
        <div className="metric-card flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
            <ArrowDownCircle className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Entradas</p>
            <p className="text-2xl font-bold">
              {movements.filter((m) => m.type === 'entry').length}
            </p>
          </div>
        </div>
        <div className="metric-card flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
            <ArrowUpCircle className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Saídas</p>
            <p className="text-2xl font-bold">
              {movements.filter((m) => m.type === 'exit').length}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[160px] bg-card">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="entry">Entradas</SelectItem>
            <SelectItem value="exit">Saídas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold w-[100px]">Tipo</TableHead>
              <TableHead className="font-semibold">Produto</TableHead>
              <TableHead className="font-semibold text-center">Quantidade</TableHead>
              <TableHead className="font-semibold">Estoque</TableHead>
              <TableHead className="font-semibold">Usuário</TableHead>
              <TableHead className="font-semibold">Data/Hora</TableHead>
              <TableHead className="font-semibold">Observações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMovements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                  Nenhuma movimentação encontrada
                </TableCell>
              </TableRow>
            ) : (
              sortedMovements.map((movement) => (
                <TableRow key={movement.id} className="table-row-hover">
                  <TableCell>
                    <div
                      className={cn(
                        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                        movement.type === 'entry'
                          ? 'bg-success/10 text-success'
                          : 'bg-destructive/10 text-destructive'
                      )}
                    >
                      {movement.type === 'entry' ? (
                        <ArrowDownCircle className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowUpCircle className="h-3.5 w-3.5" />
                      )}
                      {movement.type === 'entry' ? 'Entrada' : 'Saída'}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{movement.productName}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={cn(
                        'font-semibold',
                        movement.type === 'entry' ? 'text-success' : 'text-destructive'
                      )}
                    >
                      {movement.type === 'entry' ? '+' : '-'}{movement.quantity}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">{movement.previousQuantity}</span>
                    <span className="mx-1">→</span>
                    <span className="font-semibold">{movement.newQuantity}</span>
                  </TableCell>
                  <TableCell>{movement.user}</TableCell>
                  <TableCell>
                    {format(new Date(movement.date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-[200px] truncate">
                    {movement.notes || '-'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
