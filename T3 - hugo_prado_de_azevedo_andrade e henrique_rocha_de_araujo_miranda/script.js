//VARIAVEIS DO CLIENTE ====================================================================================
var cadastroCliente = document.querySelector(".incluirCliente");
var consultaCliente = document.querySelector(".consultarCliente");
var linhaTabelaCliente = document.getElementById('tabelaClientes');

var cadastroVeiculo = document.querySelector('.incluirVeiculo');
var consultaVeiculo = document.querySelector('.consultarVeiculo');
var linhaTabelaVeiculo = document.getElementById("tabelaVeiculos");

var alugaVeiculo = document.querySelector(".alugaVeiculo");

let cliente;
let dados = [];

let veiculo;
let dadosVeiculos = [];

//LIMPAR OS TEXTOS DOS INPUTS DOS CLIENTES ====================================================================================
function limparTextoC(){
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

function limparTextoV(){
    //seleciona os elementos
    let inputElementPlaca = document.getElementById("placaTxt");
    let inputElementTipo = document.querySelectorAll('input[name="carroOuMoto"]');
    let inputElementModelo = document.getElementById("modeloTxt");
    let inputElementAno = document.getElementById("anoTxt");
    let inputElementValor = document.getElementById("valorDTxt");
    let inputElementKm = document.getElementById("kmTxt");

    //limpa os valores dos campos de entrada
    inputElementPlaca.value = "";
    inputElementTipo.forEach(function(tipo){
        tipo.checked = false;
    });
    inputElementModelo.value = "";
    inputElementAno.value = "";
    inputElementValor.value = "";
    inputElementKm.value = "";

    //limpa as mensagens de erro, se houver
    let erroPlaca = document.getElementById("placaErro");
    erroPlaca.innerHTML = "";
    let erroTipo = document.getElementById("tipoErro");
    erroTipo.innerHTML = "";
    let erroModelo = document.getElementById("modeloErro");
    erroModelo.innerHTML = "";
    let erroAno = document.getElementById("anoErro");
    erroAno.innerHTML = "";
    let erroValor = document.getElementById("valorDErro");
    erroValor.innerHTML = "";
    let erroKm = document.getElementById("kmErro");
    erroKm.innerHTML = "";
}

function limparTextoAlug(){
    let inputElementSelecao = document.querySelectorAll('input[name="veiculos"]');

    inputElementSelecao.forEach(function(tipo){
        tipo.checked = false;
    });

    let erroAlug = document.getElementById("aluguelErro");
    erroAlug.innerHTML = "";
}

//VERIFICACAO STRINGS DO CPF ====================================================================================
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

//VERIFICACAO DO CPF ====================================================================================
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

//VERIFICACAO NOME ====================================================================================
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

//VERIFICACAO DATA ====================================================================================
function validarIdade(data){
    const hora = 60 * 60 * 1000;

    let dataN = new Date(data);
    let dataAtual = new Date();
    let diferenca = dataAtual.getTime() - dataN.getTime() - (3 * hora);
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

//ORDENAR COISAS ====================================================================================
function ordenarCpf(){
    let tabela = document.querySelectorAll(".linhaTabC");
    tabela.innerHTML = "";

    dados.sort((a,b) =>{
        let cpfIntA = parseInt(a.cpf);
        let cpfIntB = parseInt(b.cpf);

        if(a.cpf < b.cpf){
            return -1;
        }
        if(a.cpf > b.cpf){
            return 1;
        }
        return 0;
    });

    for(let i = 0; i < dados.length; i++){
        let name = formataNome(dados[i].nome);
        let cpfF = formataCpf(dados[i].cpf);
        let data = formataData(dados[i].data);

        let linhaNova = `
            <tr class="linhaTabC" id="${dados[i].cpf}">
                <td class="dadosTabela">${cpfF}</td>
                <td class="dadosTabela">${name}</td>
                <td class="dadosTabela">${data}</td>
                <td>
                    <button id="btlinha" onclick="excluirLinhaCliente('${dados[i].cpf}')">Excluir</button>
                    <button id="btAlugar" onclick="alugarVeiculo('${dados[i].cpf}', '${dados[i].nome}')">Alugar</button>
                </td>
            </tr>`;

            tabela.innerHTML += linhaNova;
            console.log({tabela});
    }
}

function ordenarNome(){
    let tabela = document.querySelectorAll(".linhaTabC");
    tabela.innerHTML = "";

    dados.sort((a,b) =>{
        console.log(a);
        console.log(b);
        if(a.nome < b.nome){
            return -1;
        }
        if(a.nome > b.nome){
            return 1;
        }
        return 0;
    });

    for(let i = 0; i < dados.length; i++){
        let name = formataNome(dados[i].nome);
        let cpfF = formataCpf(dados[i].cpf);
        let data = formataData(dados[i].data);

        console.log(dados);
        console.log(dados.length);
        console.log(dados[i]);

        let linhaNova = `
            <tr class="linhaTabC" id="${dados[i].cpf}">
                <td class="dadosTabela">${cpfF}</td>
                <td class="dadosTabela">${name}</td>
                <td class="dadosTabela">${data}</td>
                <td>
                    <button id="btlinha" onclick="excluirLinhaCliente('${dados[i].cpf}')">Excluir</button>
                    <button id="btAlugar" onclick="alugarVeiculo('${dados[i].cpf}', '${dados[i].nome}')">Alugar</button>
                </td>
            </tr>`;

            tabela.innerHTML += linhaNova;
            console.log({tabela});
    }
}

//MOSTRAR E ESCONDER OS TOPICOS ====================================================================================
//CLIENTES
function formularioCliente(){
    let caixaCpf = document.getElementById('cpfTxt');

    if(cadastroCliente.style.display == "none"){
        cadastroCliente.style.display = "grid";
        consultaCliente.style.display = "none";
        
        cadastroVeiculo.style.display = "none";
        consultaVeiculo.style.display = "none";

        alugaVeiculo.style.display = "none";
        
        caixaCpf.focus();
    }
    else{
        cadastroCliente.style.display = "none";
    }
}

function consultarCliente(){
    limparTextoC();

    if(consultaCliente.style.display == "none"){
        consultaCliente.style.display = "grid";
        cadastroCliente.style.display = "none";
        
        cadastroVeiculo.style.display = "none";
        consultaVeiculo.style.display = "none";

        alugaVeiculo.style.display = "none";
    }
    else{
        consultaCliente.style.display = "none";
    }
}

//VEICULOS
function formularioVeiculo(){
    let caixaPlaca = document.getElementById('placaTxt');

    let placaValor = document.getElementById("placaTxt");
    let modeloValor = document.getElementById("modeloTxt");
    let tipoValor1 = document.getElementById("tipoR1");
    let tipoValor2 = document.getElementById("tipoR2");
    let anoValor = document.getElementById("anoTxt");
    let kmValor = document.getElementById("kmTxt");

    let botao1 = document.querySelector(".botaoSalvarVeiculo");
    let botao2 = document.querySelector(".botaoSalvarEdicao");
    
    if(cadastroVeiculo.style.display == "none"){
        cadastroVeiculo.style.display = "grid";
        consultaVeiculo.style.display = "none";
        
        cadastroCliente.style.display = "none";
        consultaCliente.style.display = "none";

        alugaVeiculo.style.display = "none";
        
        caixaPlaca.focus();

        placaValor.disabled = false;
        modeloValor.disabled = false;
        tipoValor1.disabled = false;
        tipoValor2.disabled = false;
        anoValor.disabled = false;
        kmValor.disabled = false;

        caixaPlaca.focus();

        botao1.style.display = "block";
        botao2.style.display = "none";
    }
    else{
        cadastroVeiculo.style.display = "none";
        botao1.style.display = "none";
        botao2.style.display = "block";
    }
}

function edicaoVeiculo(){
    let caixaValor = document.getElementById('valorDTxt');

    let placaValor = document.getElementById("placaTxt");
    let modeloValor = document.getElementById("modeloTxt");
    let tipoValor1 = document.getElementById("tipoR1");
    let tipoValor2 = document.getElementById("tipoR2");
    let anoValor = document.getElementById("anoTxt");
    let kmValor = document.getElementById("kmTxt");

    let botao1 = document.querySelector(".botaoSalvarVeiculo");
    let botao2 = document.querySelector(".botaoSalvarEdicao");
    console.log(botao1);
    console.log(botao2);
    
    if(cadastroVeiculo.style.display == "none"){
        cadastroVeiculo.style.display = "grid";
        consultaVeiculo.style.display = "none";
        
        cadastroCliente.style.display = "none";
        consultaCliente.style.display = "none";

        alugaVeiculo.style.display = "none";
        
        caixaValor.focus();

        placaValor.disabled = true;
        modeloValor.disabled = true;
        tipoValor1.disabled = true;
        tipoValor2.disabled = true;
        anoValor.disabled = true;
        kmValor.disabled = true;

        botao1.style.display = "none";
        botao2.style.display = "block";
    }
    else{
        cadastroVeiculo.style.display = "none";
        botao1.style.display = "block";
        botao2.style.display = "none";
    }
}

function alugarVeiculo(cpf, nome){
    if(alugaVeiculo.style.display == "none"){
        let pagAlugar = document.getElementById("pessoa");
        let cpfF = formataCpf(cpf);
        let nomeF = formataNome(nome);

        pagAlugar.innerHTML = `
            <label id="cpfPessoa:${cpf}">CPF: ${cpfF}</label>
            <label>Nome: ${nomeF}</label>
        `;

        alugarVeiculoTabela();

        alugaVeiculo.style.display = "grid";

        cadastroCliente.style.display = "none";
        consultaCliente.style.display = "none";
        
        cadastroVeiculo.style.display = "none";
        consultaVeiculo.style.display = "none";
    }
    else{
        alugaVeiculo.style.display = "none";
    }
}

function consultarVeiculo(){ 
    limparTextoV();

    if(consultaVeiculo.style.display == "none"){
        consultaVeiculo.style.display = "grid";
        cadastroVeiculo.style.display = "none";
        
        cadastroCliente.style.display = "none";
        consultaCliente.style.display = "none";

        alugaVeiculo.style.display = "none";
    }
    else{
        consultaVeiculo.style.display = "none";
    }
}

//TABELA CLIENTES ====================================================================================
function atualizarTabelaClientes(){
    carregarClientes();
}

function excluirLinhaCliente(cpf){
    let confirmacao = window.confirm("Deseja realmente excluir este item?");
    let linhaTabela = document.getElementById(`${cpf}`);
    
    if(confirmacao){
        linhaTabela.remove();

        for(let i = 0; i < dados.length; i++){
            console.log(dados[i].cpf.toString() === cpf.toString());
            if (dados[i].cpf.toString() === cpf.toString()){
                console.log(cpf);
                //remove o cliente do array
                dados.splice(i, 1);

                //salva o array atualizado de volta no localStorage
                localStorage.setItem('dadosTabela', JSON.stringify(dados));

                //linhaTabela.innerHTML = "";
                
                break; //interrompe o loop após encontrar e remover o cliente
            }
        }
    }
}

//FORMATAR OS INPUTS DOS CLIENTES ====================================================================================
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
    junta = junta.toString();

    return junta;
}

function formataNome(name){
      //divide o nome em palavras pelo espaço
      console.log(name);
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

//CARREGAR CLIENTE ====================================================================================
function carregarClientes(){
    let tabelaClientes = document.getElementById('tabelaClientes');
    tabelaClientes.innerHTML = "";
    tabelaClientes.innerHTML += `
        <tbody>
            <tr class="cabecalho">
                <th><button onclick="ordenarCpf()">CPF</button></th>
                <th><button onclick="ordenarNome()">Nome</button></th>
                <th>Data de Nascimento</th>
                <th>Ações</th>
            </tr>
        </tbody>
    `;

    /*let aux = 0;
    if(dadosVeiculos.length > 0){
        for(let i = 0; i < dadosVeiculos.length; i++){
            console.log(dadosVeiculos[i].alug);
            if(dadosVeiculos[i].alug === true){
                aux++;
                console.log(aux);
            }
            console.log(aux);
            console.log(dadosVeiculos.length);
            console.log(aux === dadosVeiculos.length);
            if(aux === dadosVeiculos.length){
                let botaoAlugar = document.getElementById("btAlugar");
                botaoAlugar.setAttribute("disabled", "");
            }
        }
    }
    else{
        let botaoAlugar = document.getElementById("btAlugar");
        console.log(botaoAlugar);
        botaoAlugar.setAttribute("disabled", "");
    }*/

    for(let i = 0; i < dados.length; i++){
        let cpfFormatado = formataCpf(dados[i].cpf);
        let nomeFormatado = formataNome(dados[i].nome);
        let dataFormatada = formataData(dados[i].data);

        tabelaClientes.innerHTML += `
            <tr class="linhaTabC" id="${dados[i].cpf}">
                <td class="dadosTabela">${cpfFormatado}</td>
                <td class="dadosTabela">${nomeFormatado}</td>
                <td class="dadosTabela">${dataFormatada}</td>
                <td>
                    <button id="btlinha" onclick="excluirLinhaCliente('${dados[i].cpf}')">Excluir</button>
                    <button id="btAlugar" onclick="alugarVeiculo('${dados[i].cpf}', '${dados[i].nome}')">Alugar</button>
                </td>
            </tr>`;
    }
}

//CRIACAO DO CLIENTE ====================================================================================
function criarCliente(c, n, d){ //cpf nome data
    return {cpf: c, nome: n, data: d, veiculos: []};
}

//ACAO DO BOTAO DE SALVAR CLIENTE ====================================================================================
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
        cliente = criarCliente(cpf, nome, data_nascimento);
        //console.log({cliente});
        
        dados.push(cliente);
        localStorage.setItem('dadosTabela', JSON.stringify(dados));
        //console.log({dados});

        let name = formataNome(nome);
        let cpfF = formataCpf(cpf);
        let data = formataData(data_nascimento);

        linhaTabelaCliente.innerHTML += `
            <tr class="linhaTabC" id="${cpf}">
                <td class="dadosTabela">${cpfF}</td>
                <td class="dadosTabela">${name}</td>
                <td class="dadosTabela">${data}</td>
                <td>
                    <button id="btlinha" onclick="excluirLinhaCliente('${cpf}')">Excluir</button>
                    <button id="btExcluirV" onclick="alugarVeiculo('${cpf}', '${nome}')">Alugar</button>
                </td>
            </tr>`;

        consultarCliente();
        limparTextoC();
    }
}

