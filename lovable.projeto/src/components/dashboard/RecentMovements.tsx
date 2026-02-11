import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { movements } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function RecentMovements() {
  const recentMovements = movements.slice(0, 5);

  return (
    <div className="metric-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Movimentações Recentes</h3>
        <a href="/movimentacoes" className="text-sm text-primary hover:underline">
          Ver todas
        </a>
      </div>
      <div className="space-y-4">
        {recentMovements.map((movement) => (
          <div
            key={movement.id}
            className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 transition-colors hover:bg-muted/50"
          >
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full',
                movement.type === 'entry'
                  ? 'bg-success/10 text-success'
                  : 'bg-destructive/10 text-destructive'
              )}
            >
              {movement.type === 'entry' ? (
                <ArrowDownCircle className="h-5 w-5" />
              ) : (
                <ArrowUpCircle className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{movement.productName}</p>
              <p className="text-sm text-muted-foreground">
                {movement.type === 'entry' ? 'Entrada' : 'Saída'} de {movement.quantity} unidades
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{movement.user}</p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(movement.date), "dd MMM, HH:mm", { locale: ptBR })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
