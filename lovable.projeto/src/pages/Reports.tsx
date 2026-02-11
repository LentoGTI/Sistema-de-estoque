import { FileText, Download, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const reportTypes = [
  {
    id: 'stock',
    title: 'Relatório de Estoque',
    description: 'Lista completa de todos os produtos em estoque',
    icon: FileText,
  },
  {
    id: 'movements',
    title: 'Movimentações',
    description: 'Histórico de entradas e saídas por período',
    icon: FileText,
  },
  {
    id: 'low-stock',
    title: 'Estoque Baixo',
    description: 'Produtos abaixo da quantidade mínima',
    icon: FileText,
  },
  {
    id: 'expired',
    title: 'Produtos Vencidos',
    description: 'Lista de produtos fora da validade',
    icon: FileText,
  },
  {
    id: 'by-category',
    title: 'Por Categoria',
    description: 'Agrupamento de produtos por categoria',
    icon: FileText,
  },
  {
    id: 'by-supplier',
    title: 'Por Fornecedor',
    description: 'Agrupamento de produtos por fornecedor',
    icon: FileText,
  },
];

export default function Reports() {
  const handleExport = (reportId: string, format: string) => {
    toast.success(`Relatório exportado em formato ${format.toUpperCase()}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Relatórios</h1>
        <p className="text-muted-foreground">Exporte relatórios do seu estoque</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Data Inicial</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Data Final</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="electronics">Eletrônicos</SelectItem>
                  <SelectItem value="food">Alimentos</SelectItem>
                  <SelectItem value="beverages">Bebidas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Types */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reportTypes.map((report) => (
          <Card key={report.id} className="group hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <report.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <CardTitle className="text-lg">{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleExport(report.id, 'pdf')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleExport(report.id, 'excel')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Excel
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleExport(report.id, 'csv')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
