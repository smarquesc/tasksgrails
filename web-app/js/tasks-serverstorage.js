storageEngine = function() {
	
	function getStorageObject(type) {
		var item = localStorage.getItem(type);
		var parsedItem = JSON.parse(item);
		return parsedItem;
	}
	
	var initialized = false;
	var initializedObjectStores = {};
	
	
	return {
		init : function(successCallback, errorCallback) {
			if (window.localStorage)  {
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
			
			else if (!localStorage.getItem(type)) {
				localStorage.setItem(type, JSON.stringify({}));
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
			var result = [];	
			
			var storageItem = getStorageObject(type);
			$.each(storageItem, function(i, v) {
				result.push(v);
			});
			console.log(typeof result);
			console.log(result);
			successCallback(result);
		},
		findAll : function(type, successCallback, errorCallback) {
			if (!initialized) {
				errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
			} else if (!initializedObjectStores[type]) {
				errorCallback('store_not_initialized', 'The object store '+type+' has not been initialized');
			}
                        
			var result = [];
			var storageItem ={};
                        var storageItem = getStorageObject(type);
                        /*setTimeout(function(){
                        var storageItem =  $.ajax({
                            method:"POST",
                            url:"findAll",
                            dataType: "json",
                            data:  {localStorage:JSON.stringify({"1439243041468":{"task":"ASd","requiredBy":"1212-12-12","id":1439243041468,"completed":"","category":"Pessoal"},"1439249171310":{"task":"TEste","requiredBy":"1212-12-12","id":1439249171310,"completed":"","category":"Profissional"},"1439249185411":{"task":"hoje","requiredBy":"2015-08-10","id":1439249185411,"completed":"","category":"Profissional"},"1439249195923":{"task":"Futuro","requiredBy":"2112-12-12","id":1439249195923,"completed":"","category":"Pessoal"},"1439249285986":{"task":"asddas","requiredBy":"1212-12-12","id":1439249285986,"completed":"","category":"Pessoal"}})} ,
                            onComplete: function(transport){
                if (200 == transport.status) {
                result = transport.responseText;
                alert(result);
            }
        }
                        });
                        console.log(storageItem);
                        }, 200);
                        */
                        
                        console.log(storageItem);
			$.each(storageItem, function(i, v) {
				result.push(v);
			});
                        
			result.sort(function (A, B) { // ordenando por data
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
                        
			successCallback(result);
                        
                        
		},
		
		save: function(type, obj, successCallback, errorCallback) {
			if (!initialized) {
				errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
			} else if (!initializedObjectStores[type]) {
				errorCallback('store_not_initialized', 'The object store '+type+' has not been initialized');
			}   
			if (!obj.id) {
				obj.id = $.now();
			}
			
			var storageItem = getStorageObject(type); 
			storageItem[obj.id] = obj;
			//localStorage.setItem(type, JSON.stringify(storageItem));
                        $.ajax({
                            method:"POST",
                            url:"save",
                            data:  {localStorage:JSON.stringify(storageItem)} 
                        });
			successCallback(obj);
		},
		delete : function(type, id, successCallback, errorCallback) { 
			if (!initialized) {
				errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
			} else if (!initializedObjectStores[type]) {
				errorCallback('store_not_initialized', 'The object store '+type+' has not been initialized');
			}
			var storageItem = getStorageObject(type); 
			if (storageItem[id]) {
				delete storageItem[id];
				//localStorage.setItem(type, JSON.stringify(storageItem));
                                $.ajax({
                                    method:"POST",
                                    url:"delete",
                                    data:  {localStorage:JSON.stringify(storageItem)} 
                                 });
                                successCallback(id);
			} else {
				errorCallback("object_not_found","The object requested could not be found");
			}
		},
		findByProperty : function(type, propertyName, propertyValue, successCallback, errorCallback) {
			if (!initialized) {
				errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
			} else if (!initializedObjectStores[type]) {
				errorCallback('store_not_initialized', 'The object store '+type+' has not been initialized');
			}
			var result = [];
			var storageItem = getStorageObject(type); 
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
			var storageItem = getStorageObject(type); 
			var result = storageItem[id];
			successCallback(result);
		}
	}
}();
