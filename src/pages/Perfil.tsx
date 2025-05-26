import { useState } from 'react';
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

type CpfForm = { cpf: string };

type ParcelaInfo = {
  numero: number;
  valorParcela: number;
  amortizacao: number;
  juros: number;
  saldoDevedor: number;
  paga: boolean;
};

const ITENS_POR_PAGINA = 12;

export default function PerfilUsuario() {
  const [cpfValue, setCpfValue] = useState('');
  const [tabela, setTabela] = useState<ParcelaInfo[]>([]);
  const [parcelasPagas, setParcelasPagas] = useState(0);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const formCpf = useForm<CpfForm>({ defaultValues: { cpf: '' } });

  const gerarSimulacao = (cpf: string) => {
    const valorTotal = 5000;
    const numeroParcelas = 48;
    const taxa = 0.0191;
    const i = taxa;
    const fator = Math.pow(1 + i, numeroParcelas);
    const parcelaFixa = (valorTotal * i * fator) / (fator - 1);

    const digitoInicial = parseInt(cpf.charAt(0)) || 1;
    const qtdPagas = Math.min(Math.max(digitoInicial, 1), numeroParcelas);
    setParcelasPagas(qtdPagas);

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
        paga: j <= qtdPagas,
      });
    }

    setTabela(novaTabela);
    setPaginaAtual(1); // reinicia a paginação
  };

  const onCpfSubmit = formCpf.handleSubmit((data) => {
    setCpfValue(data.cpf);
    gerarSimulacao(data.cpf);
  });

  const totalJaPago = tabela
    .filter((p) => p.paga)
    .reduce((acc, p) => acc + p.valorParcela, 0);
  const totalRestante = tabela
    .filter((p) => !p.paga)
    .reduce((acc, p) => acc + p.valorParcela, 0);

  const totalPaginas = Math.ceil(tabela.length / ITENS_POR_PAGINA);
  const dadosPaginados = tabela.slice(
    (paginaAtual - 1) * ITENS_POR_PAGINA,
    paginaAtual * ITENS_POR_PAGINA
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 pt-24">
        <h1 className="text-4xl font-bold text-center mb-10 pt-10 text-[#121212]">
          Verifique suas parcelas já pagas
        </h1>

        <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg">
          <Form {...formCpf}>
            <form onSubmit={onCpfSubmit} className="space-y-6">
              <FormField
                control={formCpf.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input type="text" maxLength={11} placeholder="Ex: 12345678909" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Consultar</Button>
            </form>
          </Form>
        </div>

        {tabela.length > 0 && (
          <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-center text-xl font-semibold mb-4">
              Crédito Consignado INSS (1.91% a.m.)
            </h2>
            <p className="text-sm text-center mb-4 italic text-gray-600">
              {parcelasPagas} de {tabela.length} parcelas já pagas
            </p>

            <Table>
              <TableHeader>
                <TableRow className="text-center">
                  <TableHead>#</TableHead>
                  <TableHead>Parcela (R$)</TableHead>
                  <TableHead>Amortização</TableHead>
                  <TableHead>Juros</TableHead>
                  <TableHead>Saldo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dadosPaginados.map((parcela) => (
                  <TableRow
                    key={parcela.numero}
                    className={parcela.paga ? 'line-through text-gray-400' : ''}
                  >
                    <TableCell className="text-center">{parcela.numero}</TableCell>
                    <TableCell className="text-center">
                      R$ {parcela.valorParcela.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      R$ {parcela.amortizacao.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      R$ {parcela.juros.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      R$ {parcela.saldoDevedor.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex justify-between items-center mt-4">
              <Button
                onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
                disabled={paginaAtual === 1}
              >
                Anterior
              </Button>
              <span>
                Página {paginaAtual} de {totalPaginas}
              </span>
              <Button
                onClick={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
                disabled={paginaAtual === totalPaginas}
              >
                Próxima
              </Button>
            </div>

            <div className="flex justify-between mt-6 text-lg font-semibold">
              <p>Total já pago: R$ {totalJaPago.toFixed(2)}</p>
              <p>Total restante: R$ {totalRestante.toFixed(2)}</p>
            </div>
          </div>
        )}

        <div className="pt-20">
          <Footer />
        </div>
      </div>
    </>
  );
}
