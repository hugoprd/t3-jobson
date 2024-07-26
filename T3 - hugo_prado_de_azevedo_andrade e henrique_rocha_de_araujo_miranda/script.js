var cadastroCliente = document.querySelector(".incluirCliente");
var consultaCliente = document.querySelector(".consultarCliente");
var linhaTabelaCliente = document.getElementById('tabelaClientes');
var id = 0;
//let cpfs = [];
//let cliente;
//let dados = [];

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

/*function cpfDiferente(sCpf){
    if (dados.length == 0) {
        return true;
        
    }
    //console.log(sCpf);
    console.log({dados});
    dados.forEach(i =>{
        console.log(i.cpf != sCpf);
        if(i.cpf != sCpf){
            console.log(i.cpf != sCpf);
            return true;
        }
    })
}*/


/*function cpfDiferente(sCpf){

    if (cpfs.length == 0) {
        return true;
        
    }


    cpfs.forEach(i =>{
        if(i != sCpf){
            console.log(i != sCpf);
            return true;
        }
    })
}*/






function validarCpf(cpfN){
    let stringCpfN = cpfN.toString();

    if(stringCpfN.length == 11){
        if(apenasNumeros(stringCpfN) == true){
            if(verificarNumeros(stringCpfN) == false){
                /*if(cpfDiferente(stringCpfN)){
                    console.log(stringCpfN);*/
                    let parte1 = stringCpfN.substring(0, 9);
                    let parte2 = stringCpfN.substring(0, 10);
                    let verificador = stringCpfN.substring(9);
        
                    if(verificarPrimeiroD(parte1, verificador) && verificarSegundoD(parte2, verificador)){
                        return stringCpfN;
                    }else{
                        mensagemErroCpf();
                        
                    }
                /*}else{
                    let erro = document.getElementById("cpfErro");

                    erro.innerHTML = "CPF inválido!2";
                }*/
            }else{
               mensagemErroCpf();

               
            }
        }else{
            mensagemErroCpf();

            
        }
    }else{
        mensagemErroCpf();

        
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

/*function criarCliente(c, n, d){ //cpf nome data
    return {cpf: c, nome: n, data: d};
}*/

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

/*function limparLocalStorage(){
    localStorage.removeItem('dadosTabela');
    //alert('LocalStorage limpo!');
}*/

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
    let linha = document.getElementById('linha' + id);
    linha.innerHTML = '';
    id--;
}

function formataNome(name){
      // divide o nome em palavras pelo espaço
      let palavras = name.split(" ");

      // primeira letra de cada palavra maiuscula
      let palavrasM = palavras.map(i => {
          // sem palavra vazia
          if (i.length > 0) {
              // bota só a primeira letra maiuscula
              return i.charAt(0).toUpperCase() + i.slice(1).toLowerCase();
          } else {
              return i;
          }
      });
  
      // junta tudo
      return palavrasM.join(" ");
    
}

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

    junta = partes.join("-");
//coloca . na ultima parte
    partes2.push(junta);
    partes2.push(sCpf.substring(9));

    junta = partes2.join(".");
//junta as duas partes
    return junta;
}

function formatarData(date) {
    let data = date.toString();
    console.log(data);
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

function salvarCliente(){
    let cpf = document.getElementById("cpfTxt").value;
    let nome = document.getElementById("nomeTxt").value.trim();
    let data_nascimento = document.getElementById("dataTxt").value;

    let erro = document.getElementById("cpfErro");
    erro.innerHTML = "";

    if(validarCpf(cpf) && validarNome(nome) && validarIdade(data_nascimento)){
        //cliente = criarCliente(cpf, nome, data_nascimento);
        //console.log({cliente});

        //salvarTabela(cliente.cpf, cliente.nome, cliente.data);
        //dados.push(cliente);
        //localStorage.setItem('dadosTabela', JSON.stringify(dados));
        //console.log({dados});

        //cpfs.push(cpf);
        //console.log({cpfs});

        let name = formataNome(nome);
        let cpfF = formataCpf(cpf);
        let data = formatarData(data_nascimento);


        linhaTabelaCliente.innerHTML += `<tr class="linhaTab" id="linha${id}"><td>${cpfF}</td>
        <td>${name}</td><td>${data}</td><td><button id="btlinha${id}" onclick= "excluiLinhaCliente(${id})">Excluir</button><button>Alugar</button></td></tr>`;

        consultarCliente();
        id++;

    }
}

function main(){
    //let dadosSalvos = localStorage.getItem('dadosTabela');

    /*if(dadosSalvos){
        dados = JSON.parse(dadosSalvos);
        console.log({dados});
    }*/
}