
tasksController = function() {	
	function errorLogger(errorCode, errorMessage) {
		console.log(errorCode +':'+ errorMessage);
	}
	var taskPage;
	var initialised = false;   
	return {
		init : function(page) {
			if (!initialised) {				
				storageEngine.init(function() {
					storageEngine.initObjectStore('task', function() {}, 
					errorLogger); 
				}, errorLogger); 
				
				taskPage = page;
				$(taskPage).find( '[required="required"]' ).prev('label').append( '<span>*</span>').children( 'span').addClass('required');
				$(taskPage).find('tbody tr:even').addClass( 'even');
				
				
				$(taskPage).find( '#btnAddTask' ).click( function(evt) {
					evt.preventDefault();
					$(taskPage ).find('#taskCreation' ).removeClass( 'not');
					
				});
				$(taskPage).find('tbody tr' ).click(function(evt) {
					$(evt.target ).closest('td').siblings( ).andSelf( ).toggleClass( 'rowHighlight');
				});
				$(taskPage).find('#tblTasks tbody').on('click', '.deleteRow', 
					function(evt) { 					
						//console.log('teste');
						storageEngine.delete('task', $(evt.target).data().taskId, 
							function() {
								$(evt.target).parents('tr').remove(); 
							}, errorLogger);
						$(taskPage).find('#tblTasks tbody').empty(); // limpa visualização
						tasksController.loadTasks(); // recarrega atividades
					}
				);	
				$(taskPage).find('#saveTask').click(function(evt) {
					evt.preventDefault();
					if ($(taskPage).find('form').valid()) {
						var task = $(taskPage).find('form').toObject();		
						storageEngine.save('task', task, function() {
							$(taskPage).find('#tblTasks tbody').empty();
							tasksController.loadTasks();
							$(':input').val('');
							$(taskPage).find('#taskCreation').addClass('not');
						}, errorLogger);
					}
				});
				$(taskPage).find('#clearTask').click(function(evt) {
					$(":input").val(''); // limpa todos os inputs da página
				});
				$(taskPage).find('#tblTasks tbody').on('click', '.completeRow', 
					function(evt) { 
					storageEngine.findById('task', $(evt.target).data().taskId, function(task) {
							//console.log(task);
							task['completed'] = "OK";
							storageEngine.save('task', task, function() {
							$(taskPage).find('#tblTasks tbody').empty();
							tasksController.loadTasks();
						}, errorLogger);
							
						}, errorLogger);
				});
				$(taskPage).find('#tblTasks tbody').on('click', '.editRow', 
					function(evt) { 
						$(taskPage).find('#taskCreation').removeClass('not');
						storageEngine.findById('task', $(evt.target).data().taskId, function(task) {
							console.log(task);
							$(taskPage).find('form').fromObject(task);
						}, errorLogger);
				});
				
				initialised = true;
			}
    	},
		loadTasks : function() {
			var count = 0; // contador zerado
			var today = Date.today(); // cria objeto Date para a Data de hoje
			//setTimeout(function(){
			storageEngine.findAll('task', 
			//storageEngine.findAllnotOrdained('task', // para exibição não ordenada			
				function(tasks) {
					$.each(tasks, function(index, task) {
						$('#taskRow').tmpl(task).appendTo( $(taskPage ).find( '#tblTasks tbody'));
						if (!(task['completed'])) {
							var data = Date.parseExact(task['requiredBy'], "yyyy-M-d");  // cria objeto Date para a data da tupla
							if (Date.compare(today, data) > 0) {
								//console.log("Data Passou");
								$(taskPage).find('tbody tr:last-child').addClass("overdue"); // adicionando Class na 'tr' da tarefa 
							} else if (Date.compare(today, data) === 0) {
								//console.log("Data de Hoje");
								$(taskPage).find('tbody tr:last-child').addClass("warning"); // adicionando Class na 'tr' da tarefa 
							}
							count++; // incremetar contador a cada consulta
						} else {
							$(taskPage).find('tbody tr:last-child td').addClass("taskCompleted"); // adicionando Class a todas as 'td' da tarefa 
							$(taskPage).find('tbody tr:last-child td:last-child').removeClass("taskCompleted"); // retirando Class da 'td' onde ficam os botões da tarefa 
							$(taskPage).find('tbody tr:last-child .completeRow').hide();
							$(taskPage).find('tbody tr:last-child .editRow').hide();
						}
						
					});
					
					$('#taskCount').text(count); // atualiza contador na página
					
				}, 
				errorLogger);
				//}, 200);
		}		
	}
}();
