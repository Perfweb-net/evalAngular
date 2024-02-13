let app = angular.module('testDirective', []);

app.directive('highlight', function(){
    return {
            restrict: 'A', // restriction a un attribut
            link: function(scope, element, attrs){
                element.css('background-color', 'yellow');
            }
        }
})

app.directive('customButton', function(){
    return {
        restrict: 'E', // retriction a un element
        template: '<button style="background-color:red">Bouton</button>'
    }
})

app.directive('userInfo', function(){
    return{
        restrict: 'E',
        scope: {
            user: "=" // on fournit obligatoirement un obj. si on veutu n litteral on met '@'
        },
        template: '<div> <h4>user info</h4> <p>Name : {{user.name}}</p></div>'
    }
})