var cadastroCliente = document.querySelector(".incluirCliente");

function formularioCliente(){
    cadastroCliente.style.display = "block";
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

function validarCpf(cpfN){
    let stringCpfN = cpfN.toString();

    if(stringCpfN.length == 11){
        if(apenasNumeros(stringCpfN) == true){
            if(verificarNumeros(stringCpfN) == false){
                let parte1 = stringCpfN.substring(0, 9);
                let parte2 = stringCpfN.substring(0, 10);
                let verificador = stringCpfN.substring(9);

                if(verificarPrimeiroD(parte1, verificador) && verificarSegundoD(parte2, verificador)){
                    return true;
                }
            }
        }
    }
    else{
        let erro = document.getElementById("cpfErro");

        erro.innerHTML = "CPF inválido!";
    }
}

//VERIFICACAO NOME
function validarNome(name){
    if(name.length >= 4 && name.length <= 80){
        return true;
    }
    else{
        let erro = document.getElementById("nomeErro");

        erro.innerHTML = "Nome deve ter de 4 a 80 caractéres!";
    }
}

//interface Usuario = {}

//VERIFICACAO DATA
function validarIdade(data){
    let erro = document.getElementById("dataErro");
    let dataNascimento = new Date(data);
    let dataAtual = new Date();
    let diferenca = dataAtual.getTime() - dataNascimento.getTime();
    let idade = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365.25));

    if(idade >= 18){
        return true;
    }
    else if(idade < 18){
        erro.innerHTML = "Cliente tem " + idade + " anos. Deve ter pelo menos 18!";
    }
    else{
        erro.innerHTML = "Data inválida!";
    }
}

function salvarCliente(){
    let cpf = document.getElementById("cpfTxt").value;
    let nome = document.getElementById("nomeTxt").value.trim();
    let data_nascimento = document.getElementById("dataTxt").value;

    let cliente = {cpf: cpf,nome: nome,data: data_nascimento};
    //CADASTRAR CLIENTE
    let clientes = [];
    clientes.push(cliente);
}

/*function main(){
    formularioCliente();
}*/