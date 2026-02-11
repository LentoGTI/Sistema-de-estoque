import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Product } from '@/types/inventory';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const movementSchema = z.object({
  quantity: z.coerce.number().min(1, 'Quantidade deve ser maior que zero'),
  notes: z.string().optional(),
});

type MovementFormValues = z.infer<typeof movementSchema>;

interface MovementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  type: 'entry' | 'exit';
  onSubmit: (data: MovementFormValues) => void;
}

export function MovementDialog({
  open,
  onOpenChange,
  product,
  type,
  onSubmit,
}: MovementDialogProps) {
  const form = useForm<MovementFormValues>({
    resolver: zodResolver(movementSchema),
    defaultValues: {
      quantity: 1,
      notes: '',
    },
  });

  const handleSubmit = (data: MovementFormValues) => {
    onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  if (!product) return null;

  const isEntry = type === 'entry';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEntry ? (
              <ArrowDownCircle className="h-5 w-5 text-success" />
            ) : (
              <ArrowUpCircle className="h-5 w-5 text-destructive" />
            )}
            {isEntry ? 'Registrar Entrada' : 'Registrar Saída'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mb-4 p-4 rounded-lg bg-muted/50">
          <p className="font-medium">{product.name}</p>
          <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
          <p className="text-sm text-muted-foreground">
            Estoque atual: <span className="font-semibold">{product.quantity}</span> unidades
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={1}
                      max={type === 'exit' ? product.quantity : undefined}
                      {...field} 
                    />
                  </FormControl>
                  {type === 'exit' && (
                    <p className="text-xs text-muted-foreground">
                      Máximo disponível: {product.quantity} unidades
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações (opcional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Motivo da movimentação..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button 
                type="submit"
                className={cn(
                  isEntry 
                    ? 'bg-success hover:bg-success/90' 
                    : 'bg-destructive hover:bg-destructive/90'
                )}
              >
                Confirmar {isEntry ? 'Entrada' : 'Saída'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
