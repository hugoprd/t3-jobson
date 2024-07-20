var cadastroCliente = document.querySelector(".incluirCliente");

function formularioCliente(){
    cadastroCliente.style.display = "block";
}

function validarCpf(){

}

function validarNome(name){
    if(name.length >= 4 && name.length <= 80){
        return true;
    }
    else{
        let erro = document.getElementById("nomeErro");

        erro.innerHTML = "Nome deve ter de 4 a 80 caractéres!";
    }
}

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
    let cpf = document.getElementById("cpfTxt");
    let nome = document.getElementById("nomeTxt").value.trim();
    let data_nascimento = document.getElementById("dataTxt").value;

    validarCpf();
    validarNome(nome);
    validarIdade(data_nascimento);
}

/*function main(){
    formularioCliente();
}*/