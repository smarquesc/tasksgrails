
<%@ page import="com.grailsinaction.Tarefa" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'tarefa.label', default: 'Tarefa')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-tarefa" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-tarefa" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
				<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
			<thead>
					<tr>
					
						<g:sortableColumn property="nome" title="${message(code: 'tarefa.nome.label', default: 'Nome')}" />
					
						<th><g:message code="tarefa.categoria.label" default="Categoria" /></th>
					
						<g:sortableColumn property="deadline" title="${message(code: 'tarefa.deadline.label', default: 'Deadline')}" />
					
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
				<g:each in="${tarefaInstanceList}" status="i" var="tarefaInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${tarefaInstance.id}">${fieldValue(bean: tarefaInstance, field: "nome")}</g:link></td>
					
						<td>${fieldValue(bean: tarefaInstance, field: "categoria")}</td>
					
						<td><g:formatDate date="${tarefaInstance.deadline}" /></td>
					
						<td>
							<g:form url="[resource:tarefaInstance, action:'delete']" method="DELETE">
								<fieldset class="buttons">
									<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
								</fieldset>
							</g:form>
						</td>											
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${tarefaInstanceCount ?: 0}" />
			</div>
		</div>
	</body>
</html>
