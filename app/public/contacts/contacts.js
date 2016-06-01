'use strict';

angular.module('contactApp.contacts', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'contactsCtrl'
  });
}])

.controller('contactsCtrl', ['$scope','$firebaseArray',function($scope, $firebaseArray) {
	var ref = new Firebase('https://my-contactapp.firebaseio.com/contacts');
	$scope.contacts= $firebaseArray(ref);
	
	$scope.showAddForm=function(){
		$scope.addForm = true;
		console.log($scope.addForm);
	}	

	$scope.showEditForm=function(contact){
		$scope.editForm = true;
		console.log('getting contact');
			

			$scope.id = contact.$id;
			$scope.name = contact.name;
			$scope.company = contact.company;
			$scope.email = contact.email;
			$scope.work_phone = contact.phone[0].work;
			$scope.mobile_phone = contact.phone[0].mobile;
			$scope.home_phone = contact.phone[0].home;
			$scope.address = contact.address[0].street_address;
			$scope.city = contact.address[0].city;
			$scope.state = contact.address[0].state;
			$scope.zip_code = contact.address[0].zip_code;

	}	

	$scope.hide =function () {
		$scope.addForm =false;
		$scope.contactShow = false;		
	}

	$scope.addFormSubmit = function(){

		if($scope.name){var name =$scope.name;} else {var name=null;}
		if($scope.email){var email =$scope.email;} else {var email=null;}
		if($scope.company){var company =$scope.company;} else {var company=null;}
		if($scope.work_phone){var work_phone =$scope.work_phone;} else {var work_phone=null;}
		if($scope.home_phone){var home_phone =$scope.home_phone;} else {var home_phone=null;}
		if($scope.mobile_phone){var mobile_phone =$scope.mobile_phone;} else {var mobile_phone=null;}
		if($scope.address){var address =$scope.address;} else {var address=null;}
		if($scope.city){var city =$scope.city;} else {var city=null;}
		if($scope.state){var state =$scope.state;} else {var state=null;}
		if($scope.zip_code){var zip_code =$scope.zip_code;} else {var zip_code=null;}

		console.log('adding contact....');

		$scope.contacts.$add({
			name: name,
			email:email,
			company:company,
			phone:[{
				mobile:mobile_phone,
				home:home_phone,
				work:work_phone
			}],
			address:[{
				street_address:address,
				city:city,
				state:state,
				zip_code:zip_code
			}]

		}).then(function(ref){
			var id =ref.key();
			console.log('added contact with ID:'+id);

			clearFields();

			$scope.addForm = false;
			$scope.msg ="Contact added !"
		});
	}
		$scope.editFormSubmit =function(){
			console.log('editing contact..');

			//Get id
			var id = $scope.id;

			//get record
			var record= $scope.contacts.$getRecord(id); 

			//assign values

			record.name = $scope.name;
			record.email = $scope.email;
			record.company = $scope.company;
			record.phone[0].work = $scope.work_phone;
			record.phone[0].home = $scope.home_phone;
			record.phone[0].mobile = $scope.mobile_phone;
			record.address[0].street_address = $scope.address;
			record.address[0].city = $scope.city;
			record.address[0].state = $scope.state;
			record.address[0].zip_code = $scope.zip_code;

			//save contact
			$scope.contacts.$save(record).then(function(ref){
				console.log(ref.key);
			});

			clearFields();

			//hide form
			$scope.editForm = false;
			$scope.msg = 'contact upadated !'
		}

		$scope.showContact = function(contact){
			console.log('getting contact');
			$scope.contactShow = true;

			$scope.name = contact.name;
			$scope.company = contact.company;
			$scope.email = contact.email;
			$scope.work_phone = contact.phone[0].work;
			$scope.mobile_phone = contact.phone[0].mobile;
			$scope.home_phone = contact.phone[0].home;
			$scope.address = contact.address[0].street_address;
			$scope.city = contact.address[0].city;
			$scope.state = contact.address[0].state;
			$scope.zip_code = contact.address[0].zip_code;

			

		}

		$scope.removeContact = function(contact){
			console.log('removing contact');

			$scope.contacts.$remove(contact);
			$scope.msg='contact remove';
		}

		
		function clearFields(){
			console.log('cleaing the fields');
			
			$scope.name='';
			$scope.email='';
			$scope.company='';
			$scope.address='';
			$scope.work_phone='';
			$scope.home_phone='';
			$scope.mobile_phone='';
			$scope.city='';
			$scope.state='';
			$scope.zip_code='';
		}

	
}]);