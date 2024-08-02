//VARIAVEIS DO CLIENTE
var cadastroCliente = document.querySelector(".incluirCliente");
var consultaCliente = document.querySelector(".consultarCliente");
var linhaTabelaCliente = document.getElementById('tabelaClientes');

var cadastroVeiculo = document.querySelector('.incluirVeiculo');
var consultaVeiculo = document.querySelector('.consultarVeiculo');
var linhaTabelaVeiculo = document.getElementById("tabelaVeiculos");

let cliente;
let dados = [];

let veiculo;
let dadosVeiculos = [];

//LIMPAR OS TEXTOS DOS INPUTS DOS CLIENTES
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
    //let inputElementTipo = document.getElementById("tipoTxt");
    let inputElementModelo = document.getElementById("modeloTxt");
    let inputElementAno = document.getElementById("anoTxt");
    let inputElementValor = document.getElementById("valorTxt");
    let inputElementKm = document.getElementById("kmTxt");

    //limpa os valores dos campos de entrada
    inputElementPlaca.value = "";
    //inputElementTipo.value = "";
    inputElementModelo.value = "";
    inputElementAno.value = "";
    inputElementValor.value = "";
    inputElementKm.value = "";

    //limpa as mensagens de erro, se houver
    let erroPlaca = document.getElementById("placaErro");
    erroPlaca.innerHTML = "";
    /*let erroTipo = document.getElementById("tipoErro");
    erroTipo.innerHTML = "";*/
    let erroModelo = document.getElementById("modeloErro");
    erroModelo.innerHTML = "";
    let erroAno = document.getElementById("anoErro");
    erroAno.innerHTML = "";
    let erroValor = document.getElementById("valorErro");
    erroValor.innerHTML = "";
    let erroKm = document.getElementById("kmErro");
    erroKm.innerHTML = "";
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
    const hora = 60 * 60 * 1000;

    let dataN = new Date(data);
    //let offset = dataN.getTimezoneOffset();
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

//ORDENAR COISAS
/*function ordenarCpf(){
    //let cpfString = dados.cpf.sort();

    console.log(dados);
    for(let i = 0; i < dados.length; i++){
        console.log(dados[i].cpf);
        let aux = i+1;
        if(parseInt(dados[i].cpf) < parseInt(dados[aux].cpf)){
            console.log(dados);
            dados.replace(i, aux);
        }
    }
    console.log(dados);
    /*let cpfA = dados.cpf.replace(/\D/g, '');
    let cpfB = dados.cpf.replace(/\D/g, '');

    array.sort(cpfA.localeCompare(cpfB, 'pt-BR', {numeric: true}));
}

function ordenarNome(){
    
}*/

//MOSTRAR E ESCONDER OS TOPICOS
function formularioCliente(){
    let caixaCpf = document.getElementById('cpfTxt');

    if(cadastroCliente.style.display == "none"){
        cadastroCliente.style.display = "grid";
        consultaCliente.style.display = "none";
        
        cadastroVeiculo.style.display = "none";
        consultaVeiculo.style.display = "none";
        
        caixaCpf.focus();
    }
    else{
        cadastroCliente.style.display = "none";
    }
}

function consultarCliente(){
    if(consultaCliente.style.display == "none"){
        consultaCliente.style.display = "grid";
        cadastroCliente.style.display = "none";
        
        cadastroVeiculo.style.display = "none";
        consultaVeiculo.style.display = "none";
    }
    else{
        consultaCliente.style.display = "none";
    }
}

function formularioVeiculo(){
    let caixaPlaca = document.getElementById('placaTxt');
    
    if(cadastroVeiculo.style.display == "none"){
        cadastroVeiculo.style.display = "grid";
        consultaVeiculo.style.display = "none";
        
        cadastroCliente.style.display = "none";
        consultaCliente.style.display = "none";
        
        caixaPlaca.focus();
    }
    else{
        cadastroVeiculo.style.display = "none";
    }
}

function consultarVeiculo(){    
    if(consultaVeiculo.style.display == "none"){
        consultaVeiculo.style.display = "grid";
        cadastroVeiculo.style.display = "none";
        
        cadastroCliente.style.display = "none";
        consultaCliente.style.display = "none";
    }
    else{
        consultaVeiculo.style.display = "none";
    }
}

