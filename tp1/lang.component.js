angular.
module('langApp').
component('lang',{
    template: ` <select ng-model="$ctrl.lg" ng-change="$ctrl.change($ctrl.lg)">
                    <option ng-repeat="lang in $ctrl.langs" value="{{$ctrl.getCountryName(lang)}}">{{$ctrl.getCountryName(lang)}}</option>
                </select>
                <ul>
                    <li>
                        <span>{{$ctrl.currentLanguage.name}}</span>
                        <p>{{$ctrl.currentLanguage.textes.a}} <input type="text" ng-model="response"></p>
                        <p>{{$ctrl.currentLanguage.textes.b}}</p>
                        <p>{{response}}</p>
                    </li>
                </ul>`,
    controller : function controller(){ 
        this.$onInit = function(){
            this.lg = "fr";
            this.change("fr");
        }
        this.langs = [
    {
        fr:{
        name : 'français',
        textes: {a:"A", b:"B"},
        }
    },
    {
        de:{
        name : 'deutch',
        textes: {a:"A", b:"B"},
        }
    },
    {
        en:{
        name : 'englais',
        textes: {a:"A", b:"B"},
        }
    },]


    this.change = function(lg){
        this.currentLanguage = this.langs.find(lang => lang.hasOwnProperty(lg))[lg];
    }

    this.getCountryName = function(lang){
        return Object.keys(lang)[0];
    }
}
})