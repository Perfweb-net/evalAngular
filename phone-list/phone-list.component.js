angular.
module('phonecatApp').
component('phoneList',{
    template: `<p>Total = {{$ctrl.phones.length}}</p>
                <ul>
                    <li ng-repeat="phone in $ctrl.phones">
                        <span>{{phone.name}}</span>
                        <p>{{phone.snippet}}</p>
                    </li>
                </ul>`,
    controller : function controller(){
        this.phones = [
    {
        name : 'Nexus S',
        snippet: 'fast just got faster',
    },
    {
        name : 'Nexus S1',
        snippet: 'fast just got faster',
    },
    {
        name : 'Nexus S2',
        snippet: 'fast just got faster',
    }
]
    }
})