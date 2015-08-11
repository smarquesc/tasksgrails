<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Tarefas</title>

<script type="text/javascript" src="${createLinkTo(dir: 'js', file: "jquery-2.1.4.js")}"></script>
<link rel="stylesheet" type="text/css" href="${createLinkTo(dir: 'css', file: '02-tasks.css')}" media="screen" />
<script src="${createLinkTo(dir: 'js', file: "jquery.validate.js")}" ></script>
<script type="text/javascript" src= "${createLinkTo(dir: 'js', file: "jquery.tmpl.js")}"></script>
<script src="${createLinkTo(dir: 'js', file: "jquery-serialization.js")}"></script>
<script src="${createLinkTo(dir: 'js', file: "tasks-controller.js")}"></script>



<script src="${createLinkTo(dir: 'js', file: "tasks-webstorage.js")}"></script>

<!-- adcionada biblioteca 'datejs' para interpretação das datas -->

<script type='text/javascript' src="${createLinkTo(dir: 'js/datejs/src/globalization', file: 'pt-BR.js')}"></script>
<script type='text/javascript' src="${createLinkTo(dir: 'js/datejs/src', file: 'core.js')}"></script>
<script type='text/javascript' src="${createLinkTo(dir: 'js/datejs/src', file: 'sugarpak.js')}"></script>
<script type='text/javascript' src="${createLinkTo(dir: 'js/datejs/src', file: 'parser.js')}"></script>

</head>
<body>
	<header>
		<span>Lista de Tarefas</span>
	</header>
	<main id="taskPage">
		<section id="taskCreation" class="not">
			<form id="taskForm">
				<div>
					<label>Tarefa</label> 
					<input type="text" maxlength="200" required="required" name="task" class="large" placeholder="Estudar e programar" />
				</div>
				<div>
					<label>Finalizar até</label> <input type="date" required="required" name="requiredBy" />
				</div>
				<div>
				<input type="hidden" name="id" />
				<input type="hidden" name="completed"/>
				</div>
				<div>
					<label>Categoria</label> 
					<select name="category">
						<option value="Pessoal">Pessoal</option>
						<option value="Profissional">Profissional</option>
					</select>
				</div>
				<nav>
					<a href="#" id="saveTask">Salvar tarefa</a> <a href="#" id="clearTask">Limpar tarefa</a>
				</nav>
			</form>
		</section>
		<section>
			<table id="tblTasks">
				<colgroup>
					<col width="40%">
					<col width="15%">
					<col width="15%">
					<col width="30%">
				</colgroup>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Deadline</th>
						<th>Categoria</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</table>
			<nav>
				<a href="#" id="btnAddTask">Adicionar tarefa</a>
			</nav>
		</section>
	</main>
	<footer>Você tem <span id="taskCount"></span> tarefas</footer>
</body>

<script type="text/javascript"> 
    $(document).ready(function() {	
		tasksController.init($('#taskPage'));
		tasksController.loadTasks();
	});
</script>

<script id="taskRow" type="text/x-jQuery-tmpl">
    <tr>
	<td>{{= task}}</td>
	<td><time datetime="{{= requiredBy}}">{{= requiredBy}}</time></td>
	<td>{{= category}}</td>
	<td>
		<nav>
			<a href="#" class="editRow" data-task-id="{{= id}}">Editar</a>
			<a href="#" class="completeRow" data-task-id="{{= id}}">Completar</a>
			<a href="#" class="deleteRow" data-task-id="{{= id}}">Deletar</a>
		</nav>
	</td>
    </tr>
</script>

</html>
