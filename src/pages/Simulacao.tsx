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

  const simulacoes: { nome: string; taxa: number }[] = [
    {
      nome: 'Cartão de Crédito Parcelado (9.46% a.m.)',
      taxa: 0.0946,
    },
    {
      nome: 'Crédito Consignado INSS (1.91% a.m.)',
      taxa: 0.0191,
    },
    {
      nome: 'Cartão de Crédito Rotativo (13.71% a.m.)',
      taxa: 0.1371,
    },
  ];

  const [tabelas, setTabelas] = useState<Record<string, ParcelaInfo[]>>({});
  const [paginaAtualPorTipo, setPaginaAtualPorTipo] = useState<Record<string, number>>({});
  const [totaisPorTipo, setTotaisPorTipo] = useState<Record<string, number>>({});
  const [maisBarato, setMaisBarato] = useState<string>('');

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

    const novasTabelas: Record<string, ParcelaInfo[]> = {};
    const novasPaginas: Record<string, number> = {};
    const novosTotais: Record<string, number> = {};

    for (const { nome, taxa } of simulacoes) {
      const i = taxa;
      const fator = Math.pow(1 + i, numeroParcelas);
      const parcelaFixa = (valorTotal * i * fator) / (fator - 1);

      let saldoDevedor = valorTotal;
      const tabela: ParcelaInfo[] = [];

      for (let j = 1; j <= numeroParcelas; j++) {
        const juros = saldoDevedor * i;
        const amortizacao = parcelaFixa - juros;
        saldoDevedor -= amortizacao;

        tabela.push({
          numero: j,
          valorParcela: parcelaFixa,
          amortizacao,
          juros,
          saldoDevedor: saldoDevedor > 0 ? saldoDevedor : 0,
        });
      }

      novasTabelas[nome] = tabela;
      novasPaginas[nome] = 1;
      novosTotais[nome] = parcelaFixa * numeroParcelas;
    }

    setTabelas(novasTabelas);
    setPaginaAtualPorTipo(novasPaginas);
    setTotaisPorTipo(novosTotais);

    const nomeMaisBarato = Object.entries(novosTotais).sort((a, b) => a[1] - b[1])[0][0];
    setMaisBarato('Crédito Consignado INSS (1.91% a.m.)');
  };

  const mudarPagina = (nome: string, direcao: 'anterior' | 'proxima') => {
    setPaginaAtualPorTipo((atual) => {
      const paginaAtual = atual[nome] || 1;
      const totalPaginas = Math.ceil((tabelas[nome]?.length || 0) / ITENS_POR_PAGINA);

      if (direcao === 'anterior' && paginaAtual > 1) {
        return { ...atual, [nome]: paginaAtual - 1 };
      } else if (direcao === 'proxima' && paginaAtual < totalPaginas) {
        return { ...atual, [nome]: paginaAtual + 1 };
      }

      return atual;
    });
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

              <p className="text-gray-500 text-sm">Cada simulação tem uma taxa de juros diferente.</p>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Simular
              </Button>
            </form>
          </Form>
        </div>

        {Object.keys(tabelas).length > 0 && (
          <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {simulacoes.map(({ nome }) => {
              const tabela = tabelas[nome] || [];
              const paginaAtual = paginaAtualPorTipo[nome] || 1;
              const totalPaginas = Math.ceil(tabela.length / ITENS_POR_PAGINA);
              const dadosPaginados = tabela.slice(
                (paginaAtual - 1) * ITENS_POR_PAGINA,
                paginaAtual * ITENS_POR_PAGINA
              );

              const totalPagar = totaisPorTipo[nome] || 0;

              return (
                <div
                  key={nome}
                  className="bg-white p-4 rounded-xl shadow-lg overflow-x-auto flex flex-col justify-between"
                >
                  <h2 className="text-center text-lg font-semibold mb-4">{nome}</h2>
                  <Table>
                    <TableHeader>
                      <TableRow className="text-center">
                        <TableHead className="text-center">#</TableHead>
                        <TableHead className="text-center">Parcela (R$)</TableHead>
                        <TableHead className="text-center">Amortização</TableHead>
                        <TableHead className="text-center">Juros</TableHead>
                        <TableHead className="text-center">Saldo</TableHead>
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
                    <div className="flex justify-center mt-4 gap-2">
                      <Button
                        variant="outline"
                        onClick={() => mudarPagina(nome, 'anterior')}
                        disabled={paginaAtual === 1}
                      >
                        Anterior
                      </Button>
                      <span className="text-sm mt-2">
                        Página {paginaAtual} de {totalPaginas}
                      </span>
                      <Button
                        variant="outline"
                        onClick={() => mudarPagina(nome, 'proxima')}
                        disabled={paginaAtual === totalPaginas}
                      >
                        Próxima
                      </Button>
                    </div>
                  )}

                  <div className="mt-4 text-center font-semibold text-base">
                    Total a pagar:{' '}
                    <span className={nome === maisBarato ? 'underline text-xl' : ''}>
                      R$ {totalPagar.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
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
