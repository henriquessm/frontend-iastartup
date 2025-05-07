import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem
} from '@/components/ui/pagination';

type FormValues = {
  valor: string;
  parcelas: string;
};

type ParcelaInfo = {
  numero: number;
  valorParcela: number;
  amortizacao: number;
  juros: number;
  saldoDevedor: number;
};

const ITENS_POR_PAGINA = 5;

function Simulacao() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [tabela, setTabela] = useState<ParcelaInfo[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const taxa = 0.025;

  const form = useForm<FormValues>({
    defaultValues: {
      valor: '',
      parcelas: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    const valorTotal = parseFloat(data.valor);
    const numeroParcelas = parseInt(data.parcelas);
  
    if (isNaN(valorTotal) || isNaN(numeroParcelas) || valorTotal <= 0 || numeroParcelas <= 0) {
      return;
    }
  
    const i = taxa;
    const fator = Math.pow(1 + i, numeroParcelas);
    const parcelaFixa = (valorTotal * i * fator) / (fator - 1);
  
    let saldoDevedor = valorTotal;
    const novaTabela: ParcelaInfo[] = [];
  
    for (let j = 1; j <= numeroParcelas; j++) {
      const juros = saldoDevedor * i;
      const amortizacao = parcelaFixa - juros;
      saldoDevedor -= amortizacao;
  
      novaTabela.push({
        numero: j,
        valorParcela: parcelaFixa,
        amortizacao,
        juros,
        saldoDevedor: saldoDevedor > 0 ? saldoDevedor : 0,
      });
    }
  
    setTabela(novaTabela);
    setPaginaAtual(1); 
  };

  const totalPaginas = Math.ceil(tabela.length / ITENS_POR_PAGINA);
  const dadosPaginados = tabela.slice(
    (paginaAtual - 1) * ITENS_POR_PAGINA,
    paginaAtual * ITENS_POR_PAGINA
  );

  const irParaPaginaAnterior = () => {
    if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
  };

  const irParaPaginaProxima = () => {
    if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 pt-24">
        <h1 className="text-4xl font-bold text-center mb-10 poppins-regular text-[#121212] pt-10">
          Simulação de Crédito
        </h1>

        <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="valor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor Total</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" placeholder="Ex: 10000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parcelas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade de Parcelas</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="text-gray-500 text-sm">Taxa fixa de juros: 2,5% ao mês</p>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Simular
              </Button>
            </form>
          </Form>
        </div>

        {tabela.length > 0 && (
          <div className="max-w-4xl mx-auto mt-12 bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-600 text-white">
                  <TableHead className="text-center">#</TableHead>
                  <TableHead className="text-center">Parcela (R$)</TableHead>
                  <TableHead className="text-center">Amortização</TableHead>
                  <TableHead className="text-center">Juros</TableHead>
                  <TableHead className="text-center">Saldo Devedor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dadosPaginados.map((parcela) => (
                  <TableRow key={parcela.numero}>
                    <TableCell className="text-center">{parcela.numero}</TableCell>
                    <TableCell className="text-center">R$ {parcela.valorParcela.toFixed(2)}</TableCell>
                    <TableCell className="text-center">R$ {parcela.amortizacao.toFixed(2)}</TableCell>
                    <TableCell className="text-center">R$ {parcela.juros.toFixed(2)}</TableCell>
                    <TableCell className="text-center">R$ {parcela.saldoDevedor.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {totalPaginas > 1 && (
            <div className="flex justify-center mt-6">
                <Pagination>
                <PaginationContent>
                    <PaginationItem>
                    <button
                        onClick={irParaPaginaAnterior}
                        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                    >
                        Anterior
                    </button>
                    </PaginationItem>
                    <PaginationItem>
                    <span className="text-sm text-gray-700 mt-2 mx-3">
                        Página {paginaAtual} de {totalPaginas}
                    </span>
                    </PaginationItem>
                    <PaginationItem>
                    <button
                        onClick={irParaPaginaProxima}
                        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                    >
                        Próximo
                    </button>
                    </PaginationItem>
                </PaginationContent>
                </Pagination>
            </div>
            )}
                    </div>
        )}

        <div className="pt-10">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Simulacao;