//FORMATACAO VEICULOS ====================================================================================
function formatarPlaca(p) {
    let placa = p.toString();
    let placa1 = placa.substring(0, 3);
    let placa2 = placa.substring(3, 7);
    let junta;

    placa1 = placa1.toUpperCase();
    junta = placa1 + "-" + placa2;

    return junta;
}

function formatarTipo(t){
    let tipo = t.toString();
    return tipo.charAt(0).toUpperCase() + tipo.slice(1);
}

function formatarModelo(m){
    return m.charAt(0).toUpperCase() + m.slice(1);
}

function formatarValor(v){
    let valor = Number(v);
    let valorF = valor.toFixed(2);

    //adiciona separadores de milhar e substitui o ponto decimal por vírgula
    return valorF.replace(/\B(?=(\d{3})+(?!\d))/g, '.').replace('.', ',');

}

//VERIFICAR STRING PLACA ====================================================================================
function ehLetra(char) {
    return /^[a-zA-Z]+$/.test(char);
}

//VALIDACOES ====================================================================================
function placaIgual(p){
    let placa = p.toString();

    if (dadosVeiculos.length === 0){
        return false;
    }

    for(let i = 0; i < dadosVeiculos.length; i++){
        if(dadosVeiculos[i].placa === placa){
            return true;
        }
    }

    return false;
}

