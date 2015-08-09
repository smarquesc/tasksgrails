package com.grailsinaction

class Categoria {

	String nome

    static constraints = {
        nome(blank: false)	
    }
	
	static hasMany = [ Tarefa ]
	
}
