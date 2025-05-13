import express from "express";
const porta=5000;
const host="0.0.0.0";
const app = express();

app.get('/', (req, res) => {
  const { idade, sexo, salario_base, anoContratacao, matricula } = req.query;

  // Validações
  if (!idade || idade <= 16 || isNaN(idade)) {
    return res.send('Erro: Idade deve ser maior que 16 anos.');
  }

  if (!salario_base || isNaN(salario_base)) {
    return res.send('Erro: Salário base inválido.');
  }

  if (!anoContratacao || anoContratacao < 1960 || isNaN(anoContratacao)) {
    return res.send('Erro: Ano de contratação inválido.');
  }

  if (!matricula || matricula <= 0 || isNaN(matricula)) {
    return res.send('Erro: Matrícula inválida.');
  }

  // Cálculo do reajuste (Exemplo simples — você pode ajustar com base em regras que o professor forneceu)
  const salarioBase = parseFloat(salario_base);
  let percentualReajuste = 0;

  const anoAtual = new Date().getFullYear();
  const tempoDeCasa = anoAtual - parseInt(anoContratacao);

  if (tempoDeCasa >= 10 && sexo === 'F') percentualReajuste = 0.15;
  else if (tempoDeCasa >= 10 && sexo === 'M') percentualReajuste = 0.12;
  else if (tempoDeCasa >= 5) percentualReajuste = 0.10;
  else percentualReajuste = 0.05;

  const novoSalario = salarioBase + (salarioBase * percentualReajuste);

  // Resposta HTML
  res.send(`
    <html>
      <body>
        <h1>Reajuste Salarial</h1>
        <p><strong>Matrícula:</strong> ${matricula}</p>
        <p><strong>Idade:</strong> ${idade}</p>
        <p><strong>Sexo:</strong> ${sexo}</p>
        <p><strong>Salário base:</strong> R$ ${salarioBase.toFixed(2)}</p>
        <p><strong>Ano de contratação:</strong> ${anoContratacao}</p>
        <hr>
        <h2>Novo salário: <span style="color:green">R$ ${novoSalario.toFixed(2)}</span></h2>
      </body>
    </html>
  `);
});

app.listen(porta,host, () => {
  console.log('Servidor rodando em http://localhost:5000');
});