function validarPlaca(p){
    let placa = p.toString();
    let placa1 = placa.substring(0, 3);
    let placa2 = placa.substring(3, 7);

    if(placa.length === 7){
        if(ehLetra(placa1)){
            if(apenasNumeros(placa2)){
                if(placaIgual(placa) === false){
                    let erro = document.getElementById("placaErro");
                    erro.innerHTML = "";

                    return placa;
                }
                else{
                    let erro = document.getElementById("placaErro");
                    erro.innerHTML = "Placa inválida! Não pode haver duas placas iguais!";
                }
            }
            else{
                let erro = document.getElementById("placaErro");
                erro.innerHTML = "Placa inválida! Deve estar no formato AAA9999.";
            }
        }
        else{
            let erro = document.getElementById("placaErro");
            erro.innerHTML = "Placa inválida! Deve estar no formato AAA9999.";
        }
    }
    else{
        let erro = document.getElementById("placaErro");
        erro.innerHTML = "Placa inválida! Deve estar no formato AAA9999.";
    }
}

function validarTipo(t){
    let tipo = t;
    var nenhumSelect = true;

    for(let i = 0; i < tipo.length; i++){
        if(tipo[i].checked){
            let ti = tipo[i];
            let tiS = ti.value.toString();

            return tiS;
        }
    }
}

