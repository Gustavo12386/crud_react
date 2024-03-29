import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Editar() {

  //criar uma nova variavel com state  
  const [data, setData] = useState({
    id:'',
    nome:'',
    email:'',
  });
  
  const [message, setMessage] = useState("");

  //receber o parâmetro enviado pela url  
  const router = useRouter();
  const [id] = useState(router.query.id);
  console.log(router.query.id);

  //Criar a função com requisição com a API
  const getUser = async () => {
    //Se não for encontrado o id do usuário
    if(id === undefined ){
        setMessage("Usuario não encontrado!");
        return
    }

    await axios.get("http://localhost:8080/users/" + id)
    .then((response) => {
       setData(response.data.user);
    }).catch((error) => {
       if(error.response){
        setMessage(error.response.data.mensagem);
       }else{
         setMessage("Erro! Tente novamente mais tarde.");
       }
    });
  }

  //O useEffect é utilizado para efeitos colaterais no componente. Por exemplo, atualizar o estado do componete, fazer chamadas de APIS,etc.  
  useEffect(() => {
    getUser();
  }, [id]);

  const valueInput = (e) => setData({...data, [e.target.name]: e.target.value});

  const editUser = async (e) => {
     e.preventDefault();

     const headers = {
        'headers': {
            'Content-Type': 'application/json'
          }
     }

     await axios.put('http://localhost:8080/users', data, headers)
     .then((response) => {
        setMessage(response.data.mensagem);
     }).catch((error) => {
        if(err.response){
            setMessage(err.response.data.mensagem);
          } else{
            setMessage("Ocorreu um erro!");
          }
     })
  }

  return (
    <>
      <Head>
        <title>CRUD</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

      <Link href={"/"}><button type="button">Listar</button></Link>{" "}
      <Link href={`/visualizar/${data.id}`}><button type="button">Visualizar</button></Link>{" "}

       <h2>Editar Usuário</h2>

       {message ? <p>{message}</p> : ""}   

       <form onSubmit={editUser}>
        <input type="hidden" name="id" value={data.id}/>
        <label>Nome:</label>
        <input type="text" name="name" placeholder="Digite o nome" onChange={valueInput} value={data.name ?? ""}/><br/><br/>
        <label>Email:</label>
        <input type="email" name="email" placeholder="Digite o email" onChange={valueInput} value={data.email ?? ""}/><br/><br/>
        <button>Enviar</button><br/><br/>
       </form>   

      </main>
    </>
  );
}