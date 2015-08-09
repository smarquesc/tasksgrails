package com.grailsinaction

class Tarefa {

	String nome
	Date deadline
	Categoria categoria

    static constraints = {
        nome(blank: false)
    }
	
    static hasMany = [ categorias : Categoria ]
	
    static belongsTo = [ Categoria ]	
	
}