function validarModelo(m){
    let modelo = m.toString();

    if(m.length >= 4 && m.length <= 30){
        let erro = document.getElementById("modeloErro");
        erro.innerHTML = "";

        return modelo;
    }
    else{
        let erro = document.getElementById("modeloErro");
        erro.innerHTML = "Modelo inválido! O modelo deve ter de 4 a 30 caractéres!";
    }
}

function validarAno(a){
    let ano = a.toString();

    let data = new Date();
    let anoD = data.getFullYear();

    if(a >= 2000 && a <= anoD){
        let erro = document.getElementById("anoErro");
        erro.innerHTML = "";

        return ano;
    }
    else{
        let erro = document.getElementById("anoErro");
        erro.innerHTML = "Ano inválido! Ano deve ser maior que 1999 e menor que o ano atual.";
    }
}

function validarValor(v){
    let valor = Number(v);

    if(v > 0){
        let erro = document.getElementById("valorDErro");
        erro.innerHTML = "";

        return valor;
    }
    else{
        let erro = document.getElementById("valorDErro");
        erro.innerHTML = "Valor da diária inválido! Valor deve ser maior que 0.";
    }
}

function validarKm(k){
    if(k > 0){
        let erro = document.getElementById("kmErro");
        erro.innerHTML = "";

        return parseInt(k);
    }
    else{
        let erro = document.getElementById("kmErro");
        erro.innerHTML = "Quilometragem inválida! Valor deve ser maior que 0.";
    }
}

