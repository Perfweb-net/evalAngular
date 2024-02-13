angular.
module('todoApp').
component('todo',{
    template: `<p>Total =  {{$ctrl.taches.length}}</p>
                <table>
                    <thead>
                        <tr>
                            <th ng-repeat="row in $ctrl.rows">{{row}}</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr ng-repeat="tache in $ctrl.taches track by $index" ng-value="{{$index}}">
                            <td>{{tache.titre}}</td>
                            <td>{{tache.description}}</td>
                            <td><button ng-click=$ctrl.handleRemove($index)>Remove</button></td>
                            <td><button ng-click=$ctrl.handleEdit($index)>edit</button></td>
                            <td><input type="checkbox" ng-model="tache.checked" checked={{tache.checked}}></td>
                        </tr>
                    </tbody>
                </table>

                <table>
                <tr> 
                    <td>
                        <input type="checkbox" ng-model="$ctrl.allChecked" ng-change="$ctrl.handleToggleAll()">check all</button>
                    <td>

                    <td>
                        <button ng-click="$ctrl.handleRemoveChecked()">supprimer les cochés</button>
                    <td>

                    <td>
                        <button ng-click="$ctrl.handleRemoveAll()">Remove all</button>
                    <td>
                </tr>
                </table>

                <p ng-if="$ctrl.needEdit != '-1'">
                    modifier la tache
                    </br>
                    <input type="texte" placeholder="{{$ctrl.taches[$ctrl.needEdit].titre}}" ng-model="updateTitre" ng-change="$ctrl.setUpdateTitre(updateTitre)" value={{$ctrl.taches[$ctrl.needEdit].titre}}>
                    <input type="texte" placeholder="{{$ctrl.taches[$ctrl.needEdit].description}}" ng-model="updateDescription" ng-change="$ctrl.setUpdateDescription(updateDescription)" value={{$ctrl.taches[$ctrl.needEdit].description}}>
                    <button ng-click=$ctrl.handleEditValidate()>edit</button>
                </p>

                <p>
                    Créer nouvelle tache
                    </br>
                    <input type="texte" placeholder="titre" ng-model="titre" ng-change="$ctrl.setTitre(titre)">
                    <input type="texte" placeholder="description" ng-model="description" ng-change="$ctrl.setDescription(description)">
                    <button ng-click=$ctrl.handleCreateTache()>Créer</button>
                </p>

                <p>
                <button ng-click="$ctrl.removeCached()">Cache clear</button>
                </p>
                `,

    controller : function controller(){
        this.$onInit = function(){
            if(localStorage.getItem("taches") && localStorage.getItem("taches") != []){
                this.taches = JSON.parse(localStorage.getItem("taches"));
            }else{
                this.taches = [
                    {
                        titre:"manger",
                        description: "manger c'est vraiment trop cool",
                        checked : false,
                    }, {
                        titre:"manger2",
                        description: "manger c'est vraiment trop cool2",
                        checked : false,
                    }
                ]
                this.cached();
            }
        }
        this.rows = ["titre","description"];
        this.description = "";
        this.titre = "";
        this.updateDescription = "";
        this.updateTitre = "";
        this.needEdit = -1;
        this.allChecked = false;

        this.cached = function(){
            localStorage.setItem("taches", JSON.stringify(this.taches))
        }

        this.removeCached = function(){
            localStorage.removeItem("taches")
        }

        this.setTitre = function (titre){
            this.titre = titre;
        }

        this.setDescription = function(description){
            this.description = description;
        }

        this.setUpdateTitre = function (titre){
            this.updateTitre = titre;
        }

        this.setUpdateDescription = function(description){
            this.updateDescription = description;
        }

        this.handleCreateTache = function(){
            if(this.description != "" && this.titre != ""){
                this.taches.push({
                    titre:this.titre,
                    description:this.description,
                    checked: false,
                })

                this.cached();
            }
        }

        this.handleEdit = function(index){
            this.needEdit = index;
        }

        this.handleEditValidate = function(){
            if(this.needEdit != -1){
                this.taches[this.needEdit].titre = this.updateTitre;
                this.taches[this.needEdit].description = this.updateDescription;
                this.needEdit = -1;
                this.cached();
            }
        }

        this.handleRemove = function(index){
            this.taches.splice(index,1);
            this.cached();
        }

        this.handleRemoveChecked = function(){
            for(let i = 0; i < this.taches.length; i++){
                if(this.taches[i].checked == true){
                    this.handleRemove(i);
                    i--;
                }
            }
        }

        this.handleRemoveAll = function(){
            this.taches = []
            this.removeCached();
        }

        this.handleToggleAll = function(){
            for(elem of this.taches){
                if(this.allChecked){
                    if(elem.checked == false){
                        elem.checked = true;
                    }
                }
                else{
                    if(elem.checked == true){
                        elem.checked = false;
                    }
                }
            }
        }
    }
})