//TABELA CLIENTES
function atualizarTabelaClientes(){
    carregarClientes();
}

function excluirLinhaCliente(c){
    let confirmacao = window.confirm("Deseja realmente excluir este item?");
    let linhaTabela = document.getElementById(`linha${c}`);
    
    if(confirmacao){
        let dados = JSON.parse(localStorage.getItem('dadosTabela')) || [];
        linhaTabela.remove();
        for(let i = 0; i < dados.length; i++){
            console.log(dados[i].cpf.toString() === c.toString());
            if (dados[i].cpf.toString() === c.toString()){
                console.log(c);
                //remove o cliente do array
                dados.splice(i, 1);

                //salva o array atualizado de volta no localStorage
                localStorage.setItem('dadosTabela', JSON.stringify(dados));

                //linhaTabela.innerHTML = "";
                
                break; //interrompe o loop após encontrar e remover o cliente
            }
        }
        //atualiza a tabela na interface
        //atualizarTabelaClientes();
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

//CARREGAR CLIENTE 
function carregarClientes(){
    let dados = JSON.parse(localStorage.getItem('dadosTabela')) || [];
    let tabelaClientes = document.getElementById('tabelaClientes');
    //tabelaClientes.innerHTML = '';

    dados.forEach(function(cliente, i){
        let cpfFormatado = formataCpf(cliente.cpf);
        let nomeFormatado = formataNome(cliente.nome);
        let dataFormatada = formataData(cliente.data);

        tabelaClientes.innerHTML += `
            <tr class="linhaTab" id="linha${cliente.cpf}>
                <td class="dadosTabela">${cpfFormatado}</td>
                <td class="dadosTabela">${nomeFormatado}</td>
                <td class="dadosTabela">${dataFormatada}</td>
                <td>
                    <button id="btlinha"onclick="excluirLinhaCliente(${cliente.cpf})">Excluir</button>
                    <button>Alugar</button>
                </td>
            </tr>`;
    });
}

//CRIACAO DO CLIENTE
function criarCliente(c, n, d){ //cpf nome data
    return {cpf: c, nome: n, data: d};
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
        cliente = criarCliente(cpf, nome, data_nascimento);
        //console.log({cliente});
        
        dados.push(cliente);
        localStorage.setItem('dadosTabela', JSON.stringify(dados));
        //console.log({dados});

        let name = formataNome(nome);
        let cpfF = formataCpf(cpf);
        let data = formataData(data_nascimento);


        linhaTabelaCliente.innerHTML += `
            <tr class="linhaTab" id="linha${cpf}">
                <td class="dadosTabela">${cpfF}</td>
                <td class="dadosTabela">${name}</td>
                <td class="dadosTabela">${data}</td>
                <td>
                    <button id="btlinha" onclick="excluirLinhaCliente(${cpf})">Excluir</button>
                    <button onclick="alugarVeiculo()">Alugar</button>
                </td>
            </tr>`;

        consultarCliente();
        limparTextoC();
    }
}

//FORMATACAO VEICULOS
function formatarPlaca(p) {
    let placa = p.toString();
    let placa1 = placa.substring(0, 3);
    let placa2 = placa.substring(3, 7);
    let junta;

    junta = placa1 + "-" + placa2;

    return junta;
}

/*function formatarTipo(t){
    return t.charAt(0).toUpperCase() + str.slice(1);
}*/

function formatarModelo(m){
    return m.charAt(0).toUpperCase() + m.slice(1);
}

function formatarValor(v){
    let valor = Number(v);
    let valorF = valor.toFixed(2);

    //adiciona separadores de milhar e substitui o ponto decimal por vírgula
    return valorF.replace(/\B(?=(\d{3})+(?!\d))/g, '.').replace('.', ',');

}

//VERIFICAR STRING PLACA
function ehLetra(char) {
    return /^[a-zA-Z]+$/.test(char);
}

//VALIDACOES
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

//EXCLUIR VEICULOS
function excluirLinhaVeiculo(p){
    let confirmacao = window.confirm("Deseja realmente excluir este item?");
    let linhaTabela = document.getElementById(`linha${p}`);
    
    if(confirmacao){
        let dados = JSON.parse(localStorage.getItem('dadosTabelaV')) || [];
        linhaTabela.remove();
        for(let i = 0; i < dados.length; i++){
            console.log(dados[i].placa.toString() === p.toString());
            if (dados[i].placa.toString() === p.toString()){
                console.log(p);
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

//CARREGAR VEICULOS
function carregarVeiculos(){
    let dados = JSON.parse(localStorage.getItem('dadosTabelaV')) || [];
    let tabelaVeiculos= document.getElementById('tabelaVeiculos');

    dados.forEach(function(veiculo, i){
        let placaFormatada = formatarPlaca(veiculo.placa);
        //let tipoFormatado = formatarTipo(veiculo.tipo);
        let modeloFormatado = formatarModelo(veiculo.modelo);
        //let anoFormatado = formatarAno(veiculo.ano);
        let valorFormatado = formatarValor(veiculo.valor);
        //let kmFormatado = formatarKm(veiculo.km);

        //botar <td class="dadosTabela">${tipoFormatado}</td> abaixo depois!!!!!!!!!!
        tabelaVeiculos.innerHTML += `
            <tr class="linhaTab" id="linha${veiculo.placa}>
                <td class="dadosTabela">${placaFormatada}</td>
                <td class="dadosTabela">${modeloFormatado}</td>
                <td class="dadosTabela">${veiculo.ano}</td>
                <td class="dadosTabela">${valorFormatado}</td>
                <td class="dadosTabela">${veiculo.km}</td>
                <td>
                    <button>Editar</button>
                    <button id="btlinha" onclick="excluirLinhaVeiculo(${veiculo.placa})">Excluir</button>
                </td>
            </tr>`;
    });
}

//CRIACAO DO CLIENTE
function criarVeiculo(p, t, m, a, v, k){ //placa tipo modelo ano valor km
    return {placa: p, tipo: t, modelo: m, ano: a, valor: v, km: k};
}

//BOTAO SALVAR VEICULO
function salvarVeiculo(){
    let placa = document.getElementById("placaTxt").value.trim();
    //let tipo = document.querySelector("input[name=carroOuMoto]:checked").value;
    let modelo = document.getElementById("modeloTxt").value.trim();
    let ano = document.getElementById("anoTxt").value.trim();
    let valor = document.getElementById("valorDTxt").value;
    let km = document.getElementById("kmTxt").value.trim();

    /*if(tipo !== "carro" && tipo !== "moto"){
        let erro = document.getElementById("tipoErro");
        erro.innerHTML = "Selecione o tipo!";
    }*/

    let placaV = validarPlaca(placa);
    let modeloV = validarModelo(modelo);
    let anoV = validarAno(ano);
    let valorV = validarValor(valor);
    let kmV = validarKm(km);

    if(placaV === placa && modeloV === modelo && anoV === ano && valorV > 0 && kmV > 0){
        veiculo = criarVeiculo(placaV, /*tipoV*/modeloV, anoV, valorV, kmV);

        dadosVeiculos.push(veiculo);
        localStorage.setItem('dadosTabelaV', JSON.stringify(dadosVeiculos));

        let placaF = formatarPlaca(placaV);
        /*let tipoF = formatarTipo();*/
        let modeloF = formatarModelo(modeloV);
        let valorF = formatarValor(valorV);

        //adicionar a <td class="dadosTabelaV">${cpfF}</td> abaixo depois!!!!!!!!!
        linhaTabelaVeiculo.innerHTML += `
                    <tr class="linhaTab" id="linha${placaF}">
                        <td class="dadosTabelaV">${placaF}</td>
                        <td class="dadosTabelaV">${modeloF}</td>
                        <td class="dadosTabelaV">${anoV}</td>
                        <td class="dadosTabelaV">${valorF}</td>
                        <td class="dadosTabelaV">${kmV}</td>
                        <td>
                            <button id="btlinha"">Editar</button>
                            <button onclick="excluirLinhaVeiculo(${placaV})">Excluir</button>
                        </td>
                    </tr>`;

        consultarVeiculo();
        limparTextoV()
    }
}

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