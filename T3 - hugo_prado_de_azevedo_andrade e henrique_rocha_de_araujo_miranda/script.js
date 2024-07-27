//VARIAVEIS DO CLIENTE
var cadastroCliente = document.querySelector(".incluirCliente");
var consultaCliente = document.querySelector(".consultarCliente");
var linhaTabelaCliente = document.getElementById('tabelaClientes');

let cliente;
let dados = [];
let id = 0;

//LIMPAR OS TEXTOS DOS INPUTS DOS CLIENTES
function limparTexto() {
    //seleciona os elementos
    let inputElementCpf = document.getElementById("cpfTxt");
    let inputElementNome = document.getElementById("nomeTxt");
    let inputElementData = document.getElementById("dataTxt");

    //limpa os valores dos campos de entrada
    inputElementCpf.value = "";
    inputElementNome.value = "";
    inputElementData.value = "";

    //limpa as mensagens de erro, se houver
    let erroCpf = document.getElementById("cpfErro");
    erroCpf.innerHTML = "";
    let erroNome = document.getElementById("nomeErro");
    erroNome.innerHTML = "";
    let erroData = document.getElementById("dataErro");
    erroData.innerHTML = "";
}

//VERIFICACAO STRINGS DO CPF
function apenasNumeros(string){
    return /^\d+$/.test(string);
}

function verificarNumeros(string){
    for (let i = 1; i < string.length; i++){
        if (string[i] !== string[0]){
            return false;
        }
    }
    
    return true;
}

//VERIFICACAO DO CPF
function verificarPrimeiroD(string, ver){
    let numero = 0;
    let aux = 10;
    let verN = 0;

    for(let i = 0; i < 9; i++){
        numero += parseInt(string[i])*aux;

        aux--;
    }

    let resto = numero % 11;

    if(resto == 1 || resto == 0){
        verN = 0;
    }
    else if(resto >= 2 && resto <= 10){
        verN = 11 - resto;
    }

    return verN == ver[0];
}

function verificarSegundoD(string, ver){
    let numero = 0;
    let aux = 11;
    let verN = 0;
    
    for(let i = 0; i < 10; i++){
        numero += parseInt(string[i])*aux;

        aux--;
    }

    let resto = numero % 11;

    if(resto == 1 || resto == 0){
        verN = 0
    }
    else if(resto >= 2 && resto <= 10){
        verN = 11 - resto;
    }

    return verN == ver[1];
}

function cpfIgual(sCpf){
    if (dados.length === 0){
        return false;
    }
    for(let i = 0; i < dados.length; i++){
        if(dados[i].cpf === sCpf){
            return true;
        }
    }

    return false;
}

function validarCpf(cpfN){
    let stringCpfN = cpfN.toString();

    if(stringCpfN.length === 11){
        if(apenasNumeros(stringCpfN) === true){
            if(verificarNumeros(stringCpfN) === false){
                if(cpfIgual(stringCpfN) === false){
                    let parte1 = stringCpfN.substring(0, 9);
                    let parte2 = stringCpfN.substring(0, 10);
                    let verificador = stringCpfN.substring(9);
        
                    if(verificarPrimeiroD(parte1, verificador) && verificarSegundoD(parte2, verificador)){
                        let erroCpf = document.getElementById("cpfErro");
                        erroCpf.innerHTML = "";

                        return stringCpfN;
                    }else{
                        let erro = document.getElementById("cpfErro");
                        erro.innerHTML = "CPF inválido!";
                    }
                }else{
                    let erro = document.getElementById("cpfErro");
                    erro.innerHTML = "CPF inválido!";
                }
            }else{
                let erro = document.getElementById("cpfErro");
                erro.innerHTML = "CPF inválido!";
            }
        }else{
            let erro = document.getElementById("cpfErro");
            erro.innerHTML = "CPF inválido!";
        }
    }else{
        let erro = document.getElementById("cpfErro");
        erro.innerHTML = "CPF inválido!";
    }
}

//VERIFICACAO NOME
function validarNome(name){
    if(name.length >= 4 && name.length <= 80){
        let erroNome = document.getElementById("nomeErro");
        erroNome.innerHTML = "";

        return name;
    }
    else{
        let erro = document.getElementById("nomeErro");
        erro.innerHTML = "O nome deve ter de 4 a 80 caractéres!";
    }
}

//VERIFICACAO DATA
function validarIdade(data){
    let dataN = new Date(data);
    let dataAtual = new Date();
    let diferenca = dataAtual.getTime() - dataN.getTime();
    let idade = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365.25));

    let erro = document.getElementById("dataErro");

    if(idade >= 18){
        let erroData = document.getElementById("dataErro");
        erroData.innerHTML = "";

        return idade;
    }
    else if(idade < 18){
        return idade;
    }
    else{
        erro.innerHTML = "Data inválida!";
    }
}

//CRIACAO DO CLIENTE
function criarCliente(c, n, d, i){ //cpf nome data id
    return {cpf: c, nome: n, data: d, id: i};
}

function salvarTabela(c, n, d){
    let tabela = document.getElementById("tabela");

    //percorre as linhas da tabela (exceto a primeira que é o cabeçalho)
    for (let i = 1; i < tabela.rows.length; i++){
        let linha = tabela.rows[i];
        c = linha.cells[0].textContent;
        n = linha.cells[1].textContent;
        d = linha.cells[2].textContent;
        dados.push({c, n, d});
    }

    localStorage.setItem('dadosTabela', JSON.stringify(dados));
    //alert('Tabela salva no localStorage!');
}

function formularioCliente(){
    if(cadastroCliente.style.display == "none"){
        cadastroCliente.style.display = "grid";
        consultaCliente.style.display = "none";
    }
    else{
        cadastroCliente.style.display = "none";
    }
}

