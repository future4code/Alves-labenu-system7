class Class {    
    private id: string | undefined 
    private nome: string
    private modulo: string | undefined
    
    constructor(nome: string, id?: string, modulo?: string){
        this.nome = nome  
        this.id = id
        this.modulo = modulo     
    }
    getIdClass(){
        return this.id
    }

    getNome(){
        return this.nome
    }   
    getModulo(){
        return this.modulo
    }   
}
export default Class