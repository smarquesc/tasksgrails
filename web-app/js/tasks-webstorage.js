storageEngine = function() {
	
	/* funcao para exibicao de erros */
	function errorLogger(errorCode, errorMessage) {
		console.log(errorCode +':'+ errorMessage);
	}
	
	var db,request; // declaração de variáveis para uso do storageEngine
//	db = [];
//	db.push('transaction');
//	db.transaction = function(){};
//	db.transaction.push('objectStore');
//	db.transaction.objectStore= function(){};
	
	/* inicializador do Banco IndexedDB */
	function initDB(type, successCallback, errorCallback) { 
	
			if (typeof(type)==='undefined') type = "task"; // setando objectStore default
			
			request = indexedDB.open("TaskDB");  // requisitando abertura do  Banco IndexedDB
			
			/* eventos da requisição */
			
			request.onsuccess = function (evt) { 
				db = request.result;  
				console.log("Requisitando Banco!");
				successCallback(null);
			};
 
            request.onerror = function (evt) {
				console.log("IndexedDB error: " + evt.target.errorCode	);
				errorCallback('storage_api_not_supported', 'The web storage api is not supported')
            };
 
            request.onupgradeneeded = function (evt) {              
				var objectStore = evt.currentTarget.result.createObjectStore(type, { keyPath: "id",});
				objectStore.transaction.oncomplete = function (evt) {
					console.log("Banco " + type +  " criado!"); // realizado quando o banco é novo
				}
			}
	}
	
	/* função para transações com o IndexedDB */
	function getStorageObject(type) {
	
		var transaction = db.transaction(type, "readwrite"); 
        return transaction.objectStore(type);
       
	}
	
	var initialized = false;
	var initializedObjectStores = {};
	
	initDB(undefined,function() {}, errorLogger); // pré-carregamento do Banco IndexedDB
	
	
	
	return {
		init : function(successCallback, errorCallback) {
            if(window.indexedDB) {
				initialized = true;
				successCallback(null);
			} 
			else {
				errorCallback('storage_api_not_supported', 'The web storage api is not supported');
			}
		},
		initObjectStore : function(type, successCallback, errorCallback) {
			
			if (!initialized) {
				errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
			}
			
			else if (type !== "task") {
				initDB(type, function() {}, errorLogger); // cria novo objectStore no Banco IndexedDB
			}
			
			initializedObjectStores[type] = true;
			successCallback(null);

		},
		findAllnotOrdained : function(type, successCallback, errorCallback) {
			if (!initialized) {
				errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
			} else if (!initializedObjectStores[type]) {
				errorCallback('store_not_initialized', 'The object store '+type+' has not been initialized');
			}
			//debugger;
			var result = []; // resultado ordenado
			var consulta = {}; // armazenador das consultas
			var count = 0; // contados de consultas armazenadas
            var objectStore = getStorageObject(type); // carrega funcão de transação com o Banco IndexedDB
			var request = objectStore.openCursor(); // navega pela objectStore
			request.onsuccess = function(evt) {  
				var cursor = evt.target.result;  
			
                if (cursor) {                            
					console.log(count); 
					console.log(cursor.value);
					consulta[count] = cursor.value; // incrementa com o count o novo objeto consultado
					count +=1; 
					cursor.continue(); 
					//debugger;
                }   
                else {  
					console.log("Sem mais entradas!"); //fim da navegação 
					var storageItem = consulta;
					//debugger;
					$.each(storageItem, function(i, v) { 
							result.push(v);
					}); 
					successCallback(result);	// retorna resultado ordenado
                }  	
			};			
		},
		findAll : function(type, successCallback, errorCallback){
			if (!initialized) {
				errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
			} else if (!initializedObjectStores[type]) {
				errorCallback('store_not_initialized', 'The object store '+type+' has not been initialized');
			}
			//debugger;
			var result = []; // resultado ordenado
			var consulta = {}; // armazenador das consultas
			var count = 0; // contados de consultas armazenadas
			console.log('Primeiro');
			
			setTimeout(function(){
			
			console.log('Primeiro setTime');
			
			var objectStore = getStorageObject(type); // carrega funcão de transação com o Banco IndexedDB
			var request = objectStore.openCursor(); // navega pela objectStore
			request.onsuccess = function(evt) {  
				var cursor = evt.target.result;  
			
                if (cursor) {                            
					console.log(count); 
					console.log(cursor.value);
					consulta[count] = cursor.value; // incrementa com o count o novo objeto consultado
					count +=1; 
					cursor.continue(); 
					//debugger;
                }   
                else {  
					console.log("Sem mais entradas!"); //fim da navegação 
					var storageItem = consulta;
					//debugger;
					$.each(storageItem, function(i, v) { 
							result.push(v);
					}); 
					result.sort(function (A, B) { // ordena as datas
					var dataA = Date.parseExact(A.requiredBy, "yyyy-M-d");  
					var dataB = Date.parseExact(B.requiredBy, "yyyy-M-d");  
					if (dataA < dataB) {
						return 1;
					  }
					  if (dataA > dataB) {
						return -1;
					  }
					  return 0;
				});
				successCallback(result);	// retorna resultado ordenado
                }  	
			};		
			}, 200);
			console.log('Segundo');
            
		},
		save: function(type, obj, successCallback, errorCallback) {
			if (!initialized) {
				errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
			} else if (!initializedObjectStores[type]) {
				errorCallback('store_not_initialized', 'The object store '+type+' has not been initialized');
			}
			
            var objectStore = getStorageObject(type); // carrega funcão de transação com o Banco IndexedDB
               
			if (!obj.id) { // se objeto for novo (sem id)
				obj.id = $.now().toString();
				var request = objectStore.add(obj); // adiciona objeto
				request.onsuccess = function (evt) { 
                        console.log("Entrada adicionada!");  
						successCallback(obj);
            };
			} else {
			var request = objectStore.put(obj); // atualiza objeto
			request.onsuccess = function (evt) { 
                        console.log("Entrada atualizada!");  
						successCallback(obj);
            };
			}
		},
		delete : function(type, id, successCallback, errorCallback) { 
			if (!initialized) {
				errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
			} else if (!initializedObjectStores[type]) {
				errorCallback('store_not_initialized', 'The object store '+type+' has not been initialized');
			}
			
            var objectStore = getStorageObject(type); // carrega funcão de transação com o Banco IndexedDB
			
            var request = objectStore.delete(id.toString()); // deleta objeto pela id
            request.onsuccess = function(evt) {  
                        console.log("ID deletada!");  
						successCallback(id);
            };
		},
		findByProperty : function(type, propertyName, propertyValue, successCallback, errorCallback) {
			if (!initialized) {
				errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
			} else if (!initializedObjectStores[type]) {
				errorCallback('store_not_initialized', 'The object store '+type+' has not been initialized');
			}
			
			var result = [];
			
			var storageItem = getStorageObject(type); // carrega funcão de transação com o Banco IndexedDB
			
			$.each(storageItem, function(i, v) {
				if (v[propertyName] === propertyValue) {
					result.push(v);
				}
			}); 
			successCallback(result);
		},
		findById : function (type, id, successCallback, errorCallback)	{
			if (!initialized) {
				errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
			} else if (!initializedObjectStores[type]) {
				errorCallback('store_not_initialized', 'The object store '+type+' has not been initialized');
			}
			
            var objectStore = getStorageObject(type); // carrega funcão de transação com o Banco IndexedDB
			
			var request = objectStore.get(id.toString()); // busca objeto pela id
			request.onsuccess = function(evt) {  
				//console.log(request.result);
				successCallback(request.result);
			};
			
		}
	}
}();