//EDITAR VEICULOS ====================================================================================
function editarVeiculo(placa){
    edicaoVeiculo();
    let botao = document.querySelector(".botaoSalvarEdicao");

    botao.onclick = () => {
        let texto = document.getElementById("valorDTxt").value;
        let textoF = parseFloat(texto);

        console.log(textoF);
        salvarEdicaoVeiculo(textoF, placa);
    }
}

function salvarEdicaoVeiculo(t, p){
    if(t !== null && t !== undefined && t > 0){
        let erro = document.getElementById("valorDErro");
        erro.innerHTML = ""
        console.log(dadosVeiculos);

        for(let i = 0; i < dadosVeiculos.length; i++){
            if(dadosVeiculos[i].placa === p){
                dadosVeiculos[i].valor = t;

                localStorage.setItem('dadosTabelaV', JSON.stringify(dadosVeiculos));

                let tabela = document.querySelectorAll(".linhaTabC");
                tabela.innerHTML = "";

                carregarVeiculos();
                consultarVeiculo();
            }
        }
    }
    else{
        let erro = document.getElementById("valorDErro");
        erro.innerHTML = "Valor da diária inválido! Valor deve ser maior que 0."
    }
}

//EXCLUIR VEICULOS ====================================================================================
function excluirLinhaVeiculo(placa){
    let confirmacao = window.confirm("Deseja realmente excluir este item?");

    let linhaTabela = document.getElementById(`${placa}`);
    
    if(confirmacao){
        for(let i = 0; i < dados.length; i++){
            for(let j = 0; j < dados[i].veiculos.length; j++){
                if(linhaTabela === dados[i].veiculos[j]){
                    dados.veiculos.splice(j, 1);

                    localStorage.setItem('dadosTabela', JSON.stringify(dados));
                }
            }
        }

        linhaTabela.remove();

        for(let i = 0; i < dadosVeiculos.length; i++){
            if (dadosVeiculos[i].placa.toString() === placa.toString()){
                //remove o cliente do array
                dadosVeiculos.splice(i, 1);

                //salva o array atualizado de volta no localStorage
                localStorage.setItem('dadosTabelaV', JSON.stringify(dadosVeiculos));

                //linhaTabela.innerHTML = "";
                
                break; //interrompe o loop após encontrar e remover o cliente
            }
        }
    }

    let aux = 0;
    for(let i = 0; i < dadosVeiculos.length; i++){
        if(dadosVeiculos[i].alug === true){
            aux++;
        }
        if(aux === dadosVeiculos.length){
            let botaoAlugar = document.getElementById("btAlugar");
            botaoAlugar.setAttribute("disabled", "");
        }
    }
}

