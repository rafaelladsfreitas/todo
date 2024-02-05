import { useState } from "react";
import { Tarefa } from "../Tarefa";
import { StyleForm, StyleList } from "./style";

export function List() {
        //State / Estado
        //nome do estado, função atualizadora

        //se o storage for diferente de null, faz a conversão e insere os valores no state
        //caso contrário, inicia o storage vazio
    const [listaTarefas, setListaTarefas] = 
    useState(localStorage.getItem('tarefas') != null ? JSON.parse(localStorage.getItem('tarefas')) : []);

    const [novaTarefa, setNovaTarefa] = useState('');    

    //session_storage() -> Guarda em sessão (enquanto o browser está aberto)
    //local_storage() -> Guarda em um espaço de memória do navegador


    /*
    const listaTarefas = [
        {titulo: 'Fazer compras', id: 1},
        {titulo: 'Estudar react', id: 2},
        {titulo: 'Pagar contas', id: 3},                                                      
        {titulo: 'Pegar um café', id: 4},   
    ] */   
    
    function addTarefa(){
        //listaTarefas.push({titulo:'Nova tarefa', id:5})
        //...listaTarefas -> Faz uma cópia da lista e em seguida adiciona
        setListaTarefas([...listaTarefas,{titulo: novaTarefa, id: new Date().getTime()}]);
        setNovaTarefa('');        
    }

    function removeTarefa(id){
        //console.log('tarefa removida '+id);

        setListaTarefas(
            listaTarefas.filter(tarefa => (tarefa.id != id))
        )

    }

    return (
        <>
            {
                //Guardando o valor do estado em um storage do navegador
                localStorage.setItem('tarefas',JSON.stringify(listaTarefas))
            }
            
            <StyleForm>
                <input 
                    type="text" 
                    placeholder="Criar nova tarefa" 
                    value={novaTarefa}
                    onChange={(e)=>setNovaTarefa(e.target.value)} //o (e) é a resposta do evento 
                    onKeyUp={(e)=> e.key == 'Enter' ? addTarefa() : ''} //o addTarefa aqui precisa passar os parenteses pois precisa identificar que é uma função dentro do Ternário
                />
                <button onClick={addTarefa}>Criar</button> 
            </StyleForm>

            <StyleList>
                <h2>Lista de Tarefas</h2>

                {
                    // onRemove={removeTarefa} -> passando uma função para o componente tarefa
                    listaTarefas.map(tarefa => (
                        <Tarefa 
                            key={tarefa.id} 
                            titulo={tarefa.titulo}                       
                            id={tarefa.id} 
                            onRemove={removeTarefa} 
                        />
                    ))
                }                                        
            </StyleList>
        </>

    )
}