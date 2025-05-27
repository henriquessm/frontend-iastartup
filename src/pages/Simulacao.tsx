"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"

// Form types
type CpfForm = { cpf: string }
type SimForm = { valor: string; parcelas: string }

type ParcelaInfo = {
  numero: number
  valorParcela: number
  amortizacao: number
  juros: number
  saldoDevedor: number
}

const ITENS_POR_PAGINA = 5

export default function Simulacao() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Steps: 1 = verificar crédito, 2 = simular
  const [step, setStep] = useState<1 | 2>(1)
  const [cpfValue, setCpfValue] = useState("")
  const [predictResult, setPredictResult] = useState<{
    prediction: string
    probabilities: Record<string, number>
  } | null>(null)
  const [checkError, setCheckError] = useState<string | null>(null)
  const [loadingCheck, setLoadingCheck] = useState(false)
  const [allowedMax, setAllowedMax] = useState(0)

  const [tabelas, setTabelas] = useState<Record<string, ParcelaInfo[]>>({})
  const [paginaAtualPorTipo, setPaginaAtualPorTipo] = useState<Record<string, number>>({})
  const [totaisPorTipo, setTotaisPorTipo] = useState<Record<string, number>>({})

  // React Hook Forms
  const formCpf = useForm<CpfForm>({ defaultValues: { cpf: "" } })
  const formSim = useForm<SimForm>({ defaultValues: { valor: "", parcelas: "" } })

  // Limites por score
  const limitMapping: Record<string, number> = {
    Poor: 2500,
    Standard: 5000,
    Good: 10000,
  }

  // Passo 1: verificar crédito
  const onCpfSubmit = formCpf.handleSubmit(async (data) => {
    setCheckError(null)
    setLoadingCheck(true)

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf: data.cpf }),
      })
      if (!response.ok) throw new Error(`Erro ao verificar crédito: ${response.status}`)
      const result = await response.json()
      setPredictResult(result)
      const pred = result.prediction
      setAllowedMax(limitMapping[pred] ?? 0)
      setCpfValue(data.cpf)
      setStep(2)
    } catch (err: any) {
      setCheckError(err.message)
    } finally {
      setLoadingCheck(false)
    }
  })

  // Passo 2: realizar simulação
  const onSimulationSubmit = formSim.handleSubmit((data) => {
    const valorTotal = Number.parseFloat(data.valor)
    const numeroParcelas = Number.parseInt(data.parcelas, 10)

    if (isNaN(valorTotal) || isNaN(numeroParcelas) || valorTotal <= 0 || numeroParcelas <= 0) {
      return
    }

    const simulacoes: { nome: string; taxa: number }[] = [
      { nome: "Cartão de Crédito Parcelado (9.46% a.m.)", taxa: 0.0946 },
      { nome: "Crédito Consignado INSS (1.91% a.m.)", taxa: 0.0191 },
      { nome: "Cartão de Crédito Rotativo (13.71% a.m.)", taxa: 0.1371 },
    ]

    const novasTabelas: Record<string, ParcelaInfo[]> = {}
    const novasPaginas: Record<string, number> = {}
    const novosTotais: Record<string, number> = {}

    for (const { nome, taxa } of simulacoes) {
      const i = taxa
      const fator = Math.pow(1 + i, numeroParcelas)
      const parcelaFixa = (valorTotal * i * fator) / (fator - 1)
      let saldoDevedor = valorTotal
      const tabela: ParcelaInfo[] = []
      for (let j = 1; j <= numeroParcelas; j++) {
        const juros = saldoDevedor * i
        const amortizacao = parcelaFixa - juros
        saldoDevedor -= amortizacao
        tabela.push({
          numero: j,
          valorParcela: parcelaFixa,
          amortizacao,
          juros,
          saldoDevedor: saldoDevedor > 0 ? saldoDevedor : 0,
        })
      }
      novasTabelas[nome] = tabela
      novasPaginas[nome] = 1
      novosTotais[nome] = parcelaFixa * numeroParcelas
    }

    setTabelas(novasTabelas)
    setPaginaAtualPorTipo(novasPaginas)
    setTotaisPorTipo(novosTotais)
  })

  const mudarPagina = (nome: string, direcao: "anterior" | "proxima") => {
    setPaginaAtualPorTipo((atual) => {
      const paginaAtual = atual[nome] || 1
      const totalPaginas = Math.ceil((tabelas[nome]?.length || 0) / ITENS_POR_PAGINA)
      if (direcao === "anterior" && paginaAtual > 1) {
        return { ...atual, [nome]: paginaAtual - 1 }
      } else if (direcao === "proxima" && paginaAtual < totalPaginas) {
        return { ...atual, [nome]: paginaAtual + 1 }
      }
      return atual
    })
  }

  // Label para exibição
  const displayLabel = predictResult
    ? predictResult.prediction === "Good"
      ? "Excelente"
      : predictResult.prediction
    : ""

  const detailMessages: Record<string, string> = {
    Standard: `Analisamos seu perfil financeiro com base em diversos fatores, como renda, histórico de crédito, compromissos financeiros atuais e comportamento de pagamento. Sua pontuação ficou em um nível intermediário, o que nos permitiu oferecer um valor de crédito compatível com seu momento atual.

    Identificamos pontos positivos, como estabilidade de renda ou um bom histórico em determinadas áreas, mas também observamos alguns sinais de atenção — como uso elevado de crédito ou número de parcelas mensais relativamente alto — que influenciaram no valor final concedido.

    Essa avaliação é feita de forma personalizada e pode evoluir conforme seu perfil financeiro se fortaleça ao longo do tempo. Estamos aqui para apoiar seu progresso com responsabilidade e clareza.

    Para mais esclarecimentos, entre em contato conosco pelo e-mail: siel@gmail.com`,
        Poor: `Avaliamos seu perfil com base em diversos fatores financeiros e, neste momento, identificamos sinais que indicam um risco um pouco mais elevado para concessão de crédito.

    Entre os pontos analisados, observamos um comprometimento mensal mais alto com dívidas, histórico recente de pagamentos atrasados ou utilização elevada do limite de crédito disponível. Esses fatores impactaram negativamente sua pontuação e nos levaram a limitar o valor de crédito concedido.

    Essa é uma análise dinâmica, que pode melhorar ao longo do tempo com o equilíbrio das finanças, redução de dívidas e manutenção dos pagamentos em dia. Conte com a gente nesse processo.

    Para mais esclarecimentos, entre em contato conosco pelo e-mail: siel@gmail.com`,
        Good: `Parabéns! Seu perfil foi bem avaliado pela nossa inteligência artificial de crédito. A análise considerou fatores como sua boa pontualidade nos pagamentos, um uso equilibrado do crédito disponível e um histórico financeiro consistente.

    Sua renda atual, somada ao número controlado de empréstimos e cartões ativos, indica um comportamento financeiro saudável, com baixo risco de inadimplência. Esses elementos contribuíram diretamente para uma pontuação positiva, o que nos permitiu oferecer um valor de crédito mais elevado e adequado ao seu perfil.

    Nosso objetivo é reconhecer bons hábitos financeiros e proporcionar oportunidades seguras para que você continue evoluindo com tranquilidade.

    Para mais esclarecimentos, entre em contato conosco pelo e-mail: siel@gmail.com`,
      };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 pt-24">
        <h1 className="text-4xl font-bold text-center mb-10 poppins-regular text-[#121212] pt-10">
          Simulação de Crédito
        </h1>

        {/* Passo 1: Verificar CPF */}
        {step === 1 && (
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

                {loadingCheck && <p>Verificando crédito...</p>}
                {checkError && <p className="text-red-500">{checkError}</p>}

                <Button type="submit" className="w-full">
                  Verificar Crédito
                </Button>
              </form>
            </Form>
          </div>
        )}

        {/* Passo 2: Mostrar resultado e simular */}
        {step === 2 && predictResult && (
          <>
            <div className="max-w-lg mx-auto bg-green-50 p-6 rounded-xl shadow-lg mb-12">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold mb-2">
                    Score: {displayLabel} ({Math.round(predictResult.probabilities[predictResult.prediction] * 100)}%)
                  </p>
                  <p>Você pode simular até R$ {allowedMax.toLocaleString()}</p>
                </div>

                {/* Botão de detalhes */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Detalhes do Score</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Detalhamento do Score -  XAI</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription className="space-y-4">
                      {predictResult.prediction in detailMessages
                        ? detailMessages[predictResult.prediction].split("\n\n").map((paragraph, index) => {
                            // Process each paragraph to add underline to email addresses
                            const formattedText = paragraph.trim().replace(
                              /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g,
                              '<span style="text-decoration: underline;">$1</span>'
                            );
                            
                            return (
                              <p 
                                key={index} 
                                className="text-sm leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: formattedText }}
                              />
                            );
                          })
                        : ""}
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Fechar</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg mt-6 mb-12">
              <Form {...formSim}>
                <form onSubmit={onSimulationSubmit} className="space-y-6">
                  <FormField
                    control={formSim.control}
                    name="valor"
                    rules={{
                      required: "Campo obrigatório",
                      validate: (value) => Number.parseFloat(value) <= allowedMax || `Escolha até R$ ${allowedMax}`,
                    }}
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
                    control={formSim.control}
                    name="parcelas"
                    rules={{ required: "Campo obrigatório" }}
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

                  <Button type="submit" className="w-full">
                    Simular
                  </Button>
                </form>
              </Form>
            </div>
          </>
        )}
        {/* Tabelas de amortização */}
        {step === 2 && Object.keys(tabelas).length > 0 && (
          <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(tabelas).map(([nome, tabela]) => {
              const paginaAtual = paginaAtualPorTipo[nome] || 1
              const totalPaginas = Math.ceil(tabela.length / ITENS_POR_PAGINA)
              const dadosPaginados = tabela.slice((paginaAtual - 1) * ITENS_POR_PAGINA, paginaAtual * ITENS_POR_PAGINA)

              const totalPagar = totaisPorTipo[nome] || 0

              return (
                <div
                  key={nome}
                  className="bg-white p-4 rounded-xl shadow-lg overflow-x-auto flex flex-col justify-between"
                >
                  <h2 className="text-center text-lg font-semibold mb-4">{nome}</h2>
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
                  <div className="flex justify-between items-center mt-4">
                    <Button onClick={() => mudarPagina(nome, "anterior")} disabled={paginaAtual === 1}>
                      Anterior
                    </Button>
                    <span>
                      Página {paginaAtual} de {totalPaginas}
                    </span>
                    <Button onClick={() => mudarPagina(nome, "proxima")} disabled={paginaAtual === totalPaginas}>
                      Próxima
                    </Button>
                  </div>
                  <p className="mt-4 text-right font-semibold">Total a pagar: R$ {totalPagar.toFixed(2)}</p>
                </div>
              )
            })}
          </div>
        )}
        <div className="pt-20">
          <Footer />
        </div>
      </div>
    </>
  )
}