//CARREGAR VEICULOS ====================================================================================
function carregarVeiculos(){
    let tabelaVeiculos = document.getElementById('tabelaVeiculos');
    tabelaVeiculos.innerHTML = "";
    tabelaVeiculos.innerHTML += `
        <tbody>
            <tr class="cabecalho">
                <th>Placa</th>
                <th>Tipo</th>
                <th>Modelo</th>
                <th>Ano</th>
                <th>Diária</th>
                <th>Km</th>
                <th>Ações</th>
            </tr>
        </tbody>
    `;

    /*if(dadosVeiculos.length === 0 && dados.length > 0){
        let botaoAlugar = document.getElementById("btAlugar");
        botaoAlugar.setAttribute("disabled", "");
    }*/

    for(let i = 0; i < dadosVeiculos.length; i++){
        let placaFormatada = formatarPlaca(dadosVeiculos[i].placa);
        let placaS = dadosVeiculos[i].placa.toString();
        let tipoFormatado = formatarTipo(dadosVeiculos[i].tipo);
        let modeloFormatado = formatarModelo(dadosVeiculos[i].modelo);
        let valorFormatado = formatarValor(dadosVeiculos[i].valor);
        tabelaVeiculos.innerHTML += `
            <tr class="linhaTabV" id="${dadosVeiculos[i].placa}">
                <td class="dadosTabelaV">${placaFormatada}</td>
                <td class="dadosTabelaV">${tipoFormatado}</td>
                <td class="dadosTabelaV">${modeloFormatado}</td>
                <td class="dadosTabelaV">${dadosVeiculos[i].ano}</td>
                <td class="dadosTabelaV">${valorFormatado}</td>
                <td class="dadosTabelaV">${dadosVeiculos[i].km}</td>
                <td>
                    <button id="btLinhaV" onclick="editarVeiculo('${placaS}')">Editar</button>
                    <button id="btExcluirV" onclick="excluirLinhaVeiculo('${placaS}')">Excluir</button>
                </td>
            </tr>`;
    }
}

