(function(){"use strict";var a;a=angular.module("ebenezerApp",["ngResource","ngSanitize","ngRoute","ebenezerApp.storageService","ebenezerApp.webService"]),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/home",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),a.config(["$httpProvider",function(a){var b;return b=["$rootScope","$location","$q","storageService",function(a,b,c,d){var e,f;return f=function(a){return a},e=function(e){var f;return 401===e.status?(f=c.defer(),d.logout(),b.url("/"),a.$broadcast("notify",{message:"Sorry, an authentication error has occurred."}),f.promise):c.reject(e)},function(a){return a.then(f,e)}}],a.responseInterceptors.push(b)}])}).call(this),function(){"use strict";var a,b;a=function(){function a(){}return a.prototype.store=function(a,b){return localStorage.setItem(a,b)},a.prototype.get=function(a){return localStorage.getItem(a)},a.prototype.deleteItem=function(a){return localStorage.removeItem(a)},a.prototype.logout=function(){return localStorage.removeItem("email"),localStorage.removeItem("token")},a}(),b=angular.module("ebenezerApp.storageService",[]),b.factory("storageService",function(){return new a})}.call(this),function(){"use strict";var a,b;a=function(){function a(a,b){this.$http=a,this.storageService=b,this.baseUrl="/api/v1/"}return a.prototype.login=function(a){return this.$http.post(this.baseUrl+"login",{user:{email:a.email,password:a.password}})},a.prototype.getAuthHeaders=function(){return{email:this.storageService.get("email"),token:this.storageService.get("token")}},a.prototype.logout=function(){return this.$http["delete"](this.baseUrl+"logout",{headers:this.getAuthHeaders()})},a.prototype.getGreeting=function(){return this.$http.get(this.baseUrl+"greet",{headers:this.getAuthHeaders()})},a.prototype.getPosts=function(){return this.$http.get(this.baseUrl+"posts",{headers:this.getAuthHeaders()})},a}(),b=angular.module("ebenezerApp.webService",[]),b.factory("webService",["$http","storageService",function(b,c){return new a(b,c)}])}.call(this),function(){"use strict";var a,b=function(a,b){return function(){return a.apply(b,arguments)}};a=function(){function a(a,c,d,e){this.$scope=a,this.$location=c,this.webService=d,this.storageService=e,this.error=b(this.error,this),this.success=b(this.success,this),this.login=b(this.login,this),this.setup()}return a.prototype.setup=function(){return this.$scope.login=this.login},a.prototype.login=function(a){var b;return b=this.webService.login(a),b.then(this.success,this.error)},a.prototype.success=function(a){return this.storageService.store("token",a.data.token),this.storageService.store("email",a.data.email),this.$location.url("home")},a.prototype.error=function(a){return console.log(a)},a}(),a.$inject=["$scope","$location","webService","storageService"],angular.module("ebenezerApp").controller("LoginCtrl",a)}.call(this),function(){"use strict";var a,b=function(a,b){return function(){return a.apply(b,arguments)}};a=function(){function a(a,c,d,e){this.$scope=a,this.$location=c,this.webService=d,this.storageService=e,this.error=b(this.error,this),this.success=b(this.success,this),this.logout=b(this.logout,this),this.setup()}return a.prototype.setup=function(){return this.$scope.logout=this.logout},a.prototype.logout=function(){var a;return a=this.webService.logout(),a.then(this.success,this.error)},a.prototype.success=function(){return this.storageService.logout(),this.$location.url("/")},a.prototype.error=function(a){return console.log(a),this.storageService.logout(),this.$location.url("/")},a}(),a.$inject=["$scope","$location","webService","storageService"],angular.module("ebenezerApp").controller("NavigationCtrl",a)}.call(this),function(){"use strict";var a,b=function(a,b){return function(){return a.apply(b,arguments)}};a=function(){function a(a,c,d,e){this.$scope=a,this.$location=c,this.webService=d,this.storageService=e,this.handleNotification=b(this.handleNotification,this),this.setup()}return a.prototype.setup=function(){return this.$scope.$on("notify",this.handleNotification)},a.prototype.handleNotification=function(a,b){return this.$scope.message=b.message},a}(),a.$inject=["$scope","$location","webService","storageService"],angular.module("ebenezerApp").controller("MessagesCtrl",a)}.call(this),function(){"use strict";var a,b=function(a,b){return function(){return a.apply(b,arguments)}};a=function(){function a(a,c,d){this.$scope=a,this.webService=c,this.storageService=d,this.error=b(this.error,this),this.setPosts=b(this.setPosts,this),this.success=b(this.success,this),this.setup()}return a.prototype.setup=function(){return this.getData()},a.prototype.getData=function(){var a,b;return b=this.webService.getGreeting(),b.then(this.success,this.error),a=this.webService.getPosts(),a.then(this.setPosts,this.error)},a.prototype.success=function(a){return this.$scope.$broadcast("notify",{message:"Welcome back :)"}),this.$scope.message=a.data.message},a.prototype.setPosts=function(a){return this.$scope.posts=a.data},a.prototype.error=function(){return this.$scope.message="Error while retrieving data from server!"},a}(),a.$inject=["$scope","webService","storageService"],angular.module("ebenezerApp").controller("MainCtrl",a)}.call(this);