import { cn } from '@/lib/utils';
import { ProductStatus } from '@/types/inventory';
import { CheckCircle2, AlertCircle, XCircle, Clock } from 'lucide-react';

interface StatusBadgeProps {
  status: ProductStatus;
}

const statusConfig = {
  ok: {
    label: 'OK',
    className: 'status-ok',
    icon: CheckCircle2,
  },
  low: {
    label: 'Baixo',
    className: 'status-low',
    icon: AlertCircle,
  },
  empty: {
    label: 'Sem estoque',
    className: 'status-empty',
    icon: XCircle,
  },
  expired: {
    label: 'Vencido',
    className: 'status-expired',
    icon: Clock,
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={cn('status-badge', config.className)}>
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}