function consultarCliente(){
    if(consultaCliente.style.display == "none"){
        consultaCliente.style.display = "grid";
        cadastroCliente.style.display = "none";
    }
    else{
        consultaCliente.style.display = "none";
    }
}

function excluiLinhaCliente(id){
    let confirmacao = window.confirm("Deseja realmente excluir este item?");
    if(confirmacao){
        let linha = document.getElementById('linha' + id);
        linha.innerHTML = '';
        id--;
    }
}

//FORMATAR OS INPUTS DOS CLIENTES
function formataCpf(cpf){
    //transforma pra string
    let sCpf = cpf.toString();
    let partes = [];
    let partes2 = [];
    let junta;

    //separa e coloca - na primeira parte 
    partes.push(sCpf.substring(0, 3));
    partes.push(sCpf.substring(3, 6));
    partes.push(sCpf.substring(6, 9));

    junta = partes.join(".");

    //coloca . na ultima parte
    partes2.push(junta);
    partes2.push(sCpf.substring(9));

    junta = partes2.join("-");

    return junta;
}

function formataNome(name){
      //divide o nome em palavras pelo espaço
      let palavras = name.split(" ");

      // primeira letra de cada palavra maiuscula
      let palavrasM = palavras.map(i => {
          //sem palavra vazia
          if (i.length > 0) {
              //bota só a primeira letra maiuscula
              return i.charAt(0).toUpperCase() + i.slice(1).toLowerCase();
          } else {
              return i;
          }
      });

      return palavrasM.join(" ");
}

function formataData(date) {
    let data = date.toString();
    let parte1 = [];
    let junta;
    let aux = [];

    parte1 = data.split('-');
    aux = data.split('-');

    parte1[0] = aux[2];
    parte1[2] = aux[0];

    junta = parte1.join('/');

    return junta;
}

function carregarClientes(){
    let dados = JSON.parse(localStorage.getItem('dadosTabela')) || [];
    let tabelaClientes = document.getElementById('tabelaClientes');
    tabelaClientes.innerHTML = '';

    dados.forEach(function(cliente, i){
        let cpfFormatado = formataCpf(cliente.cpf);
        let nomeFormatado = formataNome(cliente.nome);
        let dataFormatada = formataData(cliente.data);

        tabelaClientes.innerHTML += `
            <tr class="linhaTab" id="linha${cliente.id}>
                <td class="dadosTabela">${cpfFormatado}</td>
                <td class="dadosTabela">${nomeFormatado}</td>
                <td class="dadosTabela">${dataFormatada}</td>
                <td>
                    <button onclick="excluirLinhaCliente(${cliente.id})">Excluir</button>
                    <button>Alugar</button>
                </td>
            </tr>`;
    });
}

//ACAO DO BOTAO DE SALVAR CLIENTE
function salvarCliente(){
    let cpf = document.getElementById("cpfTxt").value;
    let nome = document.getElementById("nomeTxt").value.trim();
    let data_nascimento = document.getElementById("dataTxt").value;

    //limpa as mensagens de erro
    document.getElementById("cpfErro").innerHTML = "";
    document.getElementById("nomeErro").innerHTML = "";
    document.getElementById("dataErro").innerHTML = "";

    //define as variaveis como os returns das funcoes
    let cpfValido = validarCpf(cpf);
    let nomeValido = validarNome(nome);
    let idadeValida = validarIdade(data_nascimento);

    //verifica e mostra os erros que tiveram
    if(cpfValido !== cpf){
        let erro = document.getElementById("cpfErro");
        erro.innerHTML = "CPF inválido!";
    }
    if(nomeValido !== nome){
        let erro = document.getElementById("nomeErro");
        erro.innerHTML = "O nome deve ter de 4 a 80 caractéres!";
    }
    if(idadeValida >= 18){
        let erroData = document.getElementById("dataErro");
        erroData.innerHTML = "";
    }
    else if(idadeValida < 18){
        let erro = document.getElementById("dataErro");
        erro.innerHTML = "Cliente tem " + idadeValida + " anos. Deve ter pelo menos 18!";
    }
    else{
        let erro = document.getElementById("dataErro");
        erro.innerHTML = "Data inválida!";
    }

    //salva o cliente com sucesso depois de estar sem erros
    if(cpfValido === cpf && nomeValido === nome && idadeValida >= 18){
        id += 1;
        cliente = criarCliente(cpf, nome, data_nascimento, id);
        //console.log({cliente});
        
        dados.push(cliente);
        localStorage.setItem('dadosTabela', JSON.stringify(dados));
        //console.log({dados});

        let name = formataNome(nome);
        let cpfF = formataCpf(cpf);
        let data = formataData(data_nascimento);


        linhaTabelaCliente.innerHTML += `
            <tr class="linhaTab" id="linha${id}">
                <td class="dadosTabela">${cpfF}</td>
                <td class="dadosTabela">${name}</td>
                <td class="dadosTabela">${data}</td>
                <td>
                    <button id="btlinha${id}" onclick= "excluiLinhaCliente(${id})">Excluir</button>
                    <button>Alugar</button>
                </td>
            </tr>`;

        consultarCliente();
        limparTexto();
    }
}

function main(){
    tabelaClientes.innerHTML += `<tr class="cabecalho">
                                        <th><button>CPF</button></th>
                                        <th><button>Nome</button></th>
                                        <th>Data de Nascimento</th>
                                        <th>Ações</th>
                                    </tr>`;

    let dadosSalvos = localStorage.getItem('dadosTabela');

    if(dadosSalvos){
        dados = JSON.parse(dadosSalvos);
        console.log({dados});
    }
    carregarClientes();
}