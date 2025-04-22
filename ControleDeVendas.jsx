
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function ControleDeVendas() {
  const [dados, setDados] = useState([]);
  const [localizador, setLocalizador] = useState("");
  const [titular, setTitular] = useState("");
  const [valor, setValor] = useState("");
  const [desagio, setDesagio] = useState("");
  const [quemEmitiu, setQuemEmitiu] = useState("");
  const [dataEmissao, setDataEmissao] = useState(new Date());

  const [titulares, setTitulares] = useState(["NELI", "THUCA", "FABIULA", "HERBERT", "FABIANA"]);
  const [emissores, setEmissores] = useState(["DANIEL", "THUCA", "HERBERT"]);

  const formatarParaReal = (valor) => {
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const adicionarRegistro = () => {
    const valorNumerico = parseFloat(valor.replace('.', '').replace(',', '.')) || 0;
    const desagioNumerico = parseFloat(desagio.replace(',', '.')) || 0;
    const lucro = valorNumerico - (valorNumerico * (desagioNumerico / 100));

    const novoRegistro = {
      localizador,
      titular,
      valor: valorNumerico,
      desagio: desagioNumerico.toFixed(2),
      quemEmitiu,
      dataEmissao: format(dataEmissao, "dd/MM/yyyy"),
      lucro: lucro
    };

    setDados([...dados, novoRegistro]);
    setLocalizador("");
    setTitular("");
    setValor("");
    setDesagio("");
    setQuemEmitiu("");
    setDataEmissao(new Date());
  };

  const adicionarTitular = (novoTitular) => {
    if (novoTitular && !titulares.includes(novoTitular)) {
      setTitulares([...titulares, novoTitular]);
    }
  };

  const adicionarEmissor = (novoEmissor) => {
    if (novoEmissor && !emissores.includes(novoEmissor)) {
      setEmissores([...emissores, novoEmissor]);
    }
  };

  return (
    <div className="p-4 grid gap-4 max-w-3xl mx-auto">
      <Card>
        <CardContent className="grid gap-4 p-4">
          <Calendar mode="single" selected={dataEmissao} onSelect={setDataEmissao} className="rounded border" />

          <Input placeholder="Localizador" value={localizador} onChange={(e) => setLocalizador(e.target.value)} />

          <select value={titular} onChange={(e) => setTitular(e.target.value)} className="p-2 rounded border">
            <option value="">Selecione o titular</option>
            {titulares.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>

          <Input placeholder="Novo titular (opcional)" onBlur={(e) => adicionarTitular(e.target.value.toUpperCase())} />

          <Input type="text" placeholder="Valor utilizado (ex: 10.000,00)" value={valor} onChange={(e) => setValor(e.target.value)} />
          <Input type="text" placeholder="Deságio (%)" value={desagio} onChange={(e) => setDesagio(e.target.value)} />

          <select value={quemEmitiu} onChange={(e) => setQuemEmitiu(e.target.value)} className="p-2 rounded border">
            <option value="">Quem emitiu</option>
            {emissores.map((q) => <option key={q} value={q}>{q}</option>)}
          </select>

          <Input placeholder="Novo emissor (opcional)" onBlur={(e) => adicionarEmissor(e.target.value.toUpperCase())} />

          <Button onClick={adicionarRegistro}>Adicionar Venda</Button>
        </CardContent>
      </Card>

      <div className="grid gap-2">
        {dados.map((item, idx) => (
          <Card key={idx}>
            <CardContent className="p-4 text-sm">
              <p><strong>Data de emissão:</strong> {item.dataEmissao}</p>
              <p><strong>Localizador:</strong> {item.localizador}</p>
              <p><strong>Titular:</strong> {item.titular}</p>
              <p><strong>Valor utilizado:</strong> {formatarParaReal(item.valor)}</p>
              <p><strong>Deságio:</strong> {item.desagio}%</p>
              <p><strong>Quem emitiu:</strong> {item.quemEmitiu}</p>
              <p><strong>Lucro:</strong> {formatarParaReal(item.lucro)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
