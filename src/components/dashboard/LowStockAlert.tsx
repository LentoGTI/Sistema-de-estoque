import { AlertTriangle, Package } from 'lucide-react';
import { products } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function LowStockAlert() {
  const lowStockProducts = products.filter(p => p.status === 'low' || p.status === 'empty' || p.status === 'expired');

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'low':
        return { label: 'Baixo', className: 'status-low' };
      case 'empty':
        return { label: 'Sem estoque', className: 'status-empty' };
      case 'expired':
        return { label: 'Vencido', className: 'status-expired' };
      default:
        return { label: 'OK', className: 'status-ok' };
    }
  };

  return (
    <div className="metric-card border-warning/30">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-warning" />
        <h3 className="text-lg font-semibold">Alertas de Estoque</h3>
      </div>
      
      {lowStockProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <Package className="h-12 w-12 mb-2 opacity-50" />
          <p>Nenhum alerta no momento</p>
        </div>
      ) : (
        <div className="space-y-3">
          {lowStockProducts.map((product) => {
            const statusInfo = getStatusInfo(product.status);
            return (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.quantity} / {product.minQuantity} unidades
                  </p>
                </div>
                <span className={cn('status-badge', statusInfo.className)}>
                  {statusInfo.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
