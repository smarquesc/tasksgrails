<%@ page import="com.grailsinaction.Tarefa" %>



<div class="fieldcontain ${hasErrors(bean: tarefaInstance, field: 'nome', 'error')} required">
	<label for="nome">
		<g:message code="tarefa.nome.label" default="Nome" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="nome" required="" value="${tarefaInstance?.nome}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: tarefaInstance, field: 'categoria', 'error')} required">
	<label for="categoria">
		<g:message code="tarefa.categoria.label" default="Categoria" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="categoria" name="categoria.id" from="${com.grailsinaction.Categoria.list()}" optionKey="id" required="" value="${tarefaInstance?.categoria?.id}" class="many-to-one"/>

</div>

<div class="fieldcontain ${hasErrors(bean: tarefaInstance, field: 'categorias', 'error')} ">
	<label for="categorias">
		<g:message code="tarefa.categorias.label" default="Categorias" />
		
	</label>
	<g:select name="categorias" from="${com.grailsinaction.Categoria.list()}" multiple="multiple" optionKey="id" size="5" value="${tarefaInstance?.categorias*.id}" class="many-to-many"/>

</div>

<div class="fieldcontain ${hasErrors(bean: tarefaInstance, field: 'deadline', 'error')} required">
	<label for="deadline">
		<g:message code="tarefa.deadline.label" default="Deadline" />
		<span class="required-indicator">*</span>
	</label>
	<g:datePicker name="deadline" precision="day"  value="${tarefaInstance?.deadline}"  />

</div>

