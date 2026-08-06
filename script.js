function formatarNumeroBR(valor) {
  // Formata número para padrão brasileiro: 1.234,56
  return valor.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function calcularJurosCompostos(valorInicial, aporteMensal, taxa, periodo, tipoTaxa, tipoPeriodo) {
  // Converte taxa anual para mensal se necessário
  if (tipoTaxa === 'anual') {
    taxa = Math.pow(1 + taxa, 1 / 12) - 1;
  }

  // Converte período para meses se necessário
  if (tipoPeriodo === 'anos') {
    periodo = periodo * 12;
  }

  let montante = valorInicial;
  for (let i = 0; i < periodo; i++) {
    montante = montante * (1 + taxa) + aporteMensal;
  }
  return montante;
}

document.getElementById('calcForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const valorInicial = parseFloat(document.getElementById('valorInicial').value);
  const aporteMensal = parseFloat(document.getElementById('aporteMensal').value);
  const taxaInput = parseFloat(document.getElementById('taxa').value);
  const taxa = taxaInput / 100; // converte de % para decimal
  const tipoTaxa = document.getElementById('tipoTaxa').value;
  const periodo = parseInt(document.getElementById('periodo').value);
  const tipoPeriodo = document.getElementById('tipoPeriodo').value;

  const resultado = calcularJurosCompostos(valorInicial, aporteMensal, taxa, periodo, tipoTaxa, tipoPeriodo);

  const resultadoFormatado = formatarNumeroBR(resultado);

  document.getElementById('resultado').textContent = `Valor final: R$ ${resultadoFormatado}`;
});