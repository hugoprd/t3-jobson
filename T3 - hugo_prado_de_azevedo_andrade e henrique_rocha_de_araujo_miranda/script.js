var cadastroCliente = document.querySelector(".incluirCliente");
var consultaCliente = document.querySelector(".consultarCliente");

let cliente;
let dados = [];

/*function mensagemErroCpf(){
    let erro = document.getElementById("cpfErro");

    erro.innerHTML = "CPF inválido!";
}*/

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
    //console.log(verN == ver[0]);

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
    //console.log(verN == ver[1]);

    return verN == ver[1];
}

function cpfDiferente(sCpf){
    //console.log(sCpf);
    console.log({dados});
    dados.forEach(i =>{
        console.log(i.cpf != sCpf);
        if(i.cpf != sCpf){
            console.log({dados});
            return true;
        }
    })
}

function validarCpf(cpfN){
    let stringCpfN = cpfN.toString();

    if(stringCpfN.length == 11){
        if(apenasNumeros(stringCpfN) == true){
            if(verificarNumeros(stringCpfN) == false){
                if(cpfDiferente(stringCpfN)){
                    console.log(stringCpfN);
                    let parte1 = stringCpfN.substring(0, 9);
                    let parte2 = stringCpfN.substring(0, 10);
                    let verificador = stringCpfN.substring(9);
        
                    if(verificarPrimeiroD(parte1, verificador) && verificarSegundoD(parte2, verificador)){
                        return stringCpfN;
                    }else{
                        //mensagemErroCpf();
                        let erro = document.getElementById("cpfErro");

                        erro.innerHTML = "CPF inválido!1";
                    }
                }else{
                    //mensagemErroCpf();
                    let erro = document.getElementById("cpfErro");

                    erro.innerHTML = "CPF inválido!2";
                }
            }else{
                //mensagemErroCpf();

                let erro = document.getElementById("cpfErro");

                erro.innerHTML = "CPF inválido!3";
                }
        }else{
            //mensagemErroCpf();

            let erro = document.getElementById("cpfErro");

            erro.innerHTML = "CPF inválido!4";
        }
    }else{
        //mensagemErroCpf();

        let erro = document.getElementById("cpfErro");

        erro.innerHTML = "CPF inválido!5";
    }
}

//VERIFICACAO NOME
function validarNome(name){
    if(name.length >= 4 && name.length <= 80){
        return name;
    }
    else{
        let erro = document.getElementById("nomeErro");

        erro.innerHTML = "Nome deve ter de 4 a 80 caractéres!";
    }
}

//VERIFICACAO DATA
function validarIdade(data){
    let erro = document.getElementById("dataErro");
    let dataNascimento = new Date(data);
    let dataAtual = new Date();
    let diferenca = dataAtual.getTime() - dataNascimento.getTime();
    let idade = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365.25));

    if(idade >= 18){
        return data;
    }
    else if(idade < 18){
        erro.innerHTML = "Cliente tem " + idade + " anos. Deve ter pelo menos 18!";
    }
    else{
        erro.innerHTML = "Data inválida!";
    }
}

function criarCliente(c, n, d){ //cpf nome data
    return {cpf: c, nome: n, data: d};
}

/*function salvarTabela(c, n, d){
    let tabela = document.getElementById("tabela");

    // Percorre as linhas da tabela (exceto a primeira que é o cabeçalho)
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

/*function carregarTabela(){
    let dadosSalvos = localStorage.getItem('dadosTabela');

    if(dadosSalvos){
        let dados = JSON.parse(dadosSalvos);
        let tabela = document.getElementById('tabelaDados');

        // Limpa as linhas existentes na tabela
        while (tabela.rows.length > 1){
            tabela.deleteRow(1);
        }

        // Adiciona as linhas salvas de volta na tabela
        dados.forEach(dado => {
            let novaLinha = tabela.insertRow();
            novaLinha.insertCell().textContent = dado.c;
            novaLinha.insertCell().textContent = dado.n;
            novaLinha.insertCell().textContent = dado.d;
        });
    }
}*/

function limparLocalStorage(){
    localStorage.removeItem('dadosTabela');
    //alert('LocalStorage limpo!');
}

function formularioCliente(){
    if(cadastroCliente.style.display == "none"){
        cadastroCliente.style.display = "block";
        consultaCliente.style.display = "none";
    }
    else{
        cadastroCliente.style.display = "none";
    }
}

function consultarCliente(){
    if(consultaCliente.style.display == "none"){
        consultaCliente.style.display = "block";
        cadastroCliente.style.display = "none";
    }
    else{
        consultaCliente.style.display = "none";
    }
}

function salvarCliente(){
    let cpf = document.getElementById("cpfTxt").value;
    let nome = document.getElementById("nomeTxt").value.trim();
    let data_nascimento = document.getElementById("dataTxt").value;

    let erro = document.getElementById("cpfErro");
    erro.innerHTML = "";

    if(validarCpf(cpf) && validarNome(nome) && validarIdade(data_nascimento)){
        cliente = criarCliente(cpf, nome, data_nascimento);
        console.log({cliente});

        //salvarTabela(cliente.cpf, cliente.nome, cliente.data);
        dados.push(cliente);
        localStorage.setItem('dadosTabela', JSON.stringify(dados));
        console.log({dados});
    }
}

function main(){
    let dadosSalvos = localStorage.getItem('dadosTabela');

    if(dadosSalvos){
        dados = JSON.parse(dadosSalvos);
        console.log({dados});
    }
}