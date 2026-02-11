import { Package, AlertTriangle, XCircle, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { MovementsChart } from '@/components/dashboard/MovementsChart';
import { CategoryChart } from '@/components/dashboard/CategoryChart';
import { TopProductsChart } from '@/components/dashboard/TopProductsChart';
import { RecentMovements } from '@/components/dashboard/RecentMovements';
import { LowStockAlert } from '@/components/dashboard/LowStockAlert';
import { dashboardStats } from '@/data/mockData';

export default function Dashboard() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu estoque</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Produtos"
          value={dashboardStats.totalProducts}
          icon={Package}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Estoque Baixo"
          value={dashboardStats.lowStockCount}
          icon={AlertTriangle}
          variant="warning"
          subtitle="produtos precisam de reposição"
        />
        <StatCard
          title="Produtos Vencidos"
          value={dashboardStats.expiredCount}
          icon={XCircle}
          variant="danger"
          subtitle="itens fora da validade"
        />
        <StatCard
          title="Valor Total"
          value={formatCurrency(dashboardStats.totalValue)}
          icon={DollarSign}
          variant="success"
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="metric-card flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
            <TrendingUp className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Entradas este mês</p>
            <p className="text-2xl font-bold">{dashboardStats.entriesThisMonth}</p>
          </div>
        </div>
        <div className="metric-card flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
            <TrendingDown className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Saídas este mês</p>
            <p className="text-2xl font-bold">{dashboardStats.exitsThisMonth}</p>
          </div>
        </div>
        <div className="metric-card flex items-center gap-4 sm:col-span-2">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-2">Próximos a vencer</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{dashboardStats.expiringCount}</span>
              <span className="text-sm text-muted-foreground">produtos nos próximos 30 dias</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <MovementsChart />
        <CategoryChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <TopProductsChart />
        <RecentMovements />
        <LowStockAlert />
      </div>
    </div>
  );
}
