import axios from "axios";


export const serviceDelete = async (url) => {
    var mensagem;   

    await axios.delete(url)
    .then((response) => {
        mensagem = response.data.mensagem;
    }).catch((error) => {
        if(error.response){
            mensagem = error.response.data.mensagem;
          } else{
            mensagem = "Erro! Tente novamente mais tarde!";
          }
    })


    return mensagem
}