//CRIACAO DO CLIENTE ====================================================================================
function criarVeiculo(p, t, m, a, v, k){ //placa tipo modelo ano valor km
    return {placa: p, tipo: t, modelo: m, ano: a, valor: v, km: k, alug: false};
}

//BOTAO SALVAR VEICULO ====================================================================================
function salvarVeiculo(){
    let placa = document.getElementById("placaTxt").value.trim();
    let tipo = document.querySelectorAll("input[name=carroOuMoto]");
    let modelo = document.getElementById("modeloTxt").value.trim();
    let ano = document.getElementById("anoTxt").value.trim();
    let valor = document.getElementById("valorDTxt").value;
    let km = document.getElementById("kmTxt").value.trim();
    valor = Number(valor);

    let placaV = validarPlaca(placa);
    var tipoV = validarTipo(tipo);
    let modeloV = validarModelo(modelo);
    let anoV = validarAno(ano);
    let valorV = validarValor(valor);
    let kmV = validarKm(km);

    if(tipoV !== "carro" && tipoV !== "moto"){
        let tipoErro = document.getElementById("tipoErro");
        tipoErro.innerHTML = "Selecione o tipo!";
    }
    else{
        let tipoErro = document.getElementById("tipoErro");
        tipoErro.innerHTML = "";
    }

    if(placaV === placa && (tipoV === "carro" || tipoV === "moto") && modeloV === modelo && anoV === ano && valorV > 0 && kmV > 0){
        veiculo = criarVeiculo(placaV, tipoV, modeloV, anoV, valorV, kmV);

        dadosVeiculos.push(veiculo);
        localStorage.setItem('dadosTabelaV', JSON.stringify(dadosVeiculos));

        let placaF = formatarPlaca(placaV);
        let tipoF = formatarTipo(tipoV);
        let modeloF = formatarModelo(modeloV);
        let valorF = formatarValor(valorV);

        linhaTabelaVeiculo.innerHTML += `
                    <tr class="linhaTabV" id="${placaV}">
                        <td class="dadosTabelaV">${placaF}</td>
                        <td class="dadosTabelaV">${tipoF}</td>
                        <td class="dadosTabelaV">${modeloF}</td>
                        <td class="dadosTabelaV">${anoV}</td>
                        <td class="dadosTabelaV">${valorF}</td>
                        <td class="dadosTabelaV">${kmV}</td>
                        <td>
                            <button id="btLinhaV" onclick="editarVeiculo('${placaV}')">Editar</button>
                            <button id="btExcluirV" onclick="excluirLinhaVeiculo('${placaV}')">Excluir</button>
                        </td>
                    </tr>`;

        consultarVeiculo();
        limparTextoV()
    }

    /*if(dadosVeiculos.length === 0 && dados.length > 0){
        let botaoAlugar = document.getElementById("btAlugar");
        botaoAlugar.setAttribute("disabled", "");
    }
    else{
        let botaoAlugar = document.getElementById("btAlugar");
        botaoAlugar.removeAttribute("disabled");
    }*/
}

//ALUGANDO VEICULO ====================================================================================
//TABELA DE ALUGAR
function alugarVeiculoTabela(){
    let tabelaAluguel = document.getElementById("tabelaAluguel");
    tabelaAluguel.innerHTML = "";
    tabelaAluguel.innerHTML = `
        <tbody>
            <tr class="cabecalho">
                <th> </th>
                <th>Placa</th>
                <th>Tipo</th>
                <th>Modelo</th>
                <th>Ano</th>
                <th>Diária</th>
                <th>Km</th>
            </tr>
        </tbody>
    `;

    console.log("oi");

    for(let i = 0; i < dadosVeiculos.length; i++){
        console.log(dadosVeiculos[i].alug);
            if(dadosVeiculos[i].alug !== true){
                        let placaFormatada = formatarPlaca(dadosVeiculos[i].placa);
                        let placaS = dadosVeiculos[i].placa.toString();
                        let tipoFormatado = formatarTipo(dadosVeiculos[i].tipo);
                        let modeloFormatado = formatarModelo(dadosVeiculos[i].modelo);
                        let valorFormatado = formatarValor(dadosVeiculos[i].valor);
                        tabelaAluguel.innerHTML += `
                            <tr class="linhaTabAlug" id="${dadosVeiculos[i].placa}">
                                <td class="dadosTabelaAlug"><input type="radio" name="veiculos" value="${dadosVeiculos[i].placa}"></td>
                                <td class="dadosTabelaAlug">${placaFormatada}</td>
                                <td class="dadosTabelaAlug">${tipoFormatado}</td>
                                <td class="dadosTabelaAlug">${modeloFormatado}</td>
                                <td class="dadosTabelaAlug">${dadosVeiculos[i].ano}</td>
                                <td class="dadosTabelaAlug">${valorFormatado}</td>
                                <td class="dadosTabelaAlug">${dadosVeiculos[i].km}</td>
                            </tr>`;
            }
            else{
                console.log("O veiculo " + dadosVeiculos[i] + "já está sendo alugado por outra pessoa!");
            }
    }
}

//VER QUAL VEICULO FOI SELECIONADO
function validarSelector(t){
    let tipo = t;

    for(let i = 0; i < tipo.length; i++){
        if(tipo[i].checked){
            let ti = tipo[i];
            let tiS = ti.value.toString();
    
            return tiS;
        }
    }
}

//BOTAO SALVAR ALUGUEL
function salvarAluguel(){
    let tipo = document.querySelectorAll("input[name=veiculos]");
    
    //ver se o box selecionado esta na tabela
    let selecionado = validarSelector(tipo);
    for(let i = 0; i < dadosVeiculos.length; i++){
        if(selecionado !== dadosVeiculos[i].placa){
            let selecaoErro = document.getElementById("aluguelErro");
            selecaoErro.innerHTML = "Selecione um veículo para aluguel!";
        }
        else if(dadosVeiculos[i].alug === true){
            let selecaoErro = document.getElementById("aluguelErro");
            selecaoErro.innerHTML = "Selecione um veículo para aluguel!";
        }
        else{
            let selecaoErro = document.getElementById("aluguelErro");
            selecaoErro.innerHTML = "";

            let cpfPessoa = document.querySelectorAll('label[id^="cpfPessoa:"]');
            for(let j = 0; j < cpfPessoa.length; j++){
                //obter o id do label
                let id = cpfPessoa[j].id;

                //extrar a parte depois do ":"
                let partes = id.split(":");
                let cpfDoLabel = partes[1];

                //comparar o cpf com o do cliente
                for(let k = 0; k < dados.length; k++){
                    if(cpfDoLabel === dados[k].cpf){
                        dados[k].veiculos.push(selecionado);
                        dadosVeiculos[i].alug = true;
                        console.log(dadosVeiculos[i]);

                        localStorage.setItem('dadosTabela', JSON.stringify(dados));
                        localStorage.setItem('dadosTabelaV', JSON.stringify(dadosVeiculos));
                    }
                }
            }
        }
    }
}

//MAIN ====================================================================================
function main(){
    let dadosSalvos = localStorage.getItem('dadosTabela');
    let dadosSalvosV = localStorage.getItem("dadosTabelaV");

    if(dadosSalvos && dadosSalvosV){
        dados = JSON.parse(dadosSalvos);
        console.log({dados});

        dadosVeiculos = JSON.parse(dadosSalvosV);
        console.log({dadosVeiculos});
    }
    carregarClientes();
    carregarVeiculos();